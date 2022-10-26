import { Box, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCustomRadioGroup } from "@components/atoms/FormCustomRadioGroup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { JobPreferencesSchema } from "src/schema/onboardingSchema";
import { useState } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";

export const JobPreferences = () => {
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
  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    setStepComplete(activeStep?.id);
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
          <AccessTimeIcon fontSize="small" /> 1-2 mins
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ my: 4 }}>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Current job status"
              value={getValues("jobStatus")}
              name="jobStatus"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <FormCustomRadioGroup
                field={{
                  name: "jobStatus",
                  label: "What is your current job status?",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Ready to Mingle",
                        label: "Ready to Mingle",
                      },
                      {
                        value: "Looking Around",
                        label: "Looking Around",
                      },
                      {
                        value: "Currently off the Market",
                        label: "Currently off the Market",
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
        </Grid>
        <FormFooter />
      </form>
    </Box>
  );
};
