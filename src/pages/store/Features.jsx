import {
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import PropTypes from "prop-types";

const Features = ({
  sales,
  setSales,
  stock,
  setStock,
  featured,
  setFeatured,
}) => {
  const handleChange = (setter) => (event) => {
    setter(event.target.checked);
  };

  return (
    <Stack spacing={1} pb={1}>
      <Typography variant="subtitle1" fontSize="15px" fontWeight={600}>
        Features
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={sales}
              onChange={handleChange(setSales)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
              color="primary"
            />
          }
          label="Sales"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stock}
              onChange={handleChange(setStock)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
              color="primary"
            />
          }
          label="In Stock"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={featured}
              onChange={handleChange(setFeatured)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
              color="primary"
            />
          }
          label="Featured"
        />
      </FormGroup>
    </Stack>
  );
};

Features.propTypes = {
  sales: PropTypes.bool.isRequired,
  setSales: PropTypes.func.isRequired,
  stock: PropTypes.bool.isRequired,
  setStock: PropTypes.func.isRequired,
  featured: PropTypes.bool.isRequired,
  setFeatured: PropTypes.func.isRequired,
};

export default Features;
