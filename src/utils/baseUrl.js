let base_url;

if (import.meta.env.MODE === "development") {
  base_url = "https://www.kaccocashncarry.co.uk/api/";
} else {
  base_url = "https://www.kaccocashncarry.co.uk/api/";
}

export { base_url };
