import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import PropTypes from "prop-types";
import { Paper, Typography, Box, Divider, useTheme } from "@mui/material";

const AdsPerformance = ({ adsData }) => {
  const theme = useTheme();

  const ads = adsData || [
    { platform: "Facebook", Jan: 400, Feb: 320, Mar: 500 },
    { platform: "Google", Jan: 300, Feb: 450, Mar: 250 },
    { platform: "Instagram", Jan: 200, Feb: 280, Mar: 300 },
    { platform: "TikTok", Jan: 150, Feb: 220, Mar: 260 },
  ];

  const monthKeys = Object.keys(ads[0]).filter((k) => k !== "platform");

  const colors = [
    theme.palette.success.main,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.secondary.main,
  ];

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color="text.primary"
        gutterBottom
      >
        Ads Performance (Comparative)
      </Typography>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={ads}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="platform"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />
          <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
          <Tooltip />
          <Legend />

          {monthKeys.map((month, idx) => (
            <Bar
              key={month}
              dataKey={month}
              fill={colors[idx % colors.length]}
              name={month}
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Rankings per month */}
      <Box mt={4}>
        {monthKeys.map((month, index) => {
          const sorted = [...ads].sort((a, b) => b[month] - a[month]);
          const best = sorted[0];
          const worst = sorted[sorted.length - 1];

          return (
            <Box key={month} mt={index > 0 ? 3 : 0}>
              {index > 0 && <Divider sx={{ mb: 2 }} />}

              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
              >
                {month} Rankings:
              </Typography>

              <Typography variant="body2" mt={0.5}>
                🏆 Best Performing:{" "}
                <Box component="span" fontWeight={600} color="success.main">
                  {best.platform} ({best[month]})
                </Box>
              </Typography>

              <Typography variant="body2" mt={0.5}>
                📉 Least Performing:{" "}
                <Box component="span" fontWeight={600} color="error.main">
                  {worst.platform} ({worst[month]})
                </Box>
              </Typography>

              <Typography variant="body2" mt={1}>
                Full Order:{" "}
                {sorted.map((ad, idx) => (
                  <Box
                    key={ad.platform}
                    component="span"
                    mr={2}
                    color="text.secondary"
                  >
                    {idx + 1}. {ad.platform} ({ad[month]})
                  </Box>
                ))}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

AdsPerformance.propTypes = {
  adsData: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string.isRequired,
    })
  ),
};

export default AdsPerformance;
