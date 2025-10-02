let base_url;

if (import.meta.env.MODE === "development") {
  base_url = "http://localhost:8080/api/";
} else {
  base_url = "https://grocery-backend-nkxh.onrender.com/api/";
}

export { base_url };
