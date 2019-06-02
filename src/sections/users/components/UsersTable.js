import React from 'react';
import { withRouter } from 'react-router';
import { Table, Form, Button, Input , Card, Select, Row, Col, Divider, message} from 'antd';
import { utilChange } from '../../../config/util';
import UsersSrc from '../UsersSrc';

const FormItem = Form.Item;
const Option = Select.Option;

class UsersTable extends React.Component {

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
        this.loadUser();
    }

    loadUser = async() => {
        try {
            this.setState({ loading: true })
            let listTmp = [];
            this.state.page = this.state.page + 1;
            let params = 'page='+this.state.page;
            await UsersSrc.list(params).then(
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
            let params = '';
            if(this.state.name) {
                params += '&name='+this.state.name;
            }
            if(this.state.type) {
                params += '&type='+this.state.type;
            }
            if(this.state.email) {
                params += '&email='+this.state.email;
            }
            await UsersSrc.list(params).then(
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
            { title: 'Tipo Usuario', dataIndex: 'type', key: 'type' },
            { title: 'Nombre', dataIndex: 'name', key: 'name' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Activo', dataIndex: 'activo', key: 'activo' },
            {
                title: 'Accion',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                  <span>
                    <Button type="default" icon="edit" onClick={(e) => { this.onEdit(record.key, e); }}/>
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
            type: d.type,
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

    };

    render() {
        const { loading } = this.state;
        return (
          <div>
              <Card title="Buscar" style={{ width: '100%' }}>
                  <Form>
                      <Row type="flex">
                          <Col span={6}>
                              <FormItem label="Tipo Usuario" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                                  <Select placeholder="Seleccione"
                                          name="type"
                                          onChange={this.handleSelectChange}
                                          value={this.state.type}
                                          disabled={loading}
                                  >
                                      <Option value="">Seleccione</Option>
                                      {/*<Option value="cliente">Cliente</Option>*/}
                                      <Option value="vendedor">Usuario traesTodo</Option>
                                      <Option value="admin">Administrador</Option>
                                      <Option value="warehouse">Operador Guatemala</Option>
                                      <Option value="delegate">Operador Miami</Option>
                                  </Select>
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
              <FormItem wrapperCol={{ offset: 11 }}>
                  <Button type="primary" loading={loading} onClick={this.loadUser}>Cargar mas</Button>
              </FormItem>
          </div>
        );
    }
}

export default withRouter(UsersTable)
