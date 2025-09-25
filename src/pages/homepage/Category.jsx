import { useState } from "react";
import PropTypes from "prop-types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Collapse,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const fallbackCategories = [
  { _id: "electronics", name: "Electronics", children: [] },
  { _id: "fashion", name: "Fashion", children: [] },
  { _id: "home-kitchen", name: "Home & Kitchen", children: [] },
  { _id: "sports", name: "Sports & Outdoors", children: [] },
  { _id: "beauty", name: "Beauty & Personal Care", children: [] },
];

const Category = ({ visibleCategories, loading, productsByCategory }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId) =>
    expandedCategories.includes(categoryId);

  const renderProducts = (categoryId) => {
    const products = productsByCategory[categoryId] || [];
    if (!products.length) return null;

    return (
      <Grid container spacing={2} mt={1}>
        {products.slice(0, 6).map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product._id}>
            <Card
              sx={{
                boxShadow: "none",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    noWrap
                    fontWeight={500}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={600}
                    display="block"
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderCategory = (category, topLevel = false) => {
    const hasChildren = category.children && category.children.length > 0;
    const hasProducts = !!productsByCategory[category._id]?.length;
    const isExpanded = isCategoryExpanded(category._id);

    return (
      <Box key={category._id}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1}
          py={topLevel ? 1.5 : 1}
          sx={{
            cursor: "pointer",
            borderRadius: "8px",
            "&:hover": { bgcolor: "#f7f7f7" },
            transition: "background-color 0.3s ease",
          }}
          onClick={() => toggleCategory(category._id)}
        >
          <Link
            to={`/store?category=${category._id}`}
            style={{ textDecoration: "none", flexGrow: 1 }}
          >
            <Typography
              variant="body1"
              fontSize={topLevel ? "16px" : "14px"}
              fontWeight={topLevel ? 600 : 500}
              color="#2C3E50"
              sx={{ "&:hover": { color: "#E3364E" }, display: "block" }}
            >
              {category.name}
            </Typography>
          </Link>

          {(hasChildren || hasProducts) && (
            <ChevronRightIcon
              sx={{
                fontSize: 20,
                color: "#555",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
        </Stack>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box ml={2} mt={1}>
            {hasChildren &&
              category.children.map((subcategory) =>
                renderCategory(subcategory, false)
              )}
            {renderProducts(category._id)}
          </Box>
        </Collapse>
      </Box>
    );
  };

  const categoriesToShow =
    visibleCategories && visibleCategories.length
      ? visibleCategories
      : fallbackCategories;

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="150px"
        >
          <CircularProgress size={28} thickness={4} />
        </Box>
      ) : (
        categoriesToShow.map((category) => renderCategory(category, true))
      )}
    </Box>
  );
};

Category.propTypes = {
  visibleCategories: PropTypes.array,
  loading: PropTypes.bool,
  productsByCategory: PropTypes.object,
};

Category.defaultProps = {
  visibleCategories: fallbackCategories,
  loading: false,
  productsByCategory: {},
};

export default Category;
