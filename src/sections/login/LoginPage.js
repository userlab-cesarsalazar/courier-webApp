//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Card , Avatar, Form, Input, Button, Icon, message } from 'antd';
import { routeDefaults } from '../../commons/consts/Menu'
//Components
import ConfirmationAccount from './components/ConfirmationAccount';
import ForgotPassword from './components/ForgotPassword';

import RegisterComponent from './components/RegisterComponent';
import  { Auth, Cache } from 'aws-amplify';
import './../../amplify_config';

import ClientsSrc from '../clients/ClientsSrc';

//Api

//Styles

//const
const FormItem = Form.Item;

class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = async(e) => {
    try{
      e.preventDefault();
      this.setState({ loading: true });

      let profile = {
        attributes: '',
        token: '',
        profile: ''
      };
      await this.validateFields();
      await Auth.signIn(this.state.username, this.state.password)
        .then(user => {
          profile.token = user.signInUserSession.idToken.jwtToken;
          profile.profile = user.attributes.profile;
          profile.attributes = JSON.stringify(user.attributes);
          Cache.setItem('userApp',profile);
          this.setState({ loading: false});

          let values = routeDefaults.filter(function (item) {
             if(item.type === profile.profile){
               return item.route;
             }
          }).map(item => item.route);

          if(values){
            let client_id = 0;
            if(profile.profile === 'cliente'){
               ClientsSrc.getProfile().then(cliente => {
                  client_id = cliente[0].client_id;
                  this.props.history.push(`/${values}${client_id}`)
                }).catch(e => {
                  if (e && e.message) {
                    message.error(e.message);
                  }
                });
            }else{
              this.props.history.push(`/${values}`)
            }

          }else{
            this.props.history.push(`/dashboard`)
          }
          setTimeout(function() {
            window.location.reload()
          }, 1000);
        }).catch(e => {
          if (e.message.indexOf('UserMigration failed') > -1) {
            message.error('Usuario/Password incorrectos');
          }
          this.setState({ loading: false });
        });

    }catch (e) {
      if (e && e.message) {
        message.error(e.message);
      }
      this.setState({ loading: false })
    }
  };

  validateFields = async() => {
    try {
      let errors = {}

      if(this.state.login) {
        if (!this.state.username) {
          errors.username = 'El email es requerido'
        }
        if (!this.state.password) {
          errors.password = 'La contraseña requerida'
        }
      }
      this.setState({ errors });

      if (Object.keys(errors).length > 0)
        throw errors

      return false

    } catch (errors) {
      throw errors
    }
  };

  handleChange = async event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    await this.setState({ [name]: value })
  };

  render() {
    const { username, password, errors, loading } = this.state
    return (
      <div>
        <div className="bg-login">
          <div className='logo-login'>
            <Avatar src={'http://traestodo.com/traestodo17/assets/img/logo/logo-traestodo.png'} shape={'square'} size={100}/>
          </div>

          {this.state.login && (
            <Card title="Login" style={{ width: '100%' }} >
              <Form className="login-form" autoComplete="off">
                <FormItem
                  required
                  validateStatus={errors.username && 'error'}
                  help={errors.username}
                  label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}  />}  name={'username'} value={username} onChange={this.handleChange}  placeholder="Username"  />
                </FormItem>
                <FormItem
                  required
                  validateStatus={errors.password && 'error'}
                  help={errors.password}
                  label="Password" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name={'password'} placeholder="Password" value={password} onChange={this.handleChange}/>
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                  <Button type="button" className="btn-link" onClick={_ =>this.setState({ forgotPassword: true, login: false })}>Olvidó su contraseña</Button>
                  <Button type="primary" className="login-form-button" loading={loading} onClick={this.handleSubmit}>Iniciar sesión</Button>

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