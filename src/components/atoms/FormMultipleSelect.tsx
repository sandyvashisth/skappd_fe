import {
  Autocomplete,
  FormControl,
  TextField,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useCallback } from "react";
import { useController, UseFormReturn } from "react-hook-form";
import { IFormField } from "types";
import { StyledLabel } from "./common";

export interface TFormMultipleSelectOptions {
  label: string;
  value: any;
}

export interface TFormFormMultipleSelectOptions {
  options: Array<TFormMultipleSelectOptions>;
}

type TFormMultipleSelect = {
  field: IFormField<TFormFormMultipleSelectOptions>;
  formInstance: any;
};

export const FormMultipleSelect = ({
  field,
  formInstance,
}: TFormMultipleSelect) => {
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

  const handleInputChange = (event: React.SyntheticEvent, value: any) => {
    event.stopPropagation();
    onChange(value);
  };

  const isOptionEqualToValue = useCallback(
    (option: TFormMultipleSelectOptions) =>
      value.findIndex(
        ({ value: savedValue }: { value: string }) =>
          savedValue === option.value
      ) > -1,
    [value]
  );

  return (
    <FormControl sx={{ width: "100%", my: 2 }}>
      <StyledLabel>{field.label}</StyledLabel>
      <Grid container columnSpacing={2} sx={{ mt: 2 }}>
        <Grid item md={4} xs={12} sx={{ width: "100%", mr: 4 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={options}
            getOptionLabel={(option: any) => option.label}
            isOptionEqualToValue={isOptionEqualToValue}
            defaultValue={value}
            onChange={handleInputChange}
            sx={{
              color: "red",
              "& .MuiChip-root": {
                borderRadius: "4px",
                background: "#dae6e2",
                color: "#2E7D32",
                border: "1px solid #2E7D3280",
                "& svg": {
                  color: "#87b18c",
                },
              },
              "& .MuiInput-underline::before": {
                borderBottom: "2px solid #cee0db !important",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors[field?.name]}
                variant="standard"
                placeholder="Select State"
              />
            )}
          />
        </Grid>
      </Grid>
      {errors[field?.name] && (
        <FormHelperText error>
          {errors[field?.name]?.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};
