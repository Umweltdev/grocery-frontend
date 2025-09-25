import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";

const Description = ({ description }) => {
  if (!description) return null;

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        Specification:
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.6 }}
      >
        {description}
      </Typography>
    </Box>
  );
};

Description.propTypes = {
  description: PropTypes.string,
};

Description.defaultProps = {
  description: "",
};

export default Description;
