//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Card } from 'antd';

//Api

//Components
import  { Auth } from 'aws-amplify';

//Styles

//const
const FormItem = Form.Item;

class ConfirmationAccount extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            code: ''
        };
        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp = () => {
        Auth.confirmSignUp(this.state.email, this.state.code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        }).then(data => {
            console.log(data);
            this.props.actionConfirm();
        }).catch(err => console.log(err));

    };

    handleChange = async event => {
        const { target } = event
        const value = target.type === 'checkbox' ? target.checked : target.value
        const { name } = target
        await this.setState({ [name]: value })
    }

    render() {
        const { email, code } = this.state;
        return (
            <div>
                <Card title="Confirmar cuenta" style={{ width: '100%' }}>
                    <span>Revise su email, para obtener el codigo de confirmacion</span>
                    <Form className="login-form">
                        <FormItem label="Codigo" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input type='code'
                                   name='code'
                                   id='code'
                                   autoComplete='off'
                                   value={code}
                                   onChange={this.handleChange} />
                        </FormItem>
                        <FormItem label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input type='email'
                                   name='email'
                                   id='email'
                                   placeholder='email'
                                   autoComplete='off'
                                   value={email}
                                   onChange={this.handleChange}/>
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