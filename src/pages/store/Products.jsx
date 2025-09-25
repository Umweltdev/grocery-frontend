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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!filteredProducts.length) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "500px",
          textAlign: "center",
        }}
      >
        <SentimentVeryDissatisfiedIcon
          sx={{ fontSize: 50, color: "text.secondary" }}
        />
        <Typography variant="h6">
          Sorry, we couldn&apos;t find the product you are looking for.
        </Typography>
        <Typography variant="h6">
          Please explore our other exciting products!
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        {paginatedData.map((item) => (
          <Grid
            item
            xs={12}
            sm={activeIcon === "apps" ? 6 : 12}
            md={activeIcon === "apps" ? 4 : 12}
            key={item._id}
          >
            {activeIcon === "apps" ? (
              <ICard {...item} />
            ) : (
              <ProductCard {...item} />
            )}
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
      />
    </Stack>
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
