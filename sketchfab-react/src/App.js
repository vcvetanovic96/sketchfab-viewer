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
  const [bandButtons, setBandButtons] = useState(null);
  const [modelButtons, setModelButtons] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
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

  const handleModelOptionClick = (optionName, options) => {
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
            onClick={() => handleOptionClick(option.name, bandOptions)}
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
            onClick={() => handleModelOptionClick(option.name, coqueOptions)}
          >
            {option.name}
          </Button>
        );
      })
    );
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
