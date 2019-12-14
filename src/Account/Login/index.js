import React from 'react';
import { connect } from 'cato-react-store';
import { setUser } from '../../auth';
import mapping from '../mapping';


// let history = useHistory();

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
    const { onLogin , setNewUser} = this.props;

    // TODO: validation

    onLogin(login)
      .then(result => {
        if (!result) {
          this.setState({
            error: 'Invalid username or password',
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

  }

  render() {
    const { changeMode, user } = this.props;
    const { login, error } = this.state;


    return (
      <div className="card shadow-sm no-border">
        <div className="card-header">
          <h5>Login</h5>
        </div>
        <div className="card-body">
          <form>

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
                onClick={(e) => this.onSubmit(e)}
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