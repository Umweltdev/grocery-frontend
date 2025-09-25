import PropTypes from "prop-types";
import { Grid, Box,  Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import SystemHealth from "./AEDMetrics/components/SystemHealth";
import MetricCard from "./AEDMetrics/components/MetricCard";
import AlgorithmPerformance from "./AEDMetrics/components/AlgorithmPerformance";
import RevenueImpact from "./AEDMetrics/components/RevenueImpact";
import AdsPerformance from "./AEDMetrics/components/AdsPerformance";

const AEDMetric = () => {
  const algorithmPerformanceData = [
    { date: "2024-09-01", multiplier: 1.2, discount: 15 },
    { date: "2024-09-05", multiplier: 1.5, discount: 12 },
    { date: "2024-09-10", multiplier: 1.8, discount: 18 },
    { date: "2024-09-15", multiplier: 2.0, discount: 20 },
    { date: "2024-09-20", multiplier: 1.7, discount: 14 },
  ];

  const systemHealthScore = 87;

  const revenueImpactData = [
    { name: "Baseline", value: 12000 },
    { name: "AI Optimized", value: 15800 },
  ];

  const adsPerformanceData = [
    { platform: "Facebook", Jan: 400, Feb: 320, Mar: 500 },
    { platform: "Google", Jan: 300, Feb: 450, Mar: 250 },
    { platform: "Instagram", Jan: 200, Feb: 280, Mar: 300 },
    { platform: "TikTok", Jan: 150, Feb: 220, Mar: 260 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Top Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={2.4}>
          <SystemHealth score={systemHealthScore} />
        </Grid>

        <Grid item xs={12} md={8} lg={9.6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Active Users"
                value="12,450"
                status={{
                  text: "+5%",
                  color: "success.main",
                  icon: TrendingUpIcon,
                }}
                trendData={[10, 12, 14, 13, 15, 18]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Revenue"
                value="$15,800"
                status={{
                  text: "+12%",
                  color: "success.main",
                  icon: TrendingUpIcon,
                }}
                trendData={[2000, 4000, 5000, 7000, 9000]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Engagement"
                value="68%"
                status={{
                  text: "-3%",
                  color: "error.main",
                  icon: TrendingDownIcon,
                }}
                trendData={[70, 69, 68, 67, 68]}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Conversions"
                value="1,230"
                status={{
                  text: "+8%",
                  color: "success.main",
                  icon: TrendingUpIcon,
                }}
                trendData={[200, 400, 600, 800, 1230]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Middle Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          {algorithmPerformanceData && algorithmPerformanceData.length > 0 ? (
            <AlgorithmPerformance data={algorithmPerformanceData} />
          ) : (
            <Paper
              variant="outlined"
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              Algorithm Performance data not available yet
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} lg={6}>
          <RevenueImpact data={revenueImpactData} />
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <AdsPerformance adsData={adsPerformanceData} />
    </Box>
  );
};

AEDMetric.propTypes = {
  analytics: PropTypes.object,
};

export default AEDMetric;

