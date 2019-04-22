import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Select, Button, Radio, Switch , Card } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class ClientsAddForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.onSave = this.onSave.bind(this);
    }

    onSave = () => {
        console.log('save');
    };

    onBack = () => {
        this.props.history.push('/clients');
    };


    handleSelectChange = (value) => {
        this.setState({value: value});
    };

    render() {
        return (
            <div>
                <Card title="Nuevo Usuario" style={{ width: '100%' }}>
                <Form>
                    <FormItem label="Tipo Usuario" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Select placeholder="Seleccione" onChange={this.handleSelectChange}>
                            <Option value="user">Usuario traesTodo</Option>
                            <Option value="admin">Administrador</Option>
                            <Option value="client">Cliente</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Email" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Nombre" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Apellido" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>

                    <div className={this.state.value !== 'client' ? 'hidden' : ''}>
                        <FormItem label="Numero de telefono" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label = "Nit" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label="Tarifa" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Select placeholder="Selecciona tarifa">
                            <Option value="normal">Q60 (Normal)</Option>
                            <Option value="cc">Q56 (CC)</Option>
                            <Option value="vip">Q55 (Vip)</Option>
                            <Option value="c">Q50 (C)</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="Preferencia de entrega" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <RadioGroup>
                            <Radio value="traestodo">TraesTodo</Radio>
                            <Radio value="domicilio">Domicilio</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="Direccion de entrega" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label="Observaciones" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                    </div>

                    <FormItem label="Activo" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Switch defaultChecked/>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 6, offset: 9 }}>
                        <Button type="primary" onClick={this.onSave}>Guardar</Button>
                        <Button type="danger" className="btn-separator" onClick={this.onBack}>Regresar</Button>
                    </FormItem>

                </Form>
                </Card>
            </div>
        );
    }
}

const WrappedCreateForm = Form.create()(ClientsAddForm);
export default withRouter(WrappedCreateForm)
