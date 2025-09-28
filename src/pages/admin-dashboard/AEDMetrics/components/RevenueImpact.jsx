import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const RevenueImpact = ({ data }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 2,
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        fontWeight="600"
        color="primary.main"
        gutterBottom
      >
        Revenue Impact Analysis
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 12 }}
            width={100}
          />
          <Tooltip
            formatter={(value) =>
              `$${value.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`
            }
          />
          <Bar dataKey="value" name="Amount ($)">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry?.value > 0
                    ? entry?.name === "Base Revenue"
                      ? "#a8a29e"
                      : "#22c55e"
                    : "#ef4444"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

RevenueImpact.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RevenueImpact;
