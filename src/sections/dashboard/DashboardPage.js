//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withUserDefaults } from '../../commons/components/UserDefaults';

//Api

//Components



//Styles

//const


class DashboardPage extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    const {
      getWord
    } = this.props.userDefaults;
    return (
      <div>
        <h2>{getWord('DASHBOARD')}</h2>

      </div>
    );
  }
}

export default withRouter(DashboardPage)
export default withUserDefaults(DashboardPage)