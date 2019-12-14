import { setUser } from '../auth';
import { addUser, verifyUser, findUser } from '../auth/userDb';
import axios from 'axios';

export default store => ({
  user: store.getState().user,
  mode: store.getState().mode || 'login',
  validateUser: store.getState().validateUser || false,

  changeMode: (mode) => {
    store.setState({ mode });
  },


  onLogin: (login) => {

    return axios.post('/api/auth/login', login)
      .then(response => response.data)
      .then((validateUser) => {
        console.log(validateUser);
        return validateUser;
      });

    // const loginUser = () => {
    //   setTimeout(() => {
    //     const validateUser = store.getState().validateUser;


    //     if (validateUser) {
    //       console.log(validateUser);
    //       // setUser(login);
    //       // store.setState({ user: login });
    //       // window.location.href = "http://localhost:3000";
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }, 1000)
    // };

    // loginUser(); 
    // console.log(loginUser());



    // const user = verifyUser(login);
    // if (user) {
    //   setUser(user);
    //   store.setState({ user });
    //   return true;
    // }

    // return false;
  },

  setNewUser: (user) => {
    store.setState({
      user
    })
  },

  onRegister: (user) => {
    // const existing = findUser(user.userName);
    // if (existing) {
    //   return {
    //     hasError: true,
    //     message: `Duplicate username ${user.userName}`,
    //   };
    // }

    return axios.post('/api/auth/register', user)
      .then(response => response.data)
      .then((user) => {
        console.log(user);
        return user;
      });

  },
});
