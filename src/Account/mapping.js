import { setUser } from '../auth';
import { addUser, verifyUser, findUser } from '../auth/userDb';

export default store => ({
  user: store.getState().user,
  mode: store.getState().mode || 'login',
  changeMode: (mode) => {
    store.setState({ mode });
  },
  onLogin: (login) => {
    const user = verifyUser(login);
    if (user) {
      setUser(user);
      store.setState({ user });
      return true;
    }

    return false;
  },
  onRegister: (user) => {
    const existing = findUser(user.userName);
    if (existing) {
      return {
        hasError: true,
        message: `Duplicate username ${user.userName}`,
      };
    }
    addUser(user);
    setUser(user);
    store.setState({ user });
    return null;
  }
});
