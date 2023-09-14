import "./App.css";
import { Grid } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import BasicTabs from "./BasicPanelProps.js";
import ColorPicker from "./ColorPicker";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%", height: "100%" }}>
        <Grid
          sx={{ width: "100%", height: "100%" }}
          container
          rowSpacing={1}
          direction="row"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={9}>
            <BasicTabs value={value} onChooseTab={handleChange} />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
