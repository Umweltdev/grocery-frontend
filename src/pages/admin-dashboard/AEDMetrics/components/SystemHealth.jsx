import ShieldIcon from "@mui/icons-material/Shield";
import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const SystemHealth = ({ score }) => {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        textAlign: "center",
        color: "white",
        background: "linear-gradient(135deg, #3b82f6, #9333ea)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: { xs: 160, sm: 200 },
        p: { xs: 1.5, sm: 1.5 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          p: 0,
        }}
      >
        <ShieldIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        <Typography variant="body2" fontWeight="bold">
          System Health
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" } }}
        >
          {clampedScore}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          out of 100
        </Typography>
      </CardContent>
    </Card>
  );
};

SystemHealth.propTypes = {
  score: PropTypes.number.isRequired,
};

export default SystemHealth;
