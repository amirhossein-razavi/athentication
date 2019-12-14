import React from 'react';
import { connect } from 'cato-react-store';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getUser } from './auth';
import Account from './Account';
import Home from './Home';
import Post from './Home/Post';
import mapping from './mapping';

class App extends React.PureComponent {
  componentDidMount() {
    const user = getUser();
    const { setUser } = this.props;

    setUser(user);
  }

  render() {
    const user = getUser();
    console.log(user);

    return (
      <div>
        <Switch>
          <Route path="/account" component={Account} />
          <Route path={`/user/:userId/posts`} component={Post} />
          {user ? <Route path="/" exact component={Home} /> : <Redirect to='/account' />}
        </Switch>
      </div>
    );
  }

}

export default connect(mapping)(App);
