//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';

//Api
import ClientsSrc from './ClientsSrc';

//Components
import ClientsTable from './components/ClientsTable';

import {Button,message} from 'antd';

//Styles

//const


class ClientsPage extends Component {
  
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
    ClientsSrc.list()
      .then(users => this.setState({ users, loading: false }))
      .catch(err => {
        message.error(err.message || err)
        this.setState({ loading: false })
      })
  }
  
  onAdd = () => {
    this.props.history.push('/clients/create');
  };
  
  render() {
    const {
      loading,
      users
    } = this.state;
    const objectVariable = {title:'Clientes',showBtn:true};
    return (
      <div>
        <div className={'table-action-bar'}>
          <h2>{objectVariable.title}</h2>
          {objectVariable.showBtn ? <Button type='primary' onClick={this.onAdd}>Nuevo</Button> : ''}
        </div>
        <ClientsTable
          loading={loading}
          users={users}
        />
      </div>
    );
  }
}

export default withRouter(ClientsPage)