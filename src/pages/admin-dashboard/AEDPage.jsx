import { Stack, Typography } from "@mui/material";
import { usePricing } from "./usePricing";
import AEDMetric from "./AEDMetrics";

const AEDPage = () => {
  const { loading, config } = usePricing();

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3} px={2}>
      <Typography variant="h4" gutterBottom>
        AED Metrics
      </Typography>
      {loading ? (
        <Typography>Loading metrics...</Typography>
      ) : (
        <AEDMetric analytics={config?.aed} />
      )}
    </Stack>
  );
};

export default AEDPage;
