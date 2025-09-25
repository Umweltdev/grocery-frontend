import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getUserCart = async () => {
  try {
    const response = await axios.get(`${base_url}user/cart`, config);
    if (response.data && response.data.products) {
      return {
        cartTotal: response.data.cartTotal || 0,
        products: response.data.products.map((product) => ({
          price: product.price,
          id: product.id?._id || product.id,
          image: product.image,
          total: product.price * product.count,
          count: product.count,
          name: product.name
        })),
      };
    }
    return { products: [], cartTotal: 0 };
  } catch (error) {
    console.error("Cart service error:", error);
    return { products: [], cartTotal: 0 };
  }
};

const cartService = {
  getUserCart,
};

export default cartService;
