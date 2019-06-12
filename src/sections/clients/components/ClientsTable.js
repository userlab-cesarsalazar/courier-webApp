import React from 'react';
import { withRouter } from 'react-router';
import  { Cache } from 'aws-amplify';

import {
  Table,
  Form,
  Button,
  message
} from 'antd';

import servicesClient from '../ClientsSrc'

const FormItem = Form.Item;

class ClientsTable extends React.Component {

  constructor(props){
    super(props);
    this.getColumns = this.getColumns.bind(this);
    this.getData = this.getData.bind(this);
    this.loadUser = this.loadUser.bind(this);

    this.state = {
      data: [],
      isPageTween: false,
      loading : false,
      page: 0,
      type: '',
      name: '',
      email: '',
      errors: {}
    };
  }

    componentDidMount(){
      if(Cache.getItem('userApp').profile !== 'recepcionista'){
        this.loadUser();
      }
    }

    loadUser = async() => {
      try{
        this.setState({ loading: true })
        let listTmp = [];
        this.state.page = this.state.page + 1;
        let params = 'type=cliente&page='+this.state.page;
        await servicesClient.list(params)
          .then(
          clients => {
            listTmp = this.state.data.concat(clients);
            this.setState({data:listTmp});
          }
        )
        return this.setState({ loading: false });
      } catch (e) {
        console.log(e)
        if (e && e.message) {
          message.error(e.message);
        }
        this.setState({ loading: false })
      }
    };

    getColumns = ()=>{
      let columns = [
        { title: 'Codigo', dataIndex: 'client_id', key: 'client_id' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Activo', dataIndex: 'activo', key: 'activo' },
        {
          title: 'Accion',
          dataIndex: '',
          key: 'x',
          render: (text, record) => (
            <span>
              {(Cache.getItem('userApp').profile !== 'recepcionista') ? (
              <Button type='default' icon='edit' onClick={(e) => { this.onEdit(record.key, e); }}/>
              ) : ('')}
              <Button type='default' icon='file-search' title='Ver paquetes' onClick={(e) => { this.onViewPackages(record.client_id, e); }}/>
            </span>
          ),
        },
      ];
      return columns
    }

    getData = data => {
      return data.map(d => ({
        key: d.id,
        name:  d.name,
        email: d.email,
        client_id: d.client_id,
        activo: d.activo
      }));
    };

    onEdit = (key, e) => {
      this.props.history.push(`/clients/edit/${key}`);
    }

    onViewPackages = (key, e) => {
      this.props.history.push(`/clients/viewpackage/${key}`);
    }

    render() {
      const { loading } = this.state;
      return (
        <div>

          <Table loading={this.props.loading} columns={this.getColumns()} dataSource={this.getData(this.state.data)} pagination={false}/>
            {(Cache.getItem('userApp').profile !== 'recepcionista') ? (
              <FormItem wrapperCol={{ offset: 11 }}>
                <Button type='primary' loading={loading} onClick={this.loadUser}>Cargar mas</Button>
              </FormItem>
              )
              :
              ('')
            }
        </div>
      );
    }
}

export default withRouter(ClientsTable)
