import React, { useState } from "react";
import PropTypes from "prop-types";
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
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ChairIcon from "@mui/icons-material/Chair";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SpaIcon from "@mui/icons-material/Spa";
import ToysIcon from "@mui/icons-material/Toys";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

const fallbackCategories = [
  { _id: "fashion", name: "Fashion", children: [] },
  { _id: "groceries", name: "Groceries", children: [] },
  { _id: "home-living", name: "Home & Living", children: [] },
];

const iconProps = {
  sx: { color: "grey.700", fontSize: { xs: "20px", sm: "26px" } },
};

const categoryIcons = {
  fashion: <CheckroomIcon {...iconProps} />,
  groceries: <LocalGroceryStoreIcon {...iconProps} />,
  "home & living": <ChairIcon {...iconProps} />,
  sports: <SportsSoccerIcon {...iconProps} />,
  books: <MenuBookIcon {...iconProps} />,
  "beauty & personal care": <SpaIcon {...iconProps} />,
  "toys & games": <ToysIcon {...iconProps} />,
  automotive: <DirectionsCarIcon {...iconProps} />,
  bakery: <BakeryDiningIcon {...iconProps} />,
  condiments: <EmojiFoodBeverageIcon {...iconProps} />,
  "health & wellness": <HealthAndSafetyIcon {...iconProps} />,
  "breakfast items": <FreeBreakfastIcon {...iconProps} />,
  "herbs & spices": <LocalFloristIcon {...iconProps} />,
  "nuts & seeds": <RestaurantIcon {...iconProps} />,
  "ready-to-eat": <FastfoodIcon {...iconProps} />,
  "sauces & dressings": <LocalDiningIcon {...iconProps} />,
  "beverage mixes": <LocalDrinkIcon {...iconProps} />,
};

const getCategoryIcon = (categoryName) => {
  if (!categoryName) return null;
  const normalizedName = categoryName.toLowerCase();
  return categoryIcons[normalizedName] || null;
};

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
      <Grid container spacing={{ xs: 1, sm: 2 }} mt={1} alignItems="stretch">
        {products.slice(0, 6).map((product) => (
          <Grid
            item
            xs={12} // full width on mobile
            sm={6} // 2 per row on tablets
            md={3} // 4 per row on desktop
            key={product._id}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                border: "1px solid #f0f0f0",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: { xs: 120, sm: 140 },
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: { xs: 1, sm: 1.5 },
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    noWrap
                    fontWeight={500}
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
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
          py={topLevel ? 1.2 : 1}
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
            <Stack direction="row" alignItems="center" spacing={1.2}>
              {topLevel && getCategoryIcon(category.name)}
              <Typography
                fontSize={{ xs: "14px", sm: topLevel ? "18px" : "14px" }}
                fontWeight={topLevel ? 500 : 400}
                color="#2C3E50"
                sx={{ "&:hover": { color: "#E3364E" }, display: "block" }}
              >
                {category.name}
              </Typography>
            </Stack>
          </Link>

          {(hasChildren || hasProducts) && (
            <ChevronRightIcon
              sx={{
                fontSize: { xs: 20, sm: 26 },
                color: "#555",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
        </Stack>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box ml={{ xs: 2, sm: topLevel ? 4.5 : 2 }} mt={1}>
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
      <Typography
        variant="subtitle1"
        fontWeight={700}
        px={{ xs: 1, sm: 2 }}
        py={1}
        color="grey.600"
        fontSize={{ xs: "14px", sm: "16px" }}
      >
        CATEGORIES
      </Typography>
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
        categoriesToShow.map((category, index) => (
          <React.Fragment key={category._id}>
            {renderCategory(category, true)}
            {index < categoriesToShow.length - 1 && (
              <Divider sx={{ my: 0.5 }} />
            )}
          </React.Fragment>
        ))
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
