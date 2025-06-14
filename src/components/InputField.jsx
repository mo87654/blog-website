import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ label, name, value, onChange, type = "text", required = false }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      fullWidth
      margin="normal"
    />
  );
};

export default InputField;
