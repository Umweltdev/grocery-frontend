import {
  Card,
  CardContent,
  Typography,
  Switch,
  Slider,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import makeToast, { makeErrorAlert } from "../../utils/toaster";

const RCDSettings = ({ config, updateConfig, saveConfiguration, loading }) => {
  const handleSave = async () => {
    try {
      await saveConfiguration();
      makeToast("success", "RCD settings saved and discounts updated!");
    } catch (err) {
      console.error(err);
      makeErrorAlert("Failed to save RCD settings.");
    }
  };

  return (
    <Box sx={{ px: 8 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Returning Customer Discount (RCD)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Reward customer loyalty with personalized discounts based on
            purchase history.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ minWidth: 120 }}>Enable RCD</Typography>
              <Switch
                checked={config.enabled}
                onChange={(e) => updateConfig("rcd.enabled", e.target.checked)}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Maximum Discount: {config.maxDiscount}%
              </Typography>
              <Slider
                value={config.maxDiscount}
                onChange={(_, value) => updateConfig("rcd.maxDiscount", value)}
                min={0}
                max={50}
                step={1}
              />
            </Box>

            {/* Spend Weight */}
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Spend Weight: {config.spendWeight.toFixed(1)}x
              </Typography>
              <Slider
                value={config.spendWeight}
                onChange={(_, value) => updateConfig("rcd.spendWeight", value)}
                min={0.5}
                max={5}
                step={0.1}
              />
            </Box>

            {/* Threshold Inputs */}
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
              Minimum Requirements
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Minimum Spend ($)"
                  type="number"
                  value={config.thresholds.minimumSpend}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateConfig(
                      "rcd.thresholds.minimumSpend",
                      isNaN(val) ? 0 : val
                    );
                  }}
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0, step: 10 },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Minimum Visits"
                  type="number"
                  value={config.thresholds.minimumVisits}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateConfig(
                      "rcd.thresholds.minimumVisits",
                      isNaN(val) ? 0 : val
                    );
                  }}
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0, step: 1 },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Save Button */}
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Saving..." : "Save RCD Settings"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

RCDSettings.propTypes = {
  config: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    maxDiscount: PropTypes.number.isRequired,
    spendWeight: PropTypes.number.isRequired,
    thresholds: PropTypes.shape({
      minimumSpend: PropTypes.number.isRequired,
      minimumVisits: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  updateConfig: PropTypes.func.isRequired,
  saveConfiguration: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

RCDSettings.defaultProps = {
  loading: false,
};

export default RCDSettings;
