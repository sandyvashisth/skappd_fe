import styled from "@emotion/styled";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useController, UseFormReturn } from "react-hook-form";
import { IFormField } from "types";
import { StyledLabel } from "./common";

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

export const FormCheckboxGrid = ({
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
      <StyledLabel error={!!errors[field?.name]}>
        {field.label}
      </StyledLabel>
      <Grid container columnSpacing={2} sx={{ mt:2 }}>
        {options?.map((option: TCheckboxOptions) => (
          <Grid item xs={12} sm={6} key={option.value}>
            <FormControlLabel
              value={option.value}
              label={option.label}
              sx={{ display: "flex" }}
              control={
                <Checkbox
                  checked={value?.some((val: string) => val === option.value)}
                  onChange={(e) => {
                    let valueCopy = [...value];
                    if (e.target.checked) {
                      valueCopy = [...value, option.value]; // append to array
                    } else {
                      const idx = valueCopy.findIndex(
                        (val: string) => val === option.value
                      );
                      valueCopy.splice(idx, 1); // remove from array
                    }
                    onChange(valueCopy); // update form field with new array
                  }}
                  sx={{ ml: 2 }}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
      {errors[field?.name] && (
        <FormHelperText error>
          {errors[field?.name]?.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};
