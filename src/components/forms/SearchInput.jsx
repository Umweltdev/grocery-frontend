import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ handleDrawerClose, drawerOpen }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const performSearch = (query) => {
    if (query && query.trim() !== "") {
      navigate(`/store?search=${encodeURIComponent(query)}`);
      setValue("");

      if (drawerOpen && typeof handleDrawerClose === "function") {
        handleDrawerClose();
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    performSearch(value);
  };

  return (
    <Box py={2} component="form" onSubmit={handleSearchSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Searching for..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: "2.5rem", color: "#7D879C" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            paddingLeft: "12px",
            transition: "border-color 0.2s",
            "& .MuiOutlinedInput-input": {
              padding: "12px 0",
              fontSize: "14px",
            },
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E3364E !important",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#B0BCCF",
          },
        }}
      />
    </Box>
  );
};

SearchInput.propTypes = {
  handleDrawerClose: PropTypes.func,
  drawerOpen: PropTypes.bool,
};

export default SearchInput;
