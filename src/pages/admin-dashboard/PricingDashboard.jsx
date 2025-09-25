import { Stack, Typography, Alert, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import { usePricing } from "./usePricing";
import ProductPricingPreview from "./ProductPricingPreview";

const PricingDashboard = () => {
  const dispatch = useDispatch();
  const {
    saveStatus,
    productsWithFinalPrices,
    config,
  } = usePricing();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box sx={{p:8}}>
      <Stack spacing={3} bgcolor="background.paper" py={3} px={2}>
        <Typography variant="h4" gutterBottom>
          RCD-MCD Pricing Management
        </Typography>

        {saveStatus === "saved" && (
          <Alert severity="success">Configuration saved successfully!</Alert>
        )}
        {saveStatus === "error" && (
          <Alert severity="error">
            Error saving configuration. Please try again.
          </Alert>
        )}

        <ProductPricingPreview
          products={productsWithFinalPrices}
          mcdConfig={config.mcd}
          rcdConfig={config.rcd}
        />
      </Stack>
    </Box>
  );
};

export default PricingDashboard;
