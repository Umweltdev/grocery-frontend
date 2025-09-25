import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Carousel, Carousel1, Carousel2 } from "./Carousel";
import CategoryCard from "./CategoryCard";

const fallbackCategories = [
  { _id: "electronics", name: "Electronics", image: { url: "https://picsum.photos/300/200?random=1" } },
  { _id: "fashion", name: "Fashion", image: { url: "https://picsum.photos/300/200?random=2" } },
  { _id: "home-kitchen", name: "Home & Kitchen", image: { url: "https://picsum.photos/300/200?random=3" } },
  { _id: "sports", name: "Sports & Outdoors", image: { url: "https://picsum.photos/300/200?random=4" } },
  { _id: "beauty", name: "Beauty & Personal Care", image: { url: "https://picsum.photos/300/200?random=5" } },
  { _id: "p1", name: "Wireless Headphones", image: "https://picsum.photos/200/200?random=11", price: 99, stock: 10 },
  { _id: "p2", name: "Smart Watch", image: "https://picsum.photos/200/200?random=12", price: 150, stock: 8 },
  { _id: "p3", name: "Running Shoes", image: "https://picsum.photos/200/200?random=13", price: 120, stock: 12 },
  { _id: "p4", name: "Organic Juice Pack", image: "https://picsum.photos/200/200?random=14", price: 20, stock: 30 },
  { _id: "p5", name: "Gaming Laptop", image: "https://picsum.photos/200/200?random=15", price: 999, stock: 5 },
  { _id: "p6", name: "Bluetooth Speaker", image: "https://picsum.photos/200/200?random=16", price: 60, stock: 15 },
  { _id: "p7", name: "Leather Wallet", image: "https://picsum.photos/200/200?random=17", price: 45, stock: 20 },
  { _id: "p8", name: "Fitness Tracker", image: "https://picsum.photos/200/200?random=18", price: 80, stock: 7 },
  { _id: "p9", name: "Electric Kettle", image: "https://picsum.photos/200/200?random=19", price: 35, stock: 25 },

];

const fallbackBestSellers = [
  {
    _id: "b1",
    name: "Smartphone",
    image: "https://picsum.photos/200/200?random=30",
    price: 599,
    stock: 8,
  },
  {
    _id: "b2",
    name: "Wireless Earbuds",
    image: "https://picsum.photos/200/200?random=31",
    price: 79,
    stock: 15,
  },
  {
    _id: "b3",
    name: "Gaming Console",
    image: "https://picsum.photos/200/200?random=32",
    price: 399,
    stock: 6,
  },
];

const fallbackSnacks = [
  {
    _id: "s1",
    name: "Potato Chips",
    image: "https://picsum.photos/200/200?random=33",
    price: 3,
    stock: 50,
  },
  {
    _id: "s2",
    name: "Orange Juice",
    image: "https://picsum.photos/200/200?random=34",
    price: 4,
    stock: 40,
  },
  {
    _id: "s3",
    name: "Cheese Pack",
    image: "https://picsum.photos/200/200?random=35",
    price: 6,
    stock: 30,
  },
  {
    _id: "s4",
    name: "Chocolate Bar",
    image: "https://picsum.photos/200/200?random=36",
    price: 2,
    stock: 100,
  },
];

const fallbackComments = [
  {
    id: 1,
    user: "John D.",
    text: "Really love the snacks collection here!",
    rating: 5,
  },
  {
    id: 2,
    user: "Sarah M.",
    text: "Fast delivery and fresh products.",
    rating: 4,
  },
];



const Shop = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories, isLoading: categoryLoading } = useSelector(
    (state) => state.category
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryLoading && !isLoading) {
      const timeout = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [categoryLoading, isLoading]);

   const filteredProduct = products.filter(
     (product) =>
       product.stock > 0 || (product.stock <= 0 && product.reStock === true)
   );

  const categoriesToShow =
    categories && categories.length > 0 ? categories : fallbackCategories;

  return (
    <Box>
      <Stack spacing={8}>
        <Carousel2 />

        {/* ✅ Categories */}
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            textAlign="center"
          >
            Shop by Category
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress size={48} thickness={4} color="error" />
            </Box>
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {categoriesToShow.map((item) => (
                <CategoryCard key={item._id} {...item} />
              ))}
            </Grid>
          )}
        </Stack>

        <Carousel
          title="🔥 Best Selling in Your Area"
          productList={
            filteredProduct.length > 0 ? filteredProduct : fallbackBestSellers
          }
        />
        <Carousel1 />
        <Carousel
          title="🥤 Snacks, Drinks, Dairy & More"
          productList={
            filteredProduct.length > 0 ? filteredProduct : fallbackSnacks
          }
          isLoading={isLoading}
        />
        <Comment
          products={
            filteredProduct.length > 0 ? filteredProduct : fallbackComments
          }
        />
      </Stack>
    </Box>
  );
};

export default Shop;
