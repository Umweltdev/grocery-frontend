import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const orderService = {
  getAllOrders,
};

export default orderService;
