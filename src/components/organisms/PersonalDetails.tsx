import { Box, Grid, Typography, Button, CardMedia } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormTextField } from "@components/atoms/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalDetailsSchema } from "src/schema/onboardingSchema";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { FormMultipleSelect } from "@components/atoms/FormMultipleSelect";
import { states } from "src/constants/onboarding";
import api from "@/services/api";
import { useToast } from "use-toast-mui";
import Snackbar from '@mui/material/Snackbar';

export const PersonalDetails = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const toast = useToast();
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

  const [open, setOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState<string>('');
  const onSubmit = async (formData: any) => {
    console.log("Form Data ===> ", formData);

    try {
      await api.put("v1/profile", {
        user: {
          full_name: formData.fullName,
          address: `${formData.address} ${formData.city.label} ${formData.state.label} ${formData.zip}`,
        },
      });
      setNotificationMessage("Saving...")
      setOpen(true);
      setStepComplete(activeStep?.id);
    } catch (err: any) {
      toast.error(err?.message || err);
    }

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
        Welcome on board!!<br/>
        As a part of registration please provide the following details to complete the profile. 
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

              

              
              <Grid container>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="/images/pose-m-1.png"
                  alt="Live from space album cover"
                />
              </Grid>


            </Grid>
          </Grid>

          {/* User this button when save the record from Diolo */}
          {!showFooter && (
            <Grid item xs={12} md={6}>
              <Button variant="outlined">Save</Button>
            </Grid>
          )}
        </Grid>

        {showFooter ? <FormFooter /> : ""}
      </form>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        message={"Bro.."}
      />
    </Box>
  );
};

PersonalDetails.defaultProps = {
  showFooter: true,
};
