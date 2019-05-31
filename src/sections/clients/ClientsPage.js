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
        <ClientsTable objectVariable={objectVariable}/>
      </div>
    );
  }
}

export default withRouter(ClientsPage)
export default withUserDefaults(ClientsPage)