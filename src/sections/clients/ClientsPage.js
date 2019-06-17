//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import  { Cache } from 'aws-amplify';

//Api
import ClientsSrc from './ClientsSrc';

//Components
import ClientsTable from './components/ClientsTable';

import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  message
} from 'antd';

const FormItem = Form.Item;
//Styles

//const

class ClientsPage extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      isPageTween: false,
      page: 1,
      clients: [],
      disabledLoadMore: false,
      errors: {},
      client_id:'',
      name:'',
      email:''
    }
  }
  
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    ClientsSrc.list(this.getFilters())
      .then(clients => this.setState({ clients, loading: false }))
      .catch(err => {
        message.error(err.message || err);
        this.setState({ loading: false });
      })
  }
  
  onAdd = () => {
    this.props.history.push('/clients/create');
  };

  onSearch = async e => {
    try {
      e.preventDefault();

      if(Cache.getItem('userApp').profile === 'recepcionista'){
        await this.validateFields();
      }

      this.setState({ loading: true });

      let params = this.getFilters();

      let clients = await ClientsSrc.list(params);

      this.setState({ clients: clients, loading: false, page: 1, disabledLoadMore: false });

    } catch (e) {
      console.log(e)
      if (e && e.message) {
        message.error(e.message);
      }
      this.setState({ loading: false })
    }
  };

  getFilters = page => {

    let params = 'type=cliente';

    if(this.state.name) {
      params += '&name='+this.state.name;
    }

    if(this.state.client_id) {
      params += '&client_id='+this.state.client_id;
    }

    if(this.state.email) {
      params += '&email='+this.state.email;
    }

    if(page) {
      params += '&page='+page;
    }

    return params
  }

  validateFields = async() => {
    try {
      let errors = {}
      if(!this.state.name && !this.state.client_id && !this.state.email) {
        errors.client_id = 'Debe ingresar un campo de busqueda'
        errors.name = 'Debe ingresar un campo de busqueda'
        errors.email = 'Debe ingresar un campo de busqueda'
      }

      this.setState({ errors });
      if (Object.keys(errors).length > 0)
        throw errors

      return false
    } catch (errors) {
      throw errors
    }
  };

  handleChange = (name, value) => {
      let otherState = {}
      switch (name) {
        case 'name':
          otherState = {
            client_id: undefined,
            email:undefined
          }
          break;
        case 'client_id':
          otherState = {
            name: undefined,
            email:undefined
          }
          break;
        default:
          otherState = {
            name: undefined,
            client_id:undefined
          }
      }
      this.setState({ [name]: value }, ...otherState)
  };

  loadMore = async() => {
    try{
      this.setState({ loading: true });
      let listTmp = [];
      let params = this.getFilters(this.state.page + 1);
      let clients = await ClientsSrc.list(params)
      listTmp = this.state.clients.concat(clients);

      let disabledLoadMore = clients && clients.length === 25 ? false : true

      this.setState(prevState => ({
        clients: listTmp,
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
      clients,
      name,
      client_id,
      email
    } = this.state;
    
    return (
      <div>

        <div className={'table-action-bar'}>
          <h2>Clientes</h2>
          {Cache.getItem('userApp').profile !== 'recepcionista' ?
            <Button type='primary' onClick={this.onAdd}>Nuevo</Button>
            :
            ''
          }
        </div>
        <Form autoComplete='NOPE'>
          <Card>
            <Row gutter={16}>
              <Col className='gutter-row' span={8}>
                <FormItem label='Codigo'>
                  <Input
                    placeholder={'Codigo'}
                    name='client_id'
                    onChange={ e => this.handleChange('client_id', e.target.value)}
                    value={client_id}
                  />
                </FormItem>
              </Col>
              <Col className='gutter-row' span={8}>
                <FormItem label='Nombre'>
                  <Input
                    placeholder={'Nombre'}
                    name='name'
                    onChange={ e => this.handleChange('name', e.target.value)}
                    value={name}
                  />
                </FormItem>
              </Col>
              <Col className='gutter-row' span={8}>
                <FormItem label='Email'>
                  <Input
                    placeholder={'Email'}
                    name='email'
                    onChange={ e => this.handleChange('email', e.target.value)}
                    value={email}
                  />
                </FormItem>
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
        <ClientsTable
          loading={loading}
          clients={clients}
          loadMore={this.loadMore}
          disabledLoadMore={this.state.disabledLoadMore}
        />
      </div>
    );
  }
}

export default withRouter(ClientsPage)