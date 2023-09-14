import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ value, onChooseTab }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onChooseTab}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Band" {...a11yProps(0)} />
          <Tab label="Model" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
}
