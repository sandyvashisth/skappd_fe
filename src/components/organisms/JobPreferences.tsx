import { Box, Grid, Typography, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormRadioWithIcon } from "@components/atoms/FormRadioWithIcon";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { JobPreferencesSchema } from "src/schema/onboardingSchema";
import { useState } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export const JobPreferences = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const [expanded, setExpanded] = useState<string>("");
  const formInstance = useForm({
    resolver: yupResolver(JobPreferencesSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = formInstance;

  const [activeStep, setStepComplete] = useAtom(set_step_completed);
  const router = useRouter();
  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    setStepComplete({ id: activeStep?.id, router });
  };

  return (
    <Box>
      <Box sx={{ mx: 3, mt: 3 }}>
        <Typography variant="h6">Job Preferences</Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <AccessTimeIcon fontSize="small" /> 1-2 mins */}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mt: 4, mb: 8 }}>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Current job status"
              value={getValues("jobStatus")}
              name="jobStatus"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["jobStatus"]}
            >
              <FormRadioWithIcon
                field={{
                  name: "jobStatus",
                  label: "What is your current job status?",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Ready to Mingle",
                        label: "Ready to Mingle",
                        iconColor: "#008000",
                        Icon: FavoriteIcon,
                        subLabel:
                          "Yes I am actively looking for new Opportunities",
                      },
                      {
                        value: "It’s complicated",
                        label: "It’s complicated",
                        iconColor: "#ffff00",
                        Icon: MonitorHeartIcon,
                        subLabel: "I am not sure  the moment.",
                      },
                      {
                        value: "Off the market",
                        label: "Off the market",
                        iconColor: "#ff0000",
                        Icon: HeartBrokenIcon,
                        subLabel: "I am done for now, I'll think later",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Type of Position"
              value={getValues("typeOfPosition")}
              name="typeOfPosition"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["typeOfPosition"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "typeOfPosition",
                  label: "Type of Position",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Per Diem",
                        label: "Per Diem",
                      },
                      {
                        value: "Part Time",
                        label: "Part Time",
                      },
                      {
                        value: "Contract",
                        label: "Contract",
                      },
                      {
                        value: "Full Time",
                        label: "Full Time",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Shift"
              value={getValues("shift")}
              name="shift"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["shift"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "shift",
                  label: "Shift",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "days",
                        label: "Days",
                      },
                      {
                        value: "4-10s",
                        label: "4-10s",
                      },
                      {
                        value: "Swing",
                        label: "Swing",
                      },
                      {
                        value: "Call",
                        label: "Call",
                      },
                      {
                        value: "Nights",
                        label: "Nights",
                      },
                      {
                        value: "7 On - 7 Off",
                        label: "7 On - 7 Off",
                      },
                      {
                        value: "Weekends",
                        label: "Weekends",
                      },
                      {
                        value: "Variable",
                        label: "Variable",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>

          {/* User this button when save the record from Diolo */}
          {!showFooter && (
            <Grid item xs={12} sx={{ mt: 2, ml: 2 }}>
              <Button variant="outlined">Save</Button>
            </Grid>
          )}
        </Grid>

        {showFooter ? <FormFooter /> : ""}
      </form>
    </Box>
  );
};
