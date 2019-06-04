//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';

//Api
import UsersSrc from './UsersSrc';

//Components
import UsersTable from './components/UsersTable';

import {Button,message} from 'antd';

//Styles

//const
class UsersPage extends Component {

  constructor(props){
    super(props)

    this.onAdd = this.onAdd.bind(this);
    this.state = {
      loading: true,
      users: []
    }
  }

  componentDidMount() {
    this.loadData();
  }


  loadData = () => {
    UsersSrc.list()
      .then(users => this.setState({ users, loading: false }))
      .catch(err => {
        message.error(err.message || err)
        this.setState({ loading: false })
      })
  }

  onAdd = () => {
    this.props.history.push('/users/create');
  };

  render() {
    const {
      loading,
      users
      } = this.state;
    const objectVariable = {title:'Usuarios',showBtn:true};
    return (
      <div>
        <div className={'table-action-bar'}>
          <h2>{objectVariable.title}</h2>
          {objectVariable.showBtn ? <Button type='primary' onClick={this.onAdd}>Nuevo</Button> : ''}
        </div>
        <UsersTable
          loading={loading}
          users={users}
        />
      </div>
    );
  }
}

export default withRouter(UsersPage)