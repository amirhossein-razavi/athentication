export const getUser = () => {
  const currentUserData = localStorage.currentUserData;
  if (currentUserData) {
    const currentUser = JSON.parse(currentUserData);
    return currentUser;
  }

  return null;
};

export const setUser = (currentUser) => {
  const currentUserData = JSON.stringify(currentUser);

  localStorage.currentUserData = currentUserData;
};

export const deleteUser = () => {
  localStorage.currentUserData = null;
};

