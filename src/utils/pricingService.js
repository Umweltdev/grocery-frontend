import axios from "axios";
import { config } from "./axiosconfig";
import { base_url } from "./baseUrl";

const getPricingConfig = async () => {
  try {
    const response = await axios.get(`${base_url}pricing/config`, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pricing config:', error);
    throw error;
  }
};

const updatePricingConfig = async (configData) => {
  const response = await axios.put(`${base_url}pricing/config`, configData, config);
  return response.data;
};

const getAnalytics = async () => {
  const response = await axios.get(`${base_url}pricing/analytics`, config);
  return response.data;
};

const addMarketingSpend = async (spendData) => {
  if (!spendData) {
    throw new Error('Spend data is required');
  }
  try {
    const response = await axios.post(`${base_url}pricing/marketing-spend`, spendData, config);
    return response.data;
  } catch (error) {
    console.error('Failed to add marketing spend:', error);
    throw error;
  }
};

const pricingService = {
  getPricingConfig,
  updatePricingConfig,
  getAnalytics,
  addMarketingSpend,
};

export default pricingService;