import { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import PropTypes from "prop-types";

const SearchInput = ({ handleDrawerClose, drawerOpen }) => {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch products once
  useEffect(() => {
    axios
      .get(`${base_url}product`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Shared search handler
  const performSearch = (query) => {
    if (query && query.trim() !== "") {
      navigate(`/store?search=${encodeURIComponent(query)}`);
      setValue("");
      if (drawerOpen && typeof handleDrawerClose === "function") {
        handleDrawerClose();
      }
    }
  };

  const handleOptionSelect = (event, option) => {
    if (option) performSearch(option);
  };

  const handleSearchClick = () => {
    performSearch(value);
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue.length >= 2) {
      return options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return [];
  };

  return (
    <Box py={2}>
      <Autocomplete
        freeSolo
        options={products?.map((option) => option.name)}
        filterOptions={filterOptions}
        value={value}
        onInputChange={(event, newValue) => setValue(newValue)}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Searching for"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "1.25rem", color: "#7D879C" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleSearchClick}
                    sx={{
                      textTransform: "none",
                      bgcolor: "#E3364E",
                      color: "white",
                      px: "40px",
                      fontSize: "14px",
                      letterSpacing: "1px",
                      py: "8px",
                      borderLeft: "1px solid #7D879C",
                      borderTopRightRadius: "1200px",
                      borderBottomRightRadius: "1200px",
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "#D23F57",
                      },
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "1200px",
                padding: "0px 0px 0px 20px !important",
                "& .MuiAutocomplete-input": {
                  padding: "1px !important",
                  fontSize: "14px",
                },
                "& .MuiInputAdornment-positionEnd": {
                  height: "100%",
                  maxHeight: "100%",
                },
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E3364E",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

SearchInput.propTypes = {
  handleDrawerClose: PropTypes.func,
  drawerOpen: PropTypes.bool,
};
export default SearchInput;
