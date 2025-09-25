import { Box, Button, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const SettingsSection = ({
  children,
  title,
  onSave,
  loading,
  buttonText,
}) => (
  <Paper
    elevation={2}
    sx={{ p: 3, maxWidth: "800px", mx: "auto", borderRadius: 2 }}
  >
    <Typography variant="h5" fontWeight="bold" mb={3}>
      {title}
    </Typography>

    {children}

    <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        onClick={onSave}
        disabled={loading}
        aria-label={`${loading ? "Saving" : "Save"} ${title}`}
      >
        {loading ? "Saving..." : buttonText}
      </Button>
    </Box>
  </Paper>
);

SettingsSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
};

SettingsSection.defaultProps = {
  children: null,
  loading: false,
};
