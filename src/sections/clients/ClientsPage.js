//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withUserDefaults } from '../../commons/components/UserDefaults';

//Api

//Components
import ClientsTable from './components/ClientsTable';

//Styles

//const


class ClientsPage extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    const objectVariable = {title:'Usuarios',showBtn:true};
    const {
      getWord
    } = this.props.userDefaults;
    return (
      <div>
        <h2>{getWord('CLIENTS')}</h2>
        <ClientsTable objectVariable={objectVariable}/>
      </div>
    );
  }
}

export default withRouter(withUserDefaults(ClientsPage))