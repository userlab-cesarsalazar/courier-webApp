//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';

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
    return (
      <div>
        <ClientsTable objectVariable={objectVariable}/>
      </div>
    );
  }
}

export default withRouter(ClientsPage)