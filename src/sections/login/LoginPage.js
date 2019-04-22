//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Card , Avatar, Form, Input, Button } from 'antd';

//Api

//Components
import ConfirmationAccount from './components/ConfirmationAccount';
import ForgotPassword from './components/ForgotPassword';
import PasswordConfirm from './components/PasswordConfirm';
import RegisterComponent from './components/RegisterComponent';

//Styles

//const
const FormItem = Form.Item;

class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      username: '',
      password: '',
      register: false,
      login: true,
      confirmation: false,
      errors: {},
      touched: {},
      fullname: '',
      forgotPassword: false,
      recovery: false,
    }
  }

  render() {
    return (
        <div>
          <div className="bg-login">
            <div className='logo-login'>
              <Avatar src={'http://traestodo.com/traestodo17/assets/img/logo/logo-traestodo.png'} shape={'square'} size={100}/>
            </div>

            {this.state.login && (
              <Card title="Login" style={{ width: '100%' }}>
                <Form className="login-form">
                  <FormItem label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                    <Input />
                  </FormItem>
                  <FormItem label="Password" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                    <Input />
                  </FormItem>
                  <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="button" className="btn-link" onClick={_ =>this.setState({ forgotPassword: true, login: false })}>Olvidó su contraseña</Button>
                    <Button type="primary" className="login-form-button" onClick={this.onSave}>Iniciar sesión</Button>

                    <Button type="button" className="btn-link" onClick={_ => this.setState({ register: true, login: false })}>Registrarse</Button>
                    <Button type="button" className="btn-link" onClick={_ => this.setState({ confirmation: true, login: false })}>Confirmar cuenta</Button>

                  </FormItem>
                </Form>
              </Card>
            )}
            {this.state.forgotPassword && (
                <ForgotPassword
                    actionForgot={_ => this.setState({ forgotPassword: false, recovery: true })}
                    actionChangeState={_ => this.setState({ login: true, register: false, confirmation: false, forgotPassword: false })}
                />
            )}
            {this.state.confirmation && (
                <ConfirmationAccount
                    actionConfirm={_ => this.setState({ login: true, confirmation: false })}
                    actionChangeState={_ => this.setState({ login: true, register: false, confirmation: false })}
                />
            )}
            {this.state.register && (
                <RegisterComponent
                    actionRegister={_ => this.setState({ confirmation: true, register: false })}
                    actionChangeState={_ => this.setState({ login: true, register: false, confirmation: false })}
                />
            )}

          </div>
        </div>
    );
  }
}

const WrappedCreateForm = Form.create()(LoginPage);
export default withRouter(WrappedCreateForm)