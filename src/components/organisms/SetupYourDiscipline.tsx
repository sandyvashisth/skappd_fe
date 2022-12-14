import { Box, Grid, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { SetupDiscipline } from "src/schema/onboardingSchema";
import { useEffect, useState } from "react";
import { OtSkillsSelector } from "@components/molecules/OtSkillsSelector";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { useDiscipline } from "services/discipline";
import { Loader } from "@components/atoms/Loader";

export const SetupYourDiscipline = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const { getDiscipline, getOtSkills, disciplineOptions = [], otSkillsOption = [],  isLoading } =
    useDiscipline();
  const [expanded, setExpanded] = useState<string>("");

  useEffect(() => {
    getDiscipline();
    getOtSkills();
  }, []);

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
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                        options: disciplineOptions,
                      },
                    }}
                    formInstance={formInstance}
                  />
                </StepAccordion>
              </Grid>
              <StepAccordion
                title="OT Skills and Experience"
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
                    options: otSkillsOption,
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
      )}
    </>
  );
};

SetupYourDiscipline.defaultProps = {
  showFooter: true,
};
