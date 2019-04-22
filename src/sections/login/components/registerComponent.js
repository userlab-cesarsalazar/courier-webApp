//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Card , Checkbox } from 'antd';

//Api

//Components

//Styles

//const
const FormItem = Form.Item;

class RegisterComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp = () => {

    };

    render() {
        return (
            <div>
                <Card title="Crear Cuenta" style={{ width: '100%' }}>
                    <Form className="login-form">
                        <FormItem label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label="Nombre" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label="Apellido" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label="Password" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem labelCol={{ span: 6 }}>
                            <Checkbox>Acepto terminos y condiciones</Checkbox>
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" className="login-form-button" onClick={this.onSignUp}>Registrarse</Button>
                            <Button className="btn-link" onClick={this.props.actionChangeState}>Ya tiene una cuenta?</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default withRouter(RegisterComponent)