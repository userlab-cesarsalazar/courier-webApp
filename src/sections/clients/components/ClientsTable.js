import React from 'react';
import { withRouter } from 'react-router';
import  { Cache } from 'aws-amplify';

import { Table, Form, Button, Input , Card, Row, Col, Divider,message} from 'antd';
import { utilChange } from '../../../config/util';
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
            email: ''
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
            await servicesClient.list(params).then(
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
            this.setState({ loading: false })        }
    };

    onSearch = async(e) => {
        try {
            e.preventDefault()
            this.setState({ loading: true })
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
		        await servicesClient.list(params).then(
		          clients => {
		              this.setState({data:clients});
		          }
		        );
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
                <Button type="default" icon="edit" onClick={(e) => { this.onEdit(record.key, e); }}/>
                ) : ('')}
                <Button type="default" icon="file-search" title="Ver paquetes" onClick={(e) => { this.onViewPackages(record.client_id, e); }}/>
             </span>
                ),
            },
        ];
        return columns
    }

    getData = (data)=>{
        return data.map( (d) => ({
            key: d.id,
            name:  d.name,
            email: d.email,
            client_id: d.client_id,
            activo: d.activo
        }));
    };

    handleChange = event => {
        utilChange(event, (name, value) => {
            this.setState({ [name]: value }, this.validate)
        });
    };

    handleSelectChange = (value) => {
        this.setState({type: value });
    };

    onDelete = (key, e) => {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data, isPageTween: false });
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
              <Card title="Buscar" style={{ width: '100%' }}>
                  <Form>
                      <Row type="flex">
                          <Col span={6}>
                              <FormItem
                                label="Codigo" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                                  <Input
                                    name="client_id"
                                    onChange={this.handleChange}
                                    value={this.state.client_id}
                                    disabled={loading}
                                  />
                              </FormItem>
                          </Col>
                          <Col span={6}>
                              <FormItem
                                label="Nombre" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                                  <Input
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    disabled={loading}
                                  />
                              </FormItem>
                          </Col>
                          <Col span={6}>
                              <FormItem
                                label="Email" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                                  <Input
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    disabled={loading}
                                  />
                              </FormItem>
                          </Col>
                          <Col span={6}>
                              <FormItem wrapperCol={{ offset: 1 }}>
                                  <Button type="primary" loading={loading} onClick={this.onSearch}>Buscar</Button>
                              </FormItem>
                          </Col>
                      </Row>
                  </Form>
              </Card>
              <Divider/>
              <Table loading={this.props.loading} columns={this.getColumns()} dataSource={this.getData(this.state.data)} pagination={false}/>
              {(Cache.getItem('userApp').profile !== 'recepcionista') ? (
              <FormItem wrapperCol={{ offset: 11 }}>
                  <Button type="primary" loading={loading} onClick={this.loadUser}>Cargar mas</Button>
              </FormItem>
              ) : ('')}
          </div>
        );
    }
}

export default withRouter(ClientsTable)
