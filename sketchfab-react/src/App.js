import "./App.css";
import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import BasicTabs from "./BasicPanelProps.js";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SketchfabViewer from "./SketchfabViewer.js";

function App() {
  const apiRef = useRef(null);

  const [value, setValue] = useState(0);

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
            <SketchfabViewer apiRef={apiRef} />
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup
              size="large"
              orientation="vertical"
              aria-label="vertical outlined button group"
            >
              <Button key="blue">Blue</Button>
              <Button key="black">Black</Button>
              <Button key="white">White</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
