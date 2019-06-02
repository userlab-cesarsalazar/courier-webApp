//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withUserDefaults } from '../../commons/components/UserDefaults';

//Api
import PackagesSrc from './PackagesSrc';

//Components
import PackagesTable from './components/PackagesTable';
import {
  Button,
  message
} from 'antd';

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
    this.loadData();
  }


  loadData = () => {
    PackagesSrc.list()
      .then(packages => this.setState({ packages, loading: false }))
      .catch(err => {
        message.error(err.message || err)
        this.setState({ loading: false })
      })
  }

  onAdd = () => {
    this.props.history.push('/packages/create');
  };


  render() {
    const {
      getWord
    } = this.props.userDefaults;
    const {
      loading,
      packages
    } = this.state;

    const objectVariable = { title: 'Paquetes', showBtn: true };

    return (
      <div>
        <div className={'table-action-bar'}>
          <h2>{getWord('PACKAGES')}</h2>
          {objectVariable.showBtn ? <Button type='primary' onClick={this.onAdd}>Nuevo</Button> : ''}
        </div>
        <PackagesTable
          loading={loading}
          packages={packages}
        />
      </div>
    );
  }
}

export default withRouter(withUserDefaults(PackagesPage))