import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/brandSlice";

const fallbackBrands = [
  { _id: "apple", name: "Apple" },
  { _id: "samsung", name: "Samsung" },
  { _id: "nike", name: "Nike" },
  { _id: "adidas", name: "Adidas" },
  { _id: "sony", name: "Sony" },
  { _id: "lg", name: "LG" },
  { _id: "dell", name: "Dell" },
  { _id: "hp", name: "HP" },
];

const Brand = ({ selectedBrands, setSelectedBrands }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const { brands } = useSelector((state) => state.brand);
  const displayBrands = brands && brands.length ? brands : fallbackBrands;

  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
  };

  return (
    <Stack spacing={2} pb={2}>
      <Typography variant="subtitle1" fontSize="15px" fontWeight={600}>
        Brand
      </Typography>
      <Divider />
      <FormGroup>
        {displayBrands.map((brand) => (
          <FormControlLabel
            key={brand._id}
            control={
              <Checkbox
                value={brand._id}
                checked={selectedBrands.includes(brand._id)}
                onChange={handleBrandChange}
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 22 },
                  color: "#555",
                  "&.Mui-checked": { color: "#E3364E" },
                }}
              />
            }
            label={brand.name}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#2C3E50",
              },
            }}
          />
        ))}
      </FormGroup>
    </Stack>
  );
};

Brand.propTypes = {
  selectedBrands: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedBrands: PropTypes.func.isRequired,
};

export default Brand;
