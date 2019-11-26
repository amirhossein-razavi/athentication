import React from 'react';
import { connect } from 'cato-react-store';

import { getUser } from './auth';
import Account from './Account';
import Home from './Home';
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
      return <Home />;
    }

    return <Account />;
  }
}

export default connect(mapping)(App);
