import { Box, Grid, Typography, Button } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { FormTextField } from "@components/atoms/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalDetailsSchema } from "src/schema/onboardingSchema";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { FormMultipleSelect } from "@components/atoms/FormMultipleSelect";
import { states } from "src/constants/onboarding";

export const PersonalDetails = ({showFooter}:{showFooter: Boolean}) => {

  const formInstance = useForm<{
    fullName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  }>({
    resolver: yupResolver(PersonalDetailsSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formInstance;
  const [activeStep, setStepComplete] = useAtom(set_step_completed);
  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    setStepComplete(activeStep?.id);
  };

  return (
    <Box sx={{ p: [2, 4] }}>
      <Typography variant="h6">Personal Details</Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <AccessTimeIcon fontSize="small" /> 1-2 mins */}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} sx={{ mt: 4, mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 2 }}>Name</Typography>
            <FormTextField
              field={{
                label: "Full name",
                name: `fullName`,
                control: control,
                error: errors?.fullName,
                options: { autoCapitalize: true },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 2 }}>Address</Typography>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <FormTextField
                  field={{
                    label: "Street Address",
                    name: `address`,
                    control: control,
                    error: errors?.address,
                    options: { autoCapitalize: true },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormMultipleSelect
                  field={{
                    name: "state",
                    label: "State/Province",
                    control: control,
                    options: {
                      options: states,
                    },
                  }}
                  isShowFormLabel={false}
                  isShowInputLabel={true}
                  isMultiSelect={false}
                  formInstance={formInstance}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <FormMultipleSelect
                  field={{
                    name: "city",
                    label: "City",
                    control: control,
                    options: {
                      options: states,
                    },
                  }}
                  isShowFormLabel={false}
                  isShowInputLabel={true}
                  isMultiSelect={false}
                  formInstance={formInstance}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextField
                  field={{
                    label: "Zip Code",
                    name: `zip`,
                    control: control,
                    error: errors?.zip,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* User this button when save the record from Diolo */}
          {!showFooter && <Grid item xs={12} md={6}>
            <Button variant="outlined">Save</Button>
          </Grid>}

        </Grid>

        {showFooter ? <FormFooter /> : ''}

      </form>
    </Box>
  );
};

PersonalDetails.defaultProps = {
  showFooter: true
}