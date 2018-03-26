import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component{
  state = {
    profile: {}
  }

  componentWillMount() {
    const {
      userProfile,
      getProfile
    } = this.props.auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    }
  }

  render = () => {
    const {
      isAuthenticated,
      login,
      logout,
      userProfile
    } = this.props.auth;

    return (
      <nav>
        <Link
          to="/dashboard"
        >Dashboard</Link>
        {
          !isAuthenticated() && (
            <button
              onClick={login}
              type="button"
            >
              Log In
            </button>
          )
        }
        {
          isAuthenticated() && (
            <button
              onClick={logout}
              type="button"
            >
              Log Out
            </button>
          )
        }
      {JSON.stringify(userProfile)}
      </nav>
    )
  };
}

export default Navigation;
