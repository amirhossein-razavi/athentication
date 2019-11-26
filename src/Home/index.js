import React from 'react';
import { connect } from 'cato-react-store';

import { getUser } from '../auth';
import mapping from './mapping';

class HomePage extends React.PureComponent {
  componentDidMount() {
    const { users, loadUsers } = this.props;

    if (!users) {
      loadUsers();
    }
  }

  render() {
    const currentUser = getUser();
    const { users = [], alert, page = 0 } = this.props;

    const pageSize = 5;

    const list = users.slice(
      page * pageSize,
      (page + 1) * pageSize,
    );

    return (
      <div>
        <div className="p-2 bg-light">
          {`Welcome ${currentUser.name}`}
        </div>
        <div className="mt-2">
          <h1>This is homepage</h1>
          {alert && (
            <div className={`mt-1 mb-1 alert ${alert.css}`}>
              {alert.message}
            </div>
          )}
          <h3>User list of {users.length}</h3>
          <ul className="list-group">
            {list.map(user => (
              <li key={user.id} className="list-group-item">
                <h4>#{user.id} - {user.name}</h4>
                <p>{user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapping)(HomePage);
