//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Card } from 'antd';

//Api

//Components

//Styles

//const
const FormItem = Form.Item;

class ConfirmationAccount extends Component {

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
                <Card title="Confirmar cuenta" style={{ width: '100%' }}>
                    <span>Revise su email, para obtener el codigo de confirmacion</span>
                    <Form className="login-form">
                        <FormItem label="Codigo" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input />
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" className="login-form-button" onClick={this.onSignUp}>Iniciar sesion</Button>
                            <Button className="btn-link" onClick={this.props.actionChangeState}>Ya tiene una cuenta?</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default withRouter(ConfirmationAccount)