const getUsers = () => {
  const { usersData } = localStorage;
  if (!usersData) return [];
  return JSON.parse(usersData);
}

const saveUsers = (users) => {
  const usersData = JSON.stringify(users);
  localStorage.usersData = usersData;
};

export const findUser = (userName) => {
  const users = getUsers();
  return users.find(user => user.userName === userName);
};

export const verifyUser = ({ userName, password }) => {
  const users = getUsers();
  console.log(userName, password, users);
  return users.find(user => (
    user.userName === userName
    && user.password === password
  ));
};

export const addUser = (user) => {
  const users = getUsers();

  const newUsers = [
    ...users,
    user,
  ];

  saveUsers(newUsers);
};
