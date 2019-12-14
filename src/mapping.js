import { deleteUser } from './auth';

export default store => ({
  user: store.getState().user,
  selectedUser: store.getState().selectedUser,

  setUser: (user) => {
    store.setState({ user });
  },
  logout: () => {
    deleteUser();
    store.setState({ user: null });
  },
});
