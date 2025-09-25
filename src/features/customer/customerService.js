import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCustomers = async () => {
  const response = await axios.get(`${base_url}user/get-users`, config);
  return response.data;
};


const deleteCustomer = async (id) => {
  const response = await axios.delete(`${base_url}user/${id}`, config);
  return response.data;
};


// const updateProduct = async (product) => {
//   const response = await axios.put(
//     `${base_url}product/${product.id}`,
//     product.productData,
//     config
//   );

//   return response.data;
// };
const customerService = {
  getCustomers,
  deleteCustomer
  
};

export default customerService;
