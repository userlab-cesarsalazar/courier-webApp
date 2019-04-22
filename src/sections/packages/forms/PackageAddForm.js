import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Select, Button, Checkbox , Card , Upload , Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


class PackageAddForm extends React.Component {
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
    }

    onSave = () => {
        console.log('save');
    };

    onBack = () => {
        this.props.history.push('/packages');
    };

    render() {
        return (
            <div>
                <Card title="Registrar Tracking" style={{ width: '100%' }}>
                <Form>
                    <FormItem label="Nro. Tracking" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Cod. Cliente" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Cliente" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Categoria" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Select placeholder="Seleccione">
                            <Option value="c1">Categoria 1</Option>
                            <Option value="c2">Categoria 2</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Precio" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>

                    <FormItem label="Peso en libras" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Medidas" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Observaciones" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Input />
                    </FormItem>
                    <FormItem label="Estado" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Select placeholder="Seleccione">
                            <Option value="registrado">Registrado</Option>
                            <Option value="transito">En transito guatemala</Option>
                            <Option value="recibidofi">Recibido en oficina</Option>
                            <Option value="ruta">En ruta</Option>
                            <Option value="entregado">Entregado</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="TBA" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Checkbox />
                    </FormItem>
                    <FormItem label="Factura" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Upload name="upload" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> Adjuntar
                            </Button>
                        </Upload>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 6, offset: 9 }}>
                        <Button type="primary" onClick={this.onSave}>Registrar</Button>
                        <Button type="danger" className="btn-separator" onClick={this.onBack}>Regresar</Button>
                    </FormItem>
                </Form>
                </Card>
            </div>
        );
    }
}

const WrappedCreateForm = Form.create()(PackageAddForm);
export default withRouter(WrappedCreateForm)