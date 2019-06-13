//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { utilChange } from '../../config/util';

//Api
import UsersSrc from './UsersSrc';

//Components
import UsersTable from './components/UsersTable';

import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select
} from 'antd';

//Styles

//const
class UsersPage extends Component {

  constructor(props){
    super(props)

    this.onAdd = this.onAdd.bind(this);
    this.state = {
      loading: true,
      page: 1,
      disabledLoadMore: false,
      isPageTween: false,
      users: [],
      errors: {}
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    UsersSrc.list()
      .then(users => this.setState({ users, loading: false }))
      .catch(err => {
        message.error(err.message || err);
        this.setState({ loading: false })
      })
  }

  onAdd = () => {
    this.props.history.push('/users/create');
  };

  handleChange = event => {
    utilChange(event, (name, value) => {
      this.setState({ [name]: value }, this.validate)
    });
  };

  handleSelectChange = value => {
    this.setState({ type: value });
  };

  getFilters = page => {

    let params = 'page=' + (page ? page : 0);

    if(this.state.name) {
      params += '&name='+this.state.name;
    }

    if(this.state.type) {
      params += '&type='+this.state.type;
    }

    if(this.state.email) {
      params += '&email='+this.state.email;
    }

    return params
  }

  onSearch = async e => {
    try {
      e.preventDefault();

      this.setState({ loading: true });

      let params = this.getFilters();

      let users = await UsersSrc.list(params);

      this.setState({ users: users, loading: false, page: 1, disabledLoadMore: false });

    } catch (e) {
      console.log(e)
      if (e && e.message) {
        message.error(e.message);
      }
      this.setState({ loading: false })
    }
  };

  loadMore = async() => {
    try{
      this.setState({ loading: true });
      let listTmp = [];
      let params = this.getFilters(this.state.page + 1);
      let users = await UsersSrc.list(params)
      listTmp = this.state.users.concat(users);

      let disabledLoadMore = users && users.length === 25 ? false : true

      this.setState(prevState => ({
        users: listTmp,
        loading: false,
        page: prevState.page+1,
        disabledLoadMore: disabledLoadMore
      }));

    } catch (e) {
      console.log(e)
      if (e && e.message) {
        message.error(e.message);
      }
      this.setState({ loading: false })
    }
  };

  render() {
    const {
      loading,
      users,
      errors
      } = this.state;

    return (
      <div>
      <div className={'table-action-bar'}>
        <h2>Usuarios</h2>
          <Button type='primary' onClick={this.onAdd}>Nuevo</Button>
        </div>
        <Form>
          <Card>
            <Row gutter={16}>
              <Col className='gutter-row' span={8}>
                <Form.Item
                  validateStatus={errors.client_id && 'error'}
                  help={errors.client_id}
                  label='Tipo'
                >
                  <Select
                    allowClear
                    placeholder='Tipo'
                    name='type'
                    onChange={this.handleSelectChange}
                    value={this.state.type}
                  >
                    <Select.Option value='vendedor'>Usuario traesTodo</Select.Option>
                    <Select.Option value='admin'>Administrador</Select.Option>
                    <Select.Option value='warehouse'>Operador Guatemala</Select.Option>
                    <Select.Option value='delegate'>Operador Miami</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className='gutter-row' span={8}>
                <Form.Item
                  validateStatus={errors.name && 'error'}
                  help={errors.name}
                  label='Nombre'
                >
                  <Input
                    placeholder={'Nombre'}
                    name='name'
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </Form.Item>
              </Col>
              <Col className='gutter-row' span={8}>
                <Form.Item
                  validateStatus={errors.email && 'error'}
                  help={errors.email}
                  label='Email'
                >
                  <Input
                    placeholder={'Email'}
                    name='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <br/>

          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Form.Item>
                <Button type='primary' onClick={this.onSearch} loading={loading} >
                  Buscar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Divider/>

        <UsersTable
          loading={loading}
          users={users}
          loadMore={this.loadMore}
          disabledLoadMore={this.state.disabledLoadMore}
        />
      </div>
    );
  }
}

export default withRouter(UsersPage)