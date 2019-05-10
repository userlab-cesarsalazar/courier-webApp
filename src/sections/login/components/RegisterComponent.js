//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Card , Checkbox } from 'antd';

//Api

//Components
import  { Auth } from 'aws-amplify';
//Styles

//const
const FormItem = Form.Item;

class RegisterComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fullname: ''
        }
        this.onSignUp = this.onSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = async event => {
        const { target } = event
        const value = target.type === 'checkbox' ? target.checked : target.value
        const { name } = target
        await this.setState({ [name]: value })
    }

    onSignUp = () => {
        Auth.signUp({
            username: this.state.email,
            password: this.state.password,
            attributes: {
                email: this.state.email,
                name: this.state.fullname
            },
            validationData: []  //optional
        })
        .then(data => {
            console.log(data);
            this.props.actionRegister();
        })
        .catch(err => console.log(err));
    };

    render() {
        const { email, password, fullname } = this.state;
        return (
            <div>
                <Card title="Crear Cuenta" style={{ width: '100%' }}>
                    <Form className="login-form">
                        <FormItem label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input type='email' autoComplete='off' name={'email'} value={email} onChange={this.handleChange}  />
                        </FormItem>
                        <FormItem label="Nombre Completo" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input type='text' autoComplete='off' name={'fullname'} value={fullname} onChange={this.handleChange} />
                        </FormItem>
                        <FormItem label="Password" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                            <Input type='password' autoComplete='off' name={'password'} value={password} onChange={this.handleChange} />
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