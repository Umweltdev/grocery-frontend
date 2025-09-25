const getUserFromStorage = () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== 'null') {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  }

  return null;
};


const initialUser = getUserFromStorage();

const initialToken = initialUser ? initialUser.token : '';


export const config = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${initialToken}`,
  },
};

export const updateConfigToken = () => {
  const user = getUserFromStorage();
  const token = user ? user.token : '';
  config.headers.Authorization = `Bearer ${token}`;
};