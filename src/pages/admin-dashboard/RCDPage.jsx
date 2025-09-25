import { Stack, Typography } from "@mui/material";
import { usePricing } from "./usePricing";
import RCDSettings from "./RCDSettings";

const RCDPage = () => {
  const { loading, config, saveConfiguration, updateConfig } = usePricing();

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3} px={2}>
      <Typography variant="h4" gutterBottom>
        RCD Settings
      </Typography>
      <RCDSettings
        config={config?.rcd}
        updateConfig={updateConfig}
        saveConfiguration={saveConfiguration}
        loading={loading}
      />
    </Stack>
  );
};

export default RCDPage;