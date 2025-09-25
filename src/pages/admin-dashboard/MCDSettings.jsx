import {
  Card,
  CardContent,
  Typography,
  Switch,
  Slider,
  TextField,
  Button,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import makeToast, { makeErrorAlert } from "../../utils/toaster";

const MCDSettings = ({ config, updateConfig, saveConfiguration, loading }) => {
  const handleSave = async () => {
    try {
      await saveConfiguration();
      makeToast("success", "MCD settings saved and prices updated!");
    } catch (err) {
      console.error(err);
      makeErrorAlert("Failed to save MCD settings.");
    }
  };

  return (
    <Box sx= {{px: 8}}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Marketing Cost Displacement (MCD)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Dynamically adjust prices based on marketing spend to protect profit
            margins.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ minWidth: 120 }}>Enable MCD</Typography>
              <Switch
                checked={config.enabled}
                onChange={() => updateConfig("mcd.enabled", !config.enabled)}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Sensitivity Coefficient:{" "}
                {config.sensitivityCoefficient.toFixed(1)}
              </Typography>
              <Slider
                value={config.sensitivityCoefficient}
                onChange={(_, value) =>
                  updateConfig("mcd.sensitivityCoefficient", value)
                }
                min={0.1}
                max={3}
                step={0.1}
                disabled={!config.enabled}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Max Price Increase: {(config.maxPriceIncrease * 100).toFixed(0)}
                %
              </Typography>
              <Slider
                value={config.maxPriceIncrease}
                onChange={(_, value) =>
                  updateConfig("mcd.maxPriceIncrease", value)
                }
                min={0}
                max={0.5}
                step={0.01}
                disabled={!config.enabled}
              />
            </Box>
            <TextField
              label="Minimum Spend Threshold ($)"
              type="number"
              value={config.minimumSpendThreshold ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                updateConfig(
                  "mcd.minimumSpendThreshold",
                  value === "" ? "" : parseFloat(value)
                );
              }}
              disabled={!config.enabled}
              sx={{ mb: 2, width: "200px" }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Saving..." : "Save MCD Settings"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

MCDSettings.propTypes = {
  config: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    sensitivityCoefficient: PropTypes.number.isRequired,
    maxPriceIncrease: PropTypes.number.isRequired,
    minimumSpendThreshold: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  updateConfig: PropTypes.func.isRequired,
  saveConfiguration: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

MCDSettings.defaultProps = {
  loading: false,
};

export default MCDSettings;
