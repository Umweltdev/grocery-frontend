import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import PropTypes from "prop-types";
import { Paper, Typography, useTheme } from "@mui/material";
import CustomTooltip from "./CustomTooltip";

const AlgorithmPerformance = ({ data }) => {
  const theme = useTheme();

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
        Algorithm Performance Over Time
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data ?? []}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorMultiplier" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorDiscount" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.success.main}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.palette.success.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }} />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="multiplier"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            fill="url(#colorMultiplier)"
            name="MCD Multiplier"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="discount"
            stroke={theme.palette.success.main}
            strokeWidth={2}
            fill="url(#colorDiscount)"
            name="Avg. Discount (%)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

AlgorithmPerformance.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      multiplier: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
    })
  ),
};

export default AlgorithmPerformance;
