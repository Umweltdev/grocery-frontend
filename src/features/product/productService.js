import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async (data) => {
  const { minPrice, maxPrice, rating, selectedBrands, sort, sales,stock,featured,pCategory } =
    data || {}; 
  const queryParams = `${minPrice ? `minPrice=${minPrice}&` : ""}${
    maxPrice ? `maxPrice=${maxPrice}&` : ""
  }${rating ? `totalstar=${rating}&` : ""}${
    selectedBrands ? `brands=${selectedBrands.join(",")}&` : ""
  }${sort ? `sort=${sort}&` : ""}${sales ? `sales=${sales}&` : ""}${
    stock ? `stock=${stock}&` : ""
  }${featured ? `featured=${featured}&` : ""}${
    pCategory ? `categoryId=${pCategory}&` : ""
  }`;
  const url = `${base_url}product?${queryParams}`;
  const response = await axios.get(url);
  return response.data;
};
const searchProduct = async (query) => {
  const response = await axios.get(`${base_url}product/search?query=${query}`);
  return response.data;
};

const createProduct = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  
  const response = await axios.post(`${base_url}product/`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const updateProduct = async (id, product) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  
  const response = await axios.put(`${base_url}product/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
const getProductByCategory = async (id) => {
  const response = await axios.get(`${base_url}product/category/${id}`, config);
  return response.data;
};

const togglePublish = async (id, published) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const response = await axios.put(
    `${base_url}product/toggle-publish/${id}`,
    { published },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProductByCategory,
  searchProduct,
  togglePublish
};

export default productService;
