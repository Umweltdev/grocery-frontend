import { Stack, Typography } from "@mui/material";
import { usePricing } from "./usePricing";
import MCDSettings from "./MCDSettings";

const MCDPage = () => {
  const { loading, config, saveConfiguration, updateConfig } = usePricing();

  if (!config) {
    return <div>Loading configuration...</div>;
  }

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3} px={2}>
      <Typography variant="h4" gutterBottom>
        MCD Settings
      </Typography>
      <MCDSettings
        config={config.mcd || {}}
        updateConfig={updateConfig}
        saveConfiguration={saveConfiguration}
        loading={loading}
      />
    </Stack>
  );
};

export default MCDPage;