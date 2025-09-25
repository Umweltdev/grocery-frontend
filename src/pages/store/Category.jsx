import { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import PropTypes from "prop-types";

const fallbackCategories = [
  { _id: "electronics", name: "Electronics", children: [] },
  { _id: "fashion", name: "Fashion", children: [] },
  { _id: "home-kitchen", name: "Home & Kitchen", children: [] },
  { _id: "sports", name: "Sports & Outdoors", children: [] },
  { _id: "beauty", name: "Beauty & Personal Care", children: [] },
];

const CategoryDropdown = ({ pCategory, closeDrawer }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${base_url}category?level=1&visible=true`
      );
      setCategories(response.data || fallbackCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId) =>
    expandedCategories.includes(categoryId);

  const renderCategory = (category, topLevel = false) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = isCategoryExpanded(category._id);

    return (
      <Box key={category._id} mb={0.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1}
          py={topLevel ? 1.2 : 0.8}
          sx={{
            cursor: "pointer",
            borderRadius: 1,
            "&:hover": { bgcolor: "#f5f5f5" },
            transition: "background-color 0.25s ease",
          }}
          onClick={() => toggleCategory(category._id)}
        >
          <Link
            to={`/store?category=${category._id}`}
            style={{ textDecoration: "none", flexGrow: 1 }}
            onClick={closeDrawer}
          >
            <Typography
              fontSize={topLevel ? "16px" : "14px"}
              fontWeight={topLevel ? 600 : 500}
              color={category._id === pCategory ? "#D23F57" : "#4B566B"}
              sx={{ "&:hover": { color: "#D23F57" } }}
            >
              {category.name}
            </Typography>
          </Link>

          {hasChildren && (
            <ChevronRightIcon
              sx={{
                fontSize: 20,
                transition: "transform 0.25s ease",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
        </Stack>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box ml={2} mt={0.5}>
              {category.children.map((sub) => renderCategory(sub))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="subtitle1" fontSize="15px" fontWeight={600}>
          Categories
        </Typography>
        <IconButton
          size="small"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          sx={{
            transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Stack>

      <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="120px"
          >
            <CircularProgress size={28} thickness={4} />
          </Box>
        ) : (
          categories.map((category) => renderCategory(category, true))
        )}
      </Collapse>
    </Box>
  );
};

CategoryDropdown.propTypes = {
  pCategory: PropTypes.string,
  closeDrawer: PropTypes.func,
};

CategoryDropdown.defaultProps = {
  pCategory: "",
  closeDrawer: () => {},
};

export default CategoryDropdown;
