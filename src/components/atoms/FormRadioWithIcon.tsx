import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Box,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import theme from "src/theme";
import { IFormField } from "types";
import { useController, UseFormReturn } from "react-hook-form";
import { StyledLabel } from "./common";

const StyledFormControlLabel = styled(FormControlLabel)<{ selected: boolean }>`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 16px 24px;
  height: 100%;
  background: ${(props) => `${props.selected ? "#E1F5FE" : "none"}`};
  border: ${(props) =>
    `1px solid ${props.selected ? theme.palette.secondary.dark : "none"}`};
  border-radius: 4px;
  cursor: pointer;
  width: 264px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1), 0 5px 5px 0 rgba(0, 0, 0, 0.1);
  &:hover: {
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px rgba(13, 34, 89, 0.14), 0px 1px 14px rgba(13, 34, 89, 0.12);
  }
  & .MuiRadio-root {
    display: none;
  }
`;

export interface TRadioOptions {
  value: string;
  label: string;
  Icon: any;
  iconColor?: string;
  subLabel?: string;
}

interface TFormRadioOptions {
  options: Array<TRadioOptions>;
}

type TFormCustomRadio = {
  field: IFormField<TFormRadioOptions>;
  formInstance: UseFormReturn;
};

const getOptionLabel = (option: TRadioOptions, index: number) => {
  return (
    <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ textAlign: "center" }}>
        <option.Icon
          sx={{ width: "50px", height: "50px", color: option.iconColor }}
        />
        <Typography>{option.label}</Typography>
        <Typography sx={{ fontSize: "10px", margin: '8px 0' }}>{option.subLabel}</Typography>
      </Typography>
    </Box>
  );
};
export const FormRadioWithIcon = ({
  field,
  formInstance,
}: TFormCustomRadio) => {
  const {
    control,
    formState: { errors },
  } = formInstance;
  const { options: { options = [] } = {} } = field;

  const { field: controlledField } = useController({
    name: field.name,
    control,
    defaultValue: field?.defaultValue || "",
  });

  const { value, onChange } = controlledField;

  return (
    <FormControl>
      <StyledLabel sx={{ my: 4, display: "block" }}>{field.label}</StyledLabel>
      <RadioGroup
        value={value}
        onChange={onChange}
        sx={{ display: "flex", flexFlow: "row wrap", gap: 3, mx: 2 }}
      >
        {options.map((option, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <StyledFormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio checkedIcon={<></>} icon={<></>} />}
              label={getOptionLabel(option, index)}
              selected={option.value === value}
            ></StyledFormControlLabel>
          </Box>
        ))}
      </RadioGroup>
      {errors[field?.name] && (
        <FormHelperText error>
          {errors[field?.name]?.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};
