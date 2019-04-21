//Libs
import React, { Component } from 'react';
import { withUserDefaults } from '../../commons/components/UserDefaults';

//Api

//Components


//Styles

//const


class PackagesPage extends Component {

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
        <h2>{getWord('PACKAGES')}</h2>

      </div>
    );
  }
}

export default withUserDefaults(PackagesPage)