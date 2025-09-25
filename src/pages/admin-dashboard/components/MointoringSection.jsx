import { Grid, Paper, Typography, Switch, Box } from "@mui/material";
import PropTypes from "prop-types";

export const MonitoringSection = ({ config, updateConfig }) => (
  <Paper
    elevation={2}
    sx={{ p: 3, maxWidth: "800px", mx: "auto", borderRadius: 2 }}
  >
    <Typography variant="h5" fontWeight="bold" mb={3}>
      Live System Status
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">MCD System</Typography>
            <Switch
              checked={!!config?.mcd?.enabled}
              onChange={() =>
                updateConfig("mcd.enabled", !(config?.mcd?.enabled ?? false))
              }
              inputProps={{ "aria-label": "Toggle MCD system" }}
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">RCD System</Typography>
            <Switch
              checked={!!config?.rcd?.enabled}
              onChange={() =>
                updateConfig("rcd.enabled", !(config?.rcd?.enabled ?? false))
              }
              inputProps={{ "aria-label": "Toggle RCD system" }}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Paper>
);

MonitoringSection.propTypes = {
  config: PropTypes.shape({
    mcd: PropTypes.shape({
      enabled: PropTypes.bool,
    }).isRequired,
    rcd: PropTypes.shape({
      enabled: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  updateConfig: PropTypes.func.isRequired,
};
