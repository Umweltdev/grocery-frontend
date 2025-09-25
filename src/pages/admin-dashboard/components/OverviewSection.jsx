import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { StatCard } from "./StatCard";

export const OverviewSection = ({ analytics, config }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Current MCD Multiplier"
          value={`${analytics?.currentMCDMultiplier?.toFixed(3) || "..."}x`}
          icon="📈"
          statusColor={config.mcd?.enabled ? "primary" : null}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Avg Customer Discount"
          value={`${analytics?.customers?.averageDiscount?.toFixed(1) || "..."}%`}
          icon="🏷️"
          statusColor={config.rcd?.enabled ? "success" : null}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Total Revenue (30d)"
          value={`$${analytics?.revenue?.total?.toLocaleString("en-US") || "..."}`}
          icon="💵"
          statusColor="secondary"
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <StatCard
          title="Equilibrium Score"
          value={`${analytics?.equilibriumScore || "..."}%`}
          icon="⚖️"
          statusColor="warning"
        />
      </Grid>
    </Grid>
  );
};

OverviewSection.propTypes = {
  analytics: PropTypes.shape({
    currentMCDMultiplier: PropTypes.number,
    customers: PropTypes.shape({
      averageDiscount: PropTypes.number,
    }),
    revenue: PropTypes.shape({
      total: PropTypes.number,
    }),
    equilibriumScore: PropTypes.number,
  }).isRequired,
  config: PropTypes.shape({
    mcd: PropTypes.shape({
      enabled: PropTypes.bool,
    }),
    rcd: PropTypes.shape({
      enabled: PropTypes.bool,
    }),
  }).isRequired,
};
