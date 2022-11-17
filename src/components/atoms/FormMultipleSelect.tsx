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
  isMultiSelect?: boolean;
  isShowFormLabel?: boolean;
  isShowInputLabel?: boolean;
  formInstance: any;
};

export const FormMultipleSelect = ({
  field,
  isMultiSelect = true,
  isShowFormLabel = true,
  isShowInputLabel = false,
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
    <FormControl sx={{ width: "100%" }}>
      {isShowFormLabel && <StyledLabel>{field.label}</StyledLabel>}
      <Grid container columnSpacing={2} sx={{ mt: isShowFormLabel ? 2 : 0 }}>
        <Grid item sx={{ width: "100%" }}>
          <Autocomplete
            multiple={isMultiSelect}
            id="tags-standard"
            options={options}
            getOptionLabel={
              isMultiSelect ? (option: any) => option.label : undefined
            }
            isOptionEqualToValue={
              isMultiSelect ? isOptionEqualToValue : undefined
            }
            value={value}
            defaultValue={value}
            onChange={handleInputChange}
            sx={{
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
                label={isShowInputLabel ? field.label : ""}
                variant="standard"
                placeholder="Select..."
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
