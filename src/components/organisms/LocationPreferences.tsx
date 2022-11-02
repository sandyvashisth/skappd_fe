import { Box, Grid, Typography, InputAdornment } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCustomRadioGroup } from "@components/atoms/FormCustomRadioGroup";
import { LocationPreferenceSchema } from "src/schema/onboardingSchema";
import { useState } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import {
  FormMultipleSelect,
  TFormMultipleSelectOptions,
} from "@components/atoms/FormMultipleSelect";
import { languages, states } from "src/constants/onboarding";
import { FormTextField } from "@components/atoms/FormTextField";

export const LocationPreferences = () => {
  const [expanded, setExpanded] = useState<string>("");
  const [activeStep, setStepComplete] = useAtom(set_step_completed);

  const formInstance = useForm<{
    relocating: string;
    statePrefer: Array<TFormMultipleSelectOptions>;
    stateLicenses: Array<TFormMultipleSelectOptions>;
    languages: Array<TFormMultipleSelectOptions>;
    nearMiles: string;
  }>({
    resolver: yupResolver(LocationPreferenceSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = formInstance;

  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    setStepComplete(activeStep?.id);
  };

  const getSanitisedList = (
    key: "stateLicenses" | "languages" | "statePrefer"
  ) => getValues(key)?.map(({ label }: { label: string }) => label);

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
        <Grid container sx={{ mt: 4, mb: 8 }}>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Are you open to relocating?"
              value={getValues("relocating")}
              name="relocating"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["relocating"]}
            >
              <FormCustomRadioGroup
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
              value={getSanitisedList("statePrefer")}
              name="statePrefer"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["statePrefer"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormMultipleSelect
                field={{
                  name: "statePrefer",
                  label: "States you prefer",
                  control: control,
                  options: {
                    options: states,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} md={6} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="How many miles around each city (ballpark it)?"
              value={`${getValues("nearMiles")} miles`}
              name="nearMiles"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["nearMiles"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormTextField
                field={{
                  label: "Distance",
                  name: `nearMiles`,
                  control: control,
                  error: errors?.nearMiles,
                  options: {
                    type: "number",
                    autoCapitalize: true,
                    endAdornment: (
                      <InputAdornment
                        sx={{
                          "& p": { color: "#1EC271" },
                        }}
                        position="end"
                      >
                        miles
                      </InputAdornment>
                    ),
                    style: {
                      "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
                        {
                          appearance: "none",
                          margin: "0",
                        },
                      width: "50%",
                      "& .MuiInputBase-root": { backgroundColor: "#DAE7E2" },
                    },
                  },
                }}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="State licenses"
              value={getSanitisedList("stateLicenses")}
              name="stateLicenses"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["stateLicenses"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormMultipleSelect
                field={{
                  name: "stateLicenses",
                  label: "State licenses",
                  control: control,
                  options: {
                    options: states,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Languages"
              value={getSanitisedList("languages")}
              name="languages"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["languages"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormMultipleSelect
                field={{
                  name: "languages",
                  label: "Languages",
                  control: control,
                  options: {
                    options: languages,
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
