import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getUserCart = async () => {
  const response = await axios.get(`${base_url}user/cart`,config);
  if (response.data !== null) {
    const obj = {
      cartTotal: response?.data.cartTotal,
      products: response?.data.products.map((product) => ({
        price: product.price,
        id: product.id._id,
        image: product.image,
        total: product.price * product.count,
        count: product.count,
        name: product.name
      })),
    };
    return obj;
  }
  return response.data
};

const cartService = {
  getUserCart,
};

export default cartService;
