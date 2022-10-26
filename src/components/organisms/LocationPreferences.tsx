import { Box, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { LocationPreferenceSchema } from "src/schema/onboardingSchema";
import { useState } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";

export const LocationPreferences = () => {
  const [expanded, setExpanded] = useState<string>("");
  const formInstance = useForm({
    resolver: yupResolver(LocationPreferenceSchema),
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
        <Typography variant="h6">Location Preferences</Typography>
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
              title="Are you open to relocating?"
              value={getValues("relocating")}
              name="relocating"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <FormCheckboxGrid
                field={{
                  name: "relocating",
                  label: "Are you open to relocating?",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Yes",
                        label: "Yes",
                      },
                      {
                        value: "No",
                        label: "No",
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
              title="States you prefer"
              value={getValues("statePrefer")}
              name="statePrefer"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "statePrefer",
                  label: "States you prefer",
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
        </Grid>
        <FormFooter />
      </form>
    </Box>
  );
};
