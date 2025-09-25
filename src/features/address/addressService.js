import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const createAddress = async (address) => {
  const response = await axios.post(`${base_url}address/`, address, config);
  return response.data;
};

const getAddresses = async () => {
  const response = await axios.get(`${base_url}address/`, config);
  return response.data;
};

const getCollectionAddresses = async () => {
  const response = await axios.get(
    `${base_url}address?type=collection`,
    config
  );
  return response.data;
};

const getBillingAddresses = async () => {
  const response = await axios.get(
    `${base_url}address?type=billing`,
    config
  );
  return response.data;
};

const updateAddress = async (address) => {
  const response = await axios.put(
    `${base_url}address/${address.id}`,
    address.addressData,
    config
  );
  return response.data;
};

const getAddress = async (id) => {
  const response = await axios.get(`${base_url}address/${id}`, config);
  return response.data;
};

const deleteAddress = async (id) => {
  const response = await axios.delete(`${base_url}address/${id}`, config);
  return response.data;
};

const addressService = {
  createAddress,
  getAddresses,
  updateAddress,
  getAddress,
  deleteAddress,
  getCollectionAddresses,
  getBillingAddresses
};

export default addressService;
