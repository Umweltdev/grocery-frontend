import { useEffect } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getProducts } from './../../features/product/productSlice';


const Range = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  const dispatch = useDispatch();

  const handleMinChange = (e) => {
    const value = Math.max(0, Number(e.target.value || 0));
    setMinPrice(value);
    if (maxPrice !== null && value > maxPrice) {
      setMaxPrice(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = Math.max(minPrice || 0, Number(e.target.value || 0));
    setMaxPrice(value);
  };

  useEffect(() => {
    if (minPrice !== null || maxPrice !== null) {
      dispatch(getProducts({ minPrice, maxPrice }));
    }
  }, [minPrice, maxPrice, dispatch]);

  return (
    <Stack spacing={2} pb={1}>
      <Typography variant="subtitle1" fontSize="15px">
        Price Range
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          type="number"
          value={minPrice || ""}
          onChange={handleMinChange}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Typography>-</Typography>
        <TextField
          size="small"
          type="number"
          value={maxPrice || ""}
          onChange={handleMaxChange}
          InputProps={{ inputProps: { min: minPrice || 0 } }}
        />
      </Stack>
    </Stack>
  );
};

Range.propTypes = {
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  setMinPrice: PropTypes.func.isRequired,
  setMaxPrice: PropTypes.func.isRequired,
};

Range.defaultProps = {
  minPrice: 0,
  maxPrice: 0,
};

export default Range;
