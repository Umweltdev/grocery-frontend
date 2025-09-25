import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCategories = async (level) => {
  const url = level ? `${base_url}category?level=${level}` : `${base_url}category`;

  const response = await axios.get(url);
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    category.categoryData,
    config
  );
  return response.data;
};

const CategoryService = {
  getCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

export default CategoryService;
