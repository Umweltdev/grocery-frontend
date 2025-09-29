// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { mockData, mockData2 } from "./data";
import { getProducts } from "../../features/product/productSlice";
import { getOrders } from "../../features/order/orderSlice";

import { OverviewSection } from "./components/OverviewSection";
import { EcommerceDashboardSection } from "./components/EcommerceDashboardSection";
import { SettingsSection } from "./components/SettingsSection";
import { MarketTrend } from "./components/MarketTrends";
import { ThirtyDayTrend } from "./components/ThirtyDayTrend";

const initialAnalytics = {
  currentMCDMultiplier: 1.15,
  customers: { averageDiscount: 12.5 },
  revenue: { total: 128000 },
  equilibriumScore: 78,
  marketing: {
    byPlatform: {
      Google: { amount: 12000 },
      Facebook: { amount: 8500 },
      "X (Twitter)": { amount: 4500 },
      Instagram: { amount: 6000 },
    },
  },
};

const initialMarketingTrends = [
  { name: "SEO", value: 30 },
  { name: "Social Media", value: 25 },
  { name: "Email", value: 20 },
  { name: "Paid Ads", value: 15 },
  { name: "Referrals", value: 10 },
];

const Card1 = ({ name, amount, amount1, percentage, color }) => (
  <Stack
    bgcolor="white"
    borderRadius="10px"
    p={3.1}
    px={2}
    spacing={1}
    sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)" }}
  >
    <Typography variant="subtitle1" color="text.secondary">
      {name}
    </Typography>
    <Typography variant="subtitle1" fontSize="20px" fontWeight="700">
      {amount}
    </Typography>
    <Stack
      direction="row"
      justifyContent="space-between"
      color={color}
      alignItems="center"
    >
      <Typography color="text.secondary" fontSize="13.5px">
        {amount1}
      </Typography>
      <Typography fontSize="11px">{percentage}</Typography>
    </Stack>
  </Stack>
);

Card1.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  amount1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

const Card2 = ({ name, amount, percentage, Icon }) => (
  <Stack
    bgcolor="white"
    borderRadius="10px"
    height="100%"
    px={2}
    spacing={1}
    sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)" }}
  >
    <Typography variant="subtitle1" color="text.secondary" pt={2}>
      {name}
    </Typography>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontSize="20px" fontWeight="700">
          {amount}
        </Typography>
        <Typography fontSize="12px" color="#4E97FD">
          {percentage}
        </Typography>
      </Stack>
      {Icon ? <Icon /> : null}
    </Stack>
  </Stack>
);

Card2.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  Icon: PropTypes.elementType,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});
  const { orders } = useSelector((state) => state.order || { orders: [] });

  const [config, setConfig] = useState({
    mcd: { enabled: true },
    rcd: { enabled: false },
  });

  const [analytics] = useState(initialAnalytics);
  const [marketingTrends] = useState(
    initialMarketingTrends
  );
  const [thirtyDayTrend, setThirtyDayTrend] = useState([]);

  const handleToggle = (key) => {
    setConfig((prev) => ({
      ...prev,
      [key]: { enabled: !prev[key].enabled },
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", config);
  };

  useEffect(() => {
    const trends = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: Math.round(Math.random() * 5000 + 3000),
        customers: Math.floor(Math.random() * 50 + 20),
        marketingSpend: Math.round(Math.random() * 1000 + 500),
      });
    }
    setThirtyDayTrend(trends);
  }, []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrders());
  }, [dispatch]);

  const filteredOrders = (orders || []).filter(
    (order) => order?.isPaid === true
  );

  return (
    <Box bgcolor="background.paper" p={{ xs: 1.5, sm: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack
            flex={1}
            bgcolor="white"
            borderRadius="10px"
            p={4}
            pb={2.4}
            spacing={3}
            sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)" }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                color="#4E97FD"
                fontSize="16px"
                textTransform="capitalize"
              >
                {`Welcome ${user?.fullName || "Admin"}`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Here’s what happening with your store today!
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack spacing={2.5}>
                <Stack>
                  <Typography
                    variant="subtitle1"
                    fontSize="20px"
                    fontWeight="700"
                  >
                    £15,350.25
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Today’s Visit
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    variant="subtitle1"
                    fontSize="20px"
                    fontWeight="700"
                  >
                    {`£ ${filteredOrders
                      .reduce((sum, order) => sum + (order?.totalPrice || 0), 0)
                      .toLocaleString()}`}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total sales
                  </Typography>
                </Stack>
              </Stack>

              <Box sx={{ width: "195px", height: "auto" }}>
                <img
                  src="https://res.cloudinary.com/dkcgd7fio/image/upload/v1759144244/Gemini_Generated_Image_couzo3couzo3couz-removebg-preview_ugmc0u.png"
                  alt="welcome"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container flex={1} spacing={3}>
            {mockData.map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Card1 {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Grid container spacing={3}>
          {mockData2.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card2 {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <OverviewSection analytics={analytics} config={config} />

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <ThirtyDayTrend data={thirtyDayTrend} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MarketTrend data={marketingTrends} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <EcommerceDashboardSection />
      </Box>
      <Box mt={6}>
        <SettingsSection
          title="Configuration Settings"
          onSave={handleSave}
          buttonText="Save Settings"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.mcd.enabled}
                    onChange={() => handleToggle("mcd")}
                  />
                }
                label="Enable MCD"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.rcd.enabled}
                    onChange={() => handleToggle("rcd")}
                  />
                }
                label="Enable RCD"
              />
            </Grid>
          </Grid>
        </SettingsSection>
      </Box>
    </Box>
  );
};

export default Dashboard;
