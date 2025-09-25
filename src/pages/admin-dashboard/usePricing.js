import { useState, useEffect, useMemo } from "react";
import pricingService from "../../utils/pricingService";
import { useSelector } from "react-redux";
// import { base_url } from "../../utils/baseUrl";

export const usePricing = () => {
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [config, setConfig] = useState({
    mcd: {
      enabled: true,
      updateFrequency: "daily",
      sensitivityCoefficient: 1.0,
      maxPriceIncrease: 0.15,
      smoothingFactor: 0.3,
      minimumSpendThreshold: 100,
    },
    rcd: {
      enabled: true,
      maxDiscount: 20,
      spendWeight: 2.0,
      thresholds: { minimumSpend: 50, minimumVisits: 2 },
    },
  });
  const [analytics, setAnalytics] = useState(null);
  const productState = useSelector((state) => state.product);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const realProducts = productState.products || [];



  useEffect(() => {
    fetchConfig();
    fetchAnalytics();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await pricingService.getPricingConfig();
      setConfig(response);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await pricingService.getAnalytics();
      setAnalytics(response);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const productsWithFinalPrices = useMemo(() => {
    const multiplier = analytics?.currentMCDMultiplier || 1.0;
    return realProducts.slice(0, 6).map((product) => ({
      id: product._id,
      name: product.name,
      basePrice: product.regularPrice,
      finalPrice: product.pricing?.finalPrice || Math.round(product.regularPrice * multiplier * 100) / 100,
    }));
  }, [analytics, realProducts]);

  const saveConfiguration = async () => {
    setLoading(true);
    setSaveStatus("saving");
    try {
      await pricingService.updatePricingConfig(config);
      setSaveStatus("saved");
      fetchAnalytics();
    } catch (error) {
      console.error("Error saving config:", error);
      setSaveStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const updateConfig = (path, value) => {
    setConfig((prev) => {
      const keys = path.split(".");
      const newConfig = structuredClone(prev);
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  return {
    loading,
    saveStatus,
    config,
    analytics,
    productsWithFinalPrices,
    saveConfiguration,
    updateConfig,
  };
};