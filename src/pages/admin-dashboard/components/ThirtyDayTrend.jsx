import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const ThirtyDayTrend = ({ data }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: "10px", height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        30-Day Trends
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="marketingSpend"
            stroke="#10B981"
            name="Marketing Spend"
          />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="#F59E0B"
            name="Customers"
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

ThirtyDayTrend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      revenue: PropTypes.number.isRequired,
      customers: PropTypes.number.isRequired,
      marketingSpend: PropTypes.number.isRequired,
    })
  ).isRequired,
};
