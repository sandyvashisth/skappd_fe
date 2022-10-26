import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
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
  margin-bottom: 16px;
  &:not(:last-child) {
    margin-right: 16px;
  }
  border: ${(props) =>
    `1px solid ${props.selected ? theme.palette.secondary.dark : "#212121"}`};
  border-radius: 4px;
  cursor: pointer;
  width: 264px;
  height: 106px;
  &:hover: {
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px rgba(13, 34, 89, 0.14), 0px 1px 14px rgba(13, 34, 89, 0.12);
  }
`;

export interface TRadioOptions {
  value: string;
  label: string;
}

interface TFormRadioOptions {
  options: Array<TRadioOptions>;
}

type TFormCustomRadio = {
  field: IFormField<TFormRadioOptions>;
  formInstance: UseFormReturn;
};

export const FormCustomRadioGroup = ({
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
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            selected={option.value === value}
          ></StyledFormControlLabel>
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
