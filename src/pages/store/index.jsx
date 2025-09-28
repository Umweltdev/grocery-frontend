import { useState, useEffect } from "react";
import { Grid, Box, Divider, styled, Drawer, Container } from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Products from "./Products";
import Sort from "./Sort";
import Category from "./Category";
import Range from "./Range";
import Brand from "./Brand";
import Rating from "./Rating";
import Features from "./Features";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../features/product/productSlice";

const CustomDivider = styled(Divider)`
  margin: 16px 0 24px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const Store = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const search = queryParams.get("search");

  const [activeIcon, setActiveIcon] = useState("apps");
  const [rating, setRating] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [sales, setSales] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [stock, setStock] = useState(null);
  const [pCategory] = useState(category || null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    dispatch(
      getProducts({
        rating,
        minPrice,
        maxPrice,
        selectedBrands,
        sort,
        sales,
        featured,
        stock,
        pCategory,
      })
    );
  }, [
    rating,
    minPrice,
    maxPrice,
    selectedBrands,
    sort,
    sales,
    featured,
    stock,
    pCategory,
    dispatch,
  ]);

  const Filters = () => (
    <Box
      p={3}
      bgcolor="white"
      borderRadius={2}
      sx={{ boxShadow: "0 1px 3px rgba(3,0,71,0.09)" }}
    >
      <Category pCategory={pCategory} closeDrawer={toggleDrawer} />
      <CustomDivider />
      <Range
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <CustomDivider />
      <Brand
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />
      <CustomDivider />
      <Features
        sales={sales}
        setSales={setSales}
        featured={featured}
        setFeatured={setFeatured}
        stock={stock}
        setStock={setStock}
      />
      <CustomDivider />
      <Rating rating={rating} setRating={setRating} />
    </Box>
  );

  return (
    <>
      <Header />

      <Box
        sx={{
          bgcolor: "#F6F9FC",
          py: 3,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters
          sx={{ px: { xs: 1, sm: 2, md: 3 } }}
        >
          <Grid container spacing={3}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <Filters />
            </Grid>
            <Grid item xs={12} md={9}>
              <Sort
                activeIcon={activeIcon}
                setActiveIcon={setActiveIcon}
                sort={sort}
                setSort={setSort}
                openDrawer={toggleDrawer}
              />
              <Box
                bgcolor="white"
                p={{ xs: 1.5, sm: 3 }}
                justifyContent="center"
                boxShadow="0px 3px 10px rgba(0,0,0,0.08)"
                sx={{ width: "100%" }}
              >
                <Products
                  activeIcon={activeIcon}
                  category={category}
                  search={search}
                />
              </Box>

            </Grid>
          </Grid>
        </Container>
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        anchor="left"
        sx={{
          "& .MuiPaper-root": {
            width: 320,
            bgcolor: "white",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            py: 2,
            px: 2,
            "&::-webkit-scrollbar": { width: 5 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#ebeff7",
              borderRadius: 100,
            },
          }}
        >
          <Filters />
        </Box>
      </Drawer>

      <Footer />
    </>
  );
};

export default Store;
