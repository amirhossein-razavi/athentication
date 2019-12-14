import React from 'react';
import { connect } from 'cato-react-store';
import { Link } from 'react-router-dom';

import { getUser } from '../../auth';
import mapping from './mapping';

class HomePage extends React.PureComponent {
  componentDidMount() {
    const { users, loadUsers, loadPosts, match } = this.props;
    const { userId } = match.params;
    if (!users) {
      loadUsers();
    }

    loadPosts(userId);
  }

  render() {
    const currentUser = getUser();
    const { logout, posts = [], loading, match, users } = this.props;
    const { userId } = match.params;
    const selectedUser = (users && users.find(user => user.id === parseInt(userId, 0)));

    return (
      <div className="container">
        <div className="row align-items-center p-2 bg-light">
          <div className="col-8">
            {currentUser.name}
          </div>
          <div className="col-1">
            <Link to='/account'>
              <button
                className="btn btn-primary"
                onClick={() => logout()}
              >
                Logout
        </button>
            </Link>
          </div>
          <div className="col-2">
            <Link to='/'>
              <button
                className="btn btn-primary"
              >
                Back to Menu
        </button>
            </Link>
          </div>
        </div>
        {selectedUser &&
        <>
          <div className="row mt-2 align-items-center bg-light">
            <div className="col-md-3 ml-5 mt-2">
              <img src={`/assets/images/profile${selectedUser.img}.jpg`} className="profileImg" alt="avatar"></img>
            </div>
            <div className="col-md-8 mt-2 row">
              <h5 className="col-md-4">
                5,963
                  </h5>
              <h5 className="col-md-4">
                308 M
                  </h5>
              <h5 className="col-md-4">
                223 M
                  </h5>
              <h5 className="col-md-4 text-muted">
                Posts
                  </h5>
              <h5 className="col-md-4 text-muted">
                followers
                  </h5>
              <h5 className="col-md-4 text-muted">
                following
                  </h5>
            </div>
          </div>

          <div className="row align-items-center bg-light">
            <div className="ml-5 mt-4 col-md-12">
              <h4> {selectedUser.name} </h4>
            </div>
            <div className="ml-5 col-md-4">
              <p> {selectedUser.company.catchPhrase} {selectedUser.company.catchPhrase} {selectedUser.company.catchPhrase} </p>
            </div>
          </div>
          </>
        }
        {posts.length
          ? <>
            <div className="row mt-5 bg-light">
              {posts.map((post) => (
                <div className="col-5 col-md-3 mt-4">
                  <img src={post.url} alt="sarb" width="200px" hight="200px"></img>
                </div>
              ))}
            </div>

          </>
          : loading
            ? <div className="row justify-content-center mt-5">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            : <div>sarb</div>
        }
      </div>
    );

    //   if (posts) {
    //     return (


    //       </div >
    //     )
    //   }
    //   else return (
    //     <div className="container">
    //       <h1>There is no selected user</h1>
    //       <Link to='/'>
    //         <button
    //           className="btn btn-primary"
    //         >
    //           Back to Menu
    //             </button>
    //       </Link>
    //     </div>
    //   );
    // }
  }
}

export default connect(mapping)(HomePage);
