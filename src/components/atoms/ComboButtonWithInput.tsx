import {
  ButtonBase,
  ButtonGroup,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const TextField = styled(InputBase)(({ theme }) => ({
  borderLeft: "1px solid #1EC271",
  padding: "4px 8px 4px 16px",
  fontSize: "12px",
  color: "#1EC271",
  "& input": {
    padding: "0 !important",
    maxWidth: "18px",
    margin: 0,
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& .MuiInputAdornment-root": {
    marginLeft: "0 !important",
  },
  "& .MuiInputAdornment-root p": {
    fontSize: "12px !important",
    paddingLeft: "5px",
    color: "#1EC271",
  },
}));

export const ComboButtonWithInput = ({
  title,
  skillId,
  updateSkill,
}: {
  title: string;
  skillId: string;
  updateSkill: Function;
}) => {
  const [value, setValue] = useState<string | number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setValue(0);
    setSelected(!selected);
    updateSkill(skillId, !selected ? "addSkill" : "removeSkill", 0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    updateSkill(skillId, "updateSkill", value);
    if (value === "") return setValue(value);
    if (parseFloat(value) <= 10 && /^(\d)*(\.)?([0-9]{1})?$/.test(value))
      setValue(value);
  };

  return (
    <ButtonGroup
      sx={{
        border: `1px solid ${selected ? "#1EC271" : "#CEE0DB"}`,
        color: ` ${selected ? "#1EC271" : "012333"}`,
        mr: 2,
        mb: 2,
        bgcolor: "white",
      }}
    >
      <ButtonBase sx={{ border: "none", p: "4px 16px" }} onClick={handleClick}>
        {title}
      </ButtonBase>
      {selected && (
        <TextField
          id="outlined-adornment-weight"
          value={value}
          onChange={handleChange}
          endAdornment={<InputAdornment position="end">yrs</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          type="number"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      )}
    </ButtonGroup>
  );
};
