import React from "react";
import { TextField as MuiText } from "@mui/material";
const TextField = ({
  variant = "outlined",
  label = "",
  type = "text",
  name = "",
  onChange = () => {},
  value = "",
}) => {
  return (
    <MuiText
      variant="outlined"
      label={label}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      sx={{
        width: "100%",
        margin: "10px 0px",
        color:'white',
      }}
    />
  );
};

export default TextField;
