import axios from 'axios';

export default store => ({
  users: store.getState().users,
  alert: store.getState().alert,
  loadUsers: () => {
    store.setState({
      alert: {
        css: 'alert-info',
        message: 'Loading users...',
      },
    });

    setTimeout(() => {
      // load users
      axios.get('https://jsonplaceholder.typicode.com/users')
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
});
