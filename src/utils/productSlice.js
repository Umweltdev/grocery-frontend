import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "./baseUrl";

export const createProducts = createAsyncThunk(
  "product/create",
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key !== "images") {
          formData.append(key, values[key]);
        }
      });

      values.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });

      const response = await axios.post(`${base_url}product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }, thunkAPI) => {
    try {
      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (key !== "images" && key !== "previousImages") {
          formData.append(key, productData[key]);
        }
      });

      if (productData.previousImages) {
        formData.append("previousImages", JSON.stringify(productData.previousImages));
      }

      productData.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });

      const response = await axios.put(`${base_url}product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
