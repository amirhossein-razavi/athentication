import React from 'react';
import { connect } from 'cato-react-store';
import { Link } from 'react-router-dom';
import { setUser } from '../../auth';
import mapping from '../mapping';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        userName: '',
        password: '',
        verifyPassword: '',
      },
      error: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(prop, value) {
    this.setState(state => ({
      user: {
        ...state.user,
        [prop]: value,
      },
    }));
  }

  onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { user } = this.state;
    const { onRegister, setNewUser } = this.props;

    // TODO: validation

    onRegister(user)
      .then(result => {
        console.log(result);
        if (!result) {
          this.setState({
            error: `Duplicate username ${user.userName}`,
          });
        } else {
          this.setState({
            error: '',
          });
          setUser(result);
          setNewUser(result);
          window.location.href = "http://localhost:3000";
        }
      })
      .catch(err => {
        this.setState({
          error: err.message || err.data || 'Unknown error',
        });
      });

    // const result = onRegister(user);
    // if (result && result.hasError) {
    //   this.setState({
    //     error: result.message,
    //   });
    // }
  }

  render() {
    const { changeMode } = this.props;
    const { user, error } = this.state;
    console.log(error);

    return (
      <div className="card shadow-sm no-border">
        <div className="card-header">
          <h5>Register</h5>
        </div>
        <div className="card-body">

          <form>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={user.name}
                onChange={e => this.onChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={user.userName}
                onChange={e => this.onChange('userName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={user.password}
                onChange={e => this.onChange('password', e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Verify Password"
                value={user.verifyPassword}
                onChange={e => this.onChange('verifyPassword', e.target.value)}
              />
            </div>

            {error && (
              <div className="form-group">
                <div className="alert alert-warning">
                  {error}
                </div>
              </div>
            )}

            <div className="form-group">
              <Link to='/'>
                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                  onClick={() => this.onSubmit()}
                >
                  {'Register'}
                </button>
              </Link>

              <button
                type="button"
                className="btn btn-light"
                onClick={() => changeMode('login')}
              >
                {'Login'}
              </button>
            </div>
          </form>

        </div>
      </div >
    );
  };
}

export default connect(mapping)(Register);