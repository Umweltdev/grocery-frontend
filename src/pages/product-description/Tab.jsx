import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Description from "./Description";
import Reviews from "./Reviews";
const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box py={3}>{children}</Box>}
  </div>
);


const TabComponent = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab
            label="Description"
            sx={{
              textTransform: "none",
            }}
          />
          <Tab
            label="Reviews"
            sx={{
              textTransform: "none",
            }}
          />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Description description={product?.description} />
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Reviews id={product?._id} />
      </TabPanel>
    </Box>
  );
};

export default TabComponent;
