import axios from 'axios';
import { deleteUser } from '../../auth';
import parentMapping from '../mapping';

export default store => ({
  ...parentMapping(store),
  userData: store.getState().userData,
  selectedUser: store.getState().selectedUser,
  users: store.getState().users,
  posts: store.getState().posts,
  loading: store.getState().loading || false,

  logout: () => {
    deleteUser();
    store.setState({ user: null });
  },
  loadPosts: (userId) => {
    const posts = store.getState().posts;

    if (posts) {
      store.setState({
        posts: [],
      })
    };

    store.setState({
      loading: true
    })

    setTimeout(() => {
      axios.get(`/api/posts?userId=${userId}`)
        .then(response => response.data)
        .then((posts) => {
          store.setState({
            posts,
            loading: false,
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
    }, 2000)
  },
});
