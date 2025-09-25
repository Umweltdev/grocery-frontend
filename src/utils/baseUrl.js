let base_url;
if (import.meta.env.MODE === "development") {
  base_url = "http://localhost:8080/api/";
} else {
  base_url = "https://grocery-ecommerce-platform.onrender.com/api/";
}

export { base_url };



// https://grocery-ecommerce-platform.onrender.com/api/product