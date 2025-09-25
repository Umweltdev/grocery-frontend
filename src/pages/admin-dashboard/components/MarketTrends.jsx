import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export const MarketTrend = ({ data }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: "10px", height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Marketing Spend by Platform
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

MarketTrend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};
