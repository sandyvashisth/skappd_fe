import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import styled from "@emotion/styled";
import theme from "src/theme";
import { IFormField } from "types";
import { useController, UseFormReturn } from "react-hook-form";
import { StyledLabel } from "./common";

const StyledFormControlLabel = styled(FormControlLabel)<{
  selected: boolean;
  variant: string;
  bcolor: string;
}>`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: ${(props) =>
    props.variant == "circle" ? "center" : "flex-start"};
  align-items: circle;
  margin-bottom: 16px;
  &:not(:last-child) {
    margin-right: 16px;
  }
  border: ${(props) =>
    `1px solid ${
      props.selected ? theme.palette.secondary.dark : props.bcolor
    }`};
  border-radius: 4px;
  cursor: pointer;
  width: 264px;
  height: ${(props) => (props.variant == "circle" ? "106px" : "auto")};
  &:hover: {
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 5px 8px rgba(13, 34, 89, 0.14), 0px 1px 14px rgba(13, 34, 89, 0.12);
  }
`;

export type RadioBoxVariantTypes = "box" | "circle";

export const RADIO_BOX_VARIANT_MAP = {
  box: {
    IconChecked: CheckBoxIcon,
    IconUnchecked: CheckBoxOutlineBlankIcon,
  },
  circle: {
    IconChecked: RadioButtonCheckedIcon,
    IconUnchecked: RadioButtonUncheckedIcon,
  },
};

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
  variant?: RadioBoxVariantTypes;
};

export const FormCustomRadioGroup = ({
  field,
  formInstance,
  variant = "circle",
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
  const DefaultIcon = RADIO_BOX_VARIANT_MAP[variant].IconUnchecked;
  const CheckedIcon = RADIO_BOX_VARIANT_MAP[variant].IconChecked;
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
            variant={variant}
            bcolor={variant == "circle" ? "#212121" : "rgba(0, 0, 0, 0.26)"}
            control={
              <Radio
                checkedIcon={<CheckedIcon />}
                icon={
                  <DefaultIcon
                    sx={{
                      color:
                        variant == "circle" ? "#212121" : "rgba(0, 0, 0, 0.26)",
                    }}
                  />
                }
              />
            }
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
