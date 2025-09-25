import {
  Stack,
  Typography,
  FormGroup,
  Radio,
  FormControlLabel,
  Rating,
} from "@mui/material";
import PropTypes from "prop-types";

const RatingProduct = ({ rating, setRating }) => {
  const ratings = [5, 4, 3, 2, 1];

  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value, 10);
    setRating(selectedRating);
  };

  return (
    <Stack spacing={2} pb={2}>
      <Typography variant="subtitle1" fontSize="15px">
        Rating
      </Typography>
      <FormGroup>
        {ratings.map((r) => (
          <FormControlLabel
            key={r}
            control={
              <Radio
                value={r}
                checked={rating === r}
                onChange={handleRatingChange}
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
              />
            }
            label={
              <Rating
                value={r}
                readOnly
                precision={1}
                sx={{
                  fontSize: 20,
                  color: "#FFD700",
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Stack>
  );
};

RatingProduct.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func.isRequired,
};

RatingProduct.defaultProps = {
  rating: null,
};

export default RatingProduct;
