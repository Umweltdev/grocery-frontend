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
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";

const fallbackCategories = [
  { _id: "gadgets", name: "Gadgets", children: [] },
  { _id: "clothing", name: "Clothing", children: [] },
  { _id: "electronics", name: "Electronics", children: [] },
];

const getCategoryIcon = (categoryName) => {
  const normalizedName = categoryName.toLowerCase();
  const iconProps = { sx: { color: "grey.700", fontSize: "26px" } };

  if (normalizedName.includes("gadget"))
    return <ImportantDevicesIcon {...iconProps} />;
  if (normalizedName.includes("clothing"))
    return <CheckroomIcon {...iconProps} />;
  if (normalizedName.includes("electronics"))
    return <DesktopMacIcon {...iconProps} />;

  return null;
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
      <Grid container spacing={2} mt={1} alignItems="stretch">
        {products.slice(0, 6).map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product._id}>
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
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 1.5,
                  }}
                >
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
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {topLevel && getCategoryIcon(category.name)}
              <Typography
                variant="body1"
                fontSize={topLevel ? "18px" : "14px"}
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
                fontSize: 26,
                color: "#555",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
        </Stack>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box ml={topLevel ? 4.5 : 2} mt={1}>
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
      <Typography variant="subtitle1" fontWeight={700} p={1} color="grey.600">
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
