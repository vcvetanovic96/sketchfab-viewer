import React from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker() {
  const [value, setValue] = React.useState("#fff");

  const handleChangeComplete = (color) => {
    setValue(color.hex);
  };

  return <SketchPicker color={value} onChangeComplete={handleChangeComplete} />;
}
