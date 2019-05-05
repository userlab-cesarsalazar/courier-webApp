//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Card } from 'antd';
//Api

//Components

//Styles

//const
const FormItem = Form.Item;

class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
        this.onRecovery = this.onRecovery.bind(this);
    }

    onRecovery = () => {

    };

    render() {
        return (
            <div>
                <Card title="Olvidó su contraseña" style={{ width: '100%' }}>
                    <span>Ingrese su email y le enviaremos un codigo de verificacion</span>
                    <Form className="login-form">
                        <FormItem label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" className="login-form-button" onClick={this.onRecovery}>Recuperar contraseña</Button>
                            <Button className="btn-link" onClick={this.props.actionChangeState}>Regresar</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default withRouter(ForgotPassword)