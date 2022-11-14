import { Box, Grid, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { SetupDiscipline } from "src/schema/onboardingSchema";
import { useState } from "react";
import { OtSkillsSelector } from "@components/molecules/OtSkillsSelector";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";

export const SetupYourDiscipline = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const [expanded, setExpanded] = useState<string>("");
  const formInstance = useForm({
    resolver: yupResolver(SetupDiscipline),
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
        <Typography variant="h6">Setup your Discipline</Typography>
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
              title="Select Discipline"
              value={getValues("discipline")}
              name="discipline"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["discipline"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "discipline",
                  label: "Select Discipline",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Occupational Therapist",
                        label: "Occupational Therapist",
                      },
                    ],
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <StepAccordion
            title="Select Discipline"
            value={getValues("otSkills")}
            name="otSkills"
            expanded={expanded}
            handleChange={setExpanded}
            fieldsType="comboButtonWithInput"
            isError={errors["otSkills"]}
          >
            <OtSkillsSelector
              field={{
                name: "otSkills",
                label: "OT Skills",
                control: control,
                options: [
                  { key: "Amputee", title: "Amputee" },
                  { key: "Autism", title: "Autism" },
                  { key: "Dementia", title: "Dementia" },
                  { key: "Feeding", title: "Feeding" },
                  { key: "Home Modification", title: "Home Modification" },
                  { key: "Burns", title: "Burns" },
                  { key: "Community Re-entry", title: "Community Re-entry" },
                  { key: "IASTM", title: "IASTM" },
                  { key: "Manual Therapy", title: "Manual Therapy" },
                  { key: "Cupping", title: "Cupping" },
                ],
              }}
              selectedValues={getValues("otSkills")}
              formInstance={formInstance}
            />
          </StepAccordion>
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

SetupYourDiscipline.defaultProps = {
  showFooter: true,
};
