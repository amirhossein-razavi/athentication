import React from 'react';
import { connect } from 'cato-react-store';
import mapping from './mapping';

import Login from './Login';
import Register from './Register';

const Account = ({ mode }) => (
  <div className="container mt-5">
    {mode === 'register' ? <Register /> : <Login />}
  </div>
);

export default connect(mapping)(Account);