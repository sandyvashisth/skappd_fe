import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";

type TProps = {
    defaultValue: string;
}

export const FormToggleField = ({ defaultValue = ''}: TProps) => {
    const [value, setValue] = useState(defaultValue);
  
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      selectedValue: string,
    ) => {
        setValue(selectedValue);
    };
  
    return (
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="web"><CheckCircleIcon />Web</ToggleButton>
        <ToggleButton value="android"><CheckCircleIcon />Android</ToggleButton>
        <ToggleButton value="ios"><CheckCircleIcon />iOS</ToggleButton>
      </ToggleButtonGroup>
    );
  }