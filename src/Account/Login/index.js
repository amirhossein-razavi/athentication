import React from 'react';
import { connect } from 'cato-react-store';
import mapping from '../mapping';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        userName: '',
        password: '',
      },
      error: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(prop, value) {
    this.setState(state => ({
      login: {
        ...state.login,
        [prop]: value,
      },
    }));
  }

  onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { login } = this.state;
    const { onLogin } = this.props;

    // TODO: validation

    const result = onLogin(login);

    if (!result) {
      this.setState({
        error: 'Invalid username or password',
      });
    }
  }

  render() {
    const { changeMode } = this.props;
    const { login, error } = this.state;

    return (
      <div className="card shadow-sm no-border">
        <div className="card-header">
          <h5>Login</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={login.userName}
                onChange={e => this.onChange('userName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={login.password}
                onChange={e => this.onChange('password', e.target.value)}
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
              <button
                type="submit"
                className="btn btn-primary mr-2"
              >
                {'Login'}
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={() => changeMode('register')}
              >
                {'Register'}
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  };
}

export default connect(mapping)(Login);