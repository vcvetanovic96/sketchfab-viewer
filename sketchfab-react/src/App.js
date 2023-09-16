import "./App.css";
import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import BasicTabs from "./BasicPanelProps.js";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SketchfabViewer from "./SketchfabViewer.js";

const COLOR_OPTIONS = {
  option_bracelet_rubberblue: "#00b4fe",
  option_bracelet_rubberwhite: "#ffffff",
  option_bracelet_cuir: "#273136",
  option_coque_goldgloss: "#ffcd3c",
  option_coque_silverrough: "#888888",
  option_coque_silverglossy: "#CCCCCC",
};

function App() {
  const apiRef = useRef(null);
  const [value, setValue] = useState(0);
  const [bandButtons, setBandButtons] = useState(null);
  const [modelButtons, setModelButtons] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOptionClick = (optionName, options) => {
    Object.values(options).forEach((node) => {
      if (node.name === optionName) {
        apiRef.current.show(node.instanceID);
        return;
      }
      apiRef.current.hide(node.instanceID);
    });
  };

  const initOptions = (bandOptions, coqueOptions) => {
    setBandButtons(() =>
      Object.values(bandOptions).map((option) => {
        return (
          <Button
            key={option.name}
            sx={{
              backgroundColor: setBackGroundColor(option.name),
            }}
            onClick={() => handleOptionClick(option.name, bandOptions)}
            size="large"
          >
            {option.name}
          </Button>
        );
      })
    );

    setModelButtons(() =>
      Object.values(coqueOptions).map((option) => {
        return (
          <Button
            key={option.name}
            sx={{
              backgroundColor: setBackGroundColor(option.name),
            }}
            size="large"
            onClick={() => handleOptionClick(option.name, coqueOptions)}
          >
            {option.name}
          </Button>
        );
      })
    );
  };

  const setBackGroundColor = (optionName) => {
    return COLOR_OPTIONS[optionName];
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%", height: "100%" }}>
        <Grid
          sx={{ width: "100%", height: "100%" }}
          container
          direction="column"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={9}>
            <BasicTabs value={value} onChooseTab={handleChange} />
            <SketchfabViewer apiRef={apiRef} initOptions={initOptions} />
          </Grid>

          <Grid item xs={3}>
            <ButtonGroup
              size="large"
              orientation="vertical"
              aria-label="vertical outlined button group"
            >
              {value === 0 ? bandButtons : modelButtons}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
