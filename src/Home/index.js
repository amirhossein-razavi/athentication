import React from 'react';
import { connect } from 'cato-react-store';
import { Link } from 'react-router-dom';

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
    const { users = [], alert, page = 0, showUserData, userData, logout, selectedUser = {}, fetchSelectedUser } = this.props;
    const showUser = (user) => userData && userData.id === user.id;

    // const pageSize = 5;

    // const list = users.slice(
    //   page * pageSize,
    //   (page + 1) * pageSize,
    // );

    return (
      <div className="container">
        <div className="row justify-content-between align-items-center p-2 bg-light">
          <div>
            {`Welcome ${currentUser.name}`}
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => logout()}
            >Logout</button>
          </div>
        </div>
        <div className="mt-2">
          {alert && (
            <div className={`mt-1 mb-1 alert ${alert.css}`}>
              {alert.message}
            </div>
          )}
          <h3>Users list</h3>
          <div className="row mt-3">
            <div className="col-12 col-md-6 usersList">
              <ul className={"list-unstyled usersItems"}>
                {users.map(user => (
                  <li key={user.id} className={showUser(user) ? "media p-3 mt-3 userCardSelected" : "media p-3 mt-3 userCard"} onClick={() => showUserData(user.id)}>
                    <div className="row boxImg justify-content-center col-5 col-md-3">
                      <img src={`/assets/images/profile${user.img}.jpg`} className="mr-3 profileImg" alt="avatar"></img>
                    </div>
                    <div className="row media-body mt-3 align-items-center col-6 col-md-9">
                      <div className="col-10">
                        <h4 className="mt-0 mb-1">{user.name}</h4>
                        {user.email}
                      </div>
                      <div className="col-1 col-md-2">
                        <span><i className={showUser(user) ? "fa fa-chevron-down fa-lg text-secondary ml-md-4" : "fa fa-chevron-right text-secondary ml-md-4"}></i></span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {userData &&
              <div className="container col-12 col-md-6 mt-5 mt-md-0">
                <div className="row justify-content-center">
                  <div>
                    <img src={`/assets/images/profile${userData.img}.jpg`} className="profileImgShow" alt="avatar"></img>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="mt-1">
                    <h3>{userData.name}</h3>
                  </div>
                </div>
                <div className="row mt-3 ml-5">
                  <div>
                    <p><span><i className="fa fa-user mr-2 text-secondary"></i></span><strong>userName : </strong>{userData.username}</p>
                    <p><span><i className="fa fa-envelope mr-2 text-info"></i></span><strong>email : </strong>{userData.email}</p>
                    <p><span><i className="fa fa-phone mr-2 text-success"></i></span><strong>phone : </strong>{userData.phone}</p>
                    <p><span><i className="fa fa-wordpress mr-2 text-dark"></i></span><strong>website : </strong>{userData.website}</p>
                    <p><span><i className="fa fa-building mr-2 text-warning"></i></span><strong>company : </strong>{userData.company.name}</p>
                    <p><span><i className="fa fa-map-marker mr-2 text-danger"></i></span><strong>address : </strong>{userData.address.city},{userData.address.street},{userData.address.suite}</p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <Link to={`/user/${userData.id}/posts`}>
                    <button
                      className="btn btn-primary"
                      onClick={() => fetchSelectedUser(userData.id)}
                    >
                      User Profile
                    </button>
                  </Link>
                </div>

              </div>
            }
          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapping)(HomePage);
