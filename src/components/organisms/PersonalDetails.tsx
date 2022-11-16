import { Box, Grid, Typography, Button, CardMedia } from "@mui/material";
import React, { useState, useEffect } from "react";
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
    reset,
    formState: { errors },
  } = formInstance;
  const [activeStep, setStepComplete] = useAtom(set_step_completed);

  // For floting notification bar
  const [open, setOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState(false);

  // For logged in user details
  const [profile, setProfile] = useState({})

  // Prefilled form
  useEffect(() => {
    getProfile()
  }, [])


  const getProfile = async () => {
    try {
      let profile = await api.get("v1/profile");
      let user = profile.data.data;      
      let stateObj = states.find(o => o.label === user.state);
      setProfile(user)
      console.log("^^^^^^^^^^^^^^", stateObj)
      reset({
          fullName: user.full_name,
          address: user.address,
          zip: user.zip_code,
          city: user.city,
          state: stateObj,
        });

    } catch (err: any) {
      toast.error(err?.message || err);
    }    
  }

  // submit the form 
  const onSubmit = async (formData: any) => {

    console.log(formData, "===========")

    try {
      await api.put("v1/profile", {
        user: {
          full_name: formData.fullName,
          address: formData.address,
          state: formData.state.label,
          city: formData.city.label,
          zip_code: formData.zip
        },
      });
      
      setNotificationMessage("Profile Updated...")
      setOpen(true);
      setStepComplete(activeStep?.id);
    } catch (err: any) {
      toast.error(err?.message || err);
    }

  };

  return (
    <Box sx={{ p: [2, 4] }}>
      <Typography variant="h6">Personal Details</Typography>
      <Typography variant="body1">
        Welcome on board {profile && ( profile.full_name )}!!;
      </Typography>
      <Typography variant="body2">
        As a part of registration please provide the following details to complete the profile. 
      </Typography>
        
      <form onSubmit={handleSubmit(onSubmit)} >
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
                <FormTextField
                  field={{
                    name: "city",
                    label: "City",
                    control: control,
                    error: errors?.city,
                    options: { autoCapitalize: true },
                  }}
                />
                {/* <FormMultipleSelect
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
                /> */}
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
        open={open}
        autoHideDuration={6000}
        message={notificationMessage}
      />
    </Box>
  );
};

PersonalDetails.defaultProps = {
  showFooter: true,
};
