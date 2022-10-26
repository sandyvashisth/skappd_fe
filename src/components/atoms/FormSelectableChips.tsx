import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useController, UseFormReturn } from "react-hook-form";
import { IFormField } from "types";
import { StyledLabel } from "./common";
import SelectableButton from "./SelectableButton";

export interface TCheckboxOptions {
  label: string;
  value: any;
}

interface TFormCheckboxOptions {
  options: Array<TCheckboxOptions>;
}

type TFormCheckboxList = {
  field: IFormField<TFormCheckboxOptions>;
  formInstance: UseFormReturn;
};

export const FormSelectableChips = ({
  field,
  formInstance,
}: TFormCheckboxList) => {
  const {
    control,
    formState: { errors },
  } = formInstance;
  const { options: { options = [] } = {} } = field;

  const { field: controlledField } = useController({
    name: field.name,
    control,
    defaultValue: field?.defaultValue || [],
  });

  const { value, onChange } = controlledField;

  return (
    <FormControl>
      <StyledLabel
        sx={{ my: 3, display: "block" }}
        error={!!errors[field?.name]}
      >
        {field.label}
      </StyledLabel>
      <Grid container sx={{ gap: "1rem", mb: "16px" }}>
        {options?.map((option: TCheckboxOptions) => (
          <Grid key={option.value}>
            <SelectableButton
              isButtonSelected={value?.some(
                (val: string) => val === option.value
              )}
              updateBenefits={(checked: boolean) => {
                let valueCopy = [...value];
                if (checked) {
                  valueCopy = [...value, option.value]; // append to array
                } else {
                  const idx = valueCopy.findIndex(
                    (val: string) => val === option.value
                  );
                  valueCopy.splice(idx, 1); // remove from array
                }
                onChange(valueCopy); // update form field with new array
              }}
              key={""}
              label={option.label}
              id={""}
            ></SelectableButton>
          </Grid>
        ))}
      </Grid>
      {errors[field?.name] && (
        <FormHelperText error sx={{ m: 0 }}>
          {errors[field?.name]?.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};
