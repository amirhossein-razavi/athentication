import { deleteUser } from './auth';

export default store => ({
  user: store.getState().user,
  setUser: (user) => {
    store.setState({ user });
  },
  logout: () => {
    deleteUser();
    store.setState({ user: null });
  },
});
