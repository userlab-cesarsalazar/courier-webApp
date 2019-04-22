//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';

//Api

//Components
import PackagesTable from './components/PackagesTable';

//Styles

//const


class PackagesPage extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    const objectVariable = {title:'Paquetes',showBtn:true};
    return (
        <div>
          <PackagesTable objectVariable={objectVariable}/>
        </div>
    );
  }
}

export default withRouter(PackagesPage)