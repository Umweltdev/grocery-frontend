import axios from "axios";
import { config, updateConfigToken } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const signup = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);
  const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
  const userData = {
    ...response.data,
    expirationTime: expirationTime,
  };
  localStorage.setItem("user", JSON.stringify(userData));
  updateConfigToken();
  return userData;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
  const userData = {
    ...response.data,
    expirationTime: expirationTime,
  };
  localStorage.setItem("user", JSON.stringify(userData));
  updateConfigToken();
  return userData;
};

const userCart = async (data) => {
  // console.log(cart)
  const response = await axios.post(
    `${base_url}user/cart`,
    { cart: data.cart },
    config
  );
  return response.data;
};

const editProfile = async (userData) => {
  const response = await axios.put(`${base_url}user`, userData, config);
  const data = {
    _id: response.data._id,
    fullName: response.data.fullName,
    role: response.data.role,
    email: response.data.email,
    phone: response.data.phone,
    dob: response.data.dob,
    orders: response.data.orderCount,
    image: response?.data?.image?.url,
  };
  return data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-orders`, config);
  return response.data;
};

const getCards = async () => {
  const response = await axios.get(`${base_url}card`, config);
  return response.data;
};

const getWishList = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  return response.data.wishlist;
};

const authService = {
  login,
  signup,
  userCart,
  editProfile,
  getOrders,
  getCards,
  getWishList,
};

export default authService;
