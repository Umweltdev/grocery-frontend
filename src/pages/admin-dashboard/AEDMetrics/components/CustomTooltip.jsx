import PropTypes from "prop-types";
import { Paper, Typography, Box } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          p: 2,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          {label}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {payload.map((p, i) => (
            <Typography
              key={i}
              variant="body2"
              color="text.secondary"
              fontWeight={500}
            >
              {p.value}
            </Typography>
          ))}
        </Box>
      </Paper>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

export default CustomTooltip;
