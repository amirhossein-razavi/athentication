import React from 'react';
import { connect } from 'cato-react-store';

import { getUser } from './auth';
import Account from './Account';
import mapping from './mapping';

class App extends React.PureComponent {
  componentDidMount() {
    const user = getUser();
    const { setUser } = this.props;

    setUser(user);
  }

  render() {
    const { user, logout } = this.props;

    if (user) {
      return (
        <div>
          <h1>Hello dear user {user.name}</h1>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => logout()}
          >
            {'Logout'}
          </button>
        </div>
      );
    }

    return <Account />;
  }
}

export default connect(mapping)(App);
