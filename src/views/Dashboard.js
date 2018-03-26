import React from 'react';

import Habits from '../components/Habits';

class Dashboard extends React.Component{
  componentWillMount = () => {
    const {
      auth
    } = this.props;

    if (!auth.isAuthenticated()) auth.login();
  }

  render = () => {
    return (
      <div
      >
        <Habits />
      </div>
    )
  };
}

export default Dashboard;
