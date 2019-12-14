import axios from 'axios';
import { deleteUser } from '../auth';

export default store => ({
  users: store.getState().users,
  alert: store.getState().alert,
  userData: store.getState().userData,
  selectedUser: store.getState().selectedUser,

  loadUsers: () => {
    store.setState({
      alert: {
        css: 'alert-info',
        message: 'Loading users...',
      },
    });

    setTimeout(() => {
      // load users
      axios.get('/api/users')
        .then(response => response.data)
        .then((users) => {
          store.setState({
            alert: null,
            users,
          });
        })
        .catch((err) => {
          store.setState({
            alert: {
              css: 'alert-warning',
              message: err.message || err.data || 'Unknown Error',
            }
          });
        });
    }, 1000);
  },

  showUserData: (id) => {
    const { users } = store.getState();
    const selectedUser = users.filter(user => user.id === id);
    const currentUser = selectedUser[0];

    store.setState({
      userData: currentUser,
    })
  },

  fetchSelectedUser: (id) => {

    axios.get(`/api/user/${id}`)
      .then(response => response.data)
      .then((user) => {
        store.setState({
          selectedUser: user,
        })
      })
      .catch((err) => {
        store.setState({
          alert: {
            css: 'alert-warning',
            message: err.message || err.data || 'Unknown Error',
          }
        });
      });
  },

  logout: () => {
    deleteUser();
    store.setState({ user: null });
  },
});
