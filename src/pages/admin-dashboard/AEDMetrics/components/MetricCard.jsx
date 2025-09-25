import { memo } from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

const MetricCard = memo(({ title, value, status, trendData }) => {
  const theme = useTheme();
  const isPositive = status.color.includes("success");

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 1,
        transition: "box-shadow 0.3s",
        "&:hover": { boxShadow: 4 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: { xs: 180, sm: 200 }, // Ensure same min height across screen sizes
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexGrow: 1, // Let content expand evenly
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {value}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          <status.icon
            size={16}
            color={theme.palette[isPositive ? "success" : "error"].main}
          />
          <Typography variant="body2" fontWeight={600} color={status.color}>
            {status.text}
          </Typography>
        </Box>
      </CardContent>

      {trendData && (
        <Box
          sx={{
            width: "100%",
            height: 50,
            opacity: 0.2,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData.map((v) => ({ v }))}>
              <Area
                type="monotone"
                dataKey="v"
                stroke={
                  isPositive
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
                fill={
                  isPositive
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Card>
  );
});

MetricCard.displayName = "MetricCard";

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  status: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  }).isRequired,
  trendData: PropTypes.arrayOf(PropTypes.number),
};

export default MetricCard;
