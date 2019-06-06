//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withUserDefaults } from '../../commons/components/UserDefaults';
import { Cache } from 'aws-amplify'

//Api
import PackagesSrc from './PackagesSrc';

//Components
import PackagesTable from './components/PackagesTable';
import ClientSearchSelect from '../clients/components/ClientSearchSelect'
import {
  Button,
  message,
  Form,
  Input,
  Col,
  Row,
  Divider,
  Card
} from 'antd';

//Styles

//const
const FormItem = Form.Item


class PackagesPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      packages: [],
      role:'cliente',
      tracking: '',
      client: undefined
    }
    
    this.onSearch = this.onSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.loadData();
    let profile = Cache.getItem('userApp')
    this.setState({ role : profile.profile})
  }
  
  
  handleChange = (name, value) => {
    
    let otherState = {}
    switch (name) {
      case 'client_id':
        otherState = {
          client: undefined,
          tracking:undefined
        }
        break
      case 'client':
        otherState = {
          client_id: undefined,
          tracking:undefined
        }
      break
      default:
        otherState = {
          client_id: undefined,
          client:undefined
        }
    }
    
    this.setState({ [name]: value, ...otherState },_=> console.log(this.state,'sdsd'))
  }
  
  loadData = () => {
    PackagesSrc.list()
      .then(packages => this.setState({ packages, loading: false }))
      .catch(err => {
        message.error(err.message || err)
        this.setState({ loading: false })
      })
  }

  onAdd = () => {
    console.log('click here')
    this.props.history.push('/packages/create');
  };

  onAdminAdd = () => {
    console.log('click here')
    this.props.history.push('/packages/admincreate');
  };
  
  onSearch = () => {
    let params = {
      tracking:this.state.tracking || '',
      client_id: this.state.client || this.state.client_id || ''
    }
    
      this.setState({loading : true})
      PackagesSrc.getByFilter(params)
        .then( response => this.setState({ packages : response, loading: false}))
        .catch(e => {
          this.setState({ loading: false })
          console.log(e,'err')
        })
  }


  render() {
    const {
      getWord
    } = this.props.userDefaults;
    const {
      loading,
      packages,
      role,
      tracking,
      client_id,
      client
    } = this.state;
    
    return (
      <div>
        <div className={'table-action-bar'}>
          <h2>{getWord('PACKAGES')}</h2>
          {role === 'admin' ? <Button type='primary' onClick={this.onAdminAdd}>Ingresar</Button> : ''}
          {role === 'cliente' ? <Button type='primary' onClick={this.onAdd}>Nuevo</Button> : ''}
        </div>
        <Card>
          <Form>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <FormItem label='Nro. Tracking' >
                  <Input placeholder={'Nro. Tracking'}
                         onChange={ e => this.handleChange('tracking', e.target.value)}
                         value={tracking}
                         name="tracking"
                  />
                </FormItem>
                </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label='Nombre Cliente'>
                  <ClientSearchSelect
                    value={client}
                    onChange={value => this.handleChange('client', value)}
                  />
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label='Codigo Cliente' >
                  <Input placeholder={'Codigo de cliente'}
                         onChange={ e => this.handleChange('client_id', e.target.value)}
                         value={client_id}
                         name="client_id"
                  />
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label=" " >
                  <Button type='primary' onClick={this.onSearch} loading={loading} >
                    Buscar
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Divider/>
        <PackagesTable
          loading={loading}
          packages={packages}
        />
      </div>
    );
  }
}

export default withRouter(withUserDefaults(PackagesPage))