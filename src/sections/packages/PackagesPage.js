//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';

//Api
import PackagesSrc from './PackagesSrc';

//Components
import PackagesTable from './components/PackagesTable';
import {
  message
} from 'antd'

//Styles

//const


class PackagesPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      packages: []
    }
  }

  componentDidMount() {

    PackagesSrc.list()
      .then(packages => this.setState({ packages, loading: false }))
      .catch(err => {
        message.error(err.message || err)
        this.setState({ loading: false })
      })
  }


  render() {
    const {
      loading,
      packages
    } = this.state;

    const objectVariable = {title:'Paquetes',showBtn:true};

    return (
        <div>
          <PackagesTable
            loading={loading}
            packages={packages}
            objectVariable={objectVariable}
          />
        </div>
    );
  }
}

export default withRouter(PackagesPage)