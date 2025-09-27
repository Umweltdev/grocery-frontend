import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  searchProduct,
} from "../../features/product/productSlice";
import {
  Stack,
  Grid,
  CircularProgress,
  Box,
  Typography,
  Pagination,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import ICard from "../../components/ui-elements/Card";
import ProductCard from "./ProductCard";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const Products = ({ activeIcon, category, search, itemsPerPage = 6 }) => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (category) {
      dispatch(getProducts({ category }));
    } else if (search) {
      dispatch(searchProduct(search));
    } else {
      dispatch(getProducts());
    }
  }, [category, search, dispatch]);

  const filteredProducts = products.filter(
    (product) => product.stock > 0 || (product.stock <= 0 && product.reStock)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredProducts.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: 300,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!filteredProducts.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: 5,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            p: 4,
            width: { xs: "90%", sm: "70%", md: "400px" },
            minHeight: 400,
            textAlign: "center",
          }}
        >
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: 60, color: "text.secondary" }}
          />
          <Typography variant="h6" fontWeight={500}>
            Sorry, we couldn&apos;t find the product you are looking for.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please explore our other exciting products!
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {paginatedData.map((item) => (
          <Grid
            item
            key={item._id}
            xs={12}
            sm={activeIcon === "apps" ? 6 : 12} // 2 per row on tablet in grid mode
            md={activeIcon === "apps" ? 4 : 12} // 3 per row on desktop in grid mode
            display="flex"
            justifyContent="center"
          >
            <Box sx={{ width: "100%", maxWidth: 384, display: "flex" }}>
              {activeIcon === "apps" ? (
                <ICard {...item} />
              ) : (
                <ProductCard {...item} />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
};

Products.propTypes = {
  activeIcon: PropTypes.oneOf(["apps", "view"]),
  category: PropTypes.string,
  search: PropTypes.string,
  itemsPerPage: PropTypes.number,
};

Products.defaultProps = {
  activeIcon: "apps",
  category: null,
  search: null,
  itemsPerPage: 6,
};

export default Products;
