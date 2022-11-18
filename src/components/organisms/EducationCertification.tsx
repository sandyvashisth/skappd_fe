import { Box, Grid, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { educationCertificateSchema } from "src/schema/onboardingSchema";
import { useState, useEffect } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { useToast } from "use-toast-mui";
import { useEducationCertification } from "services/educationCertification";

export const EducationCertification = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const toast = useToast();
  const {
    getEducation,
    educationOptions = [],
    getOtCertification,
    otCertificationOptions = [],
    getBonus,
    bonusOptions = [],
    setEducation,
    setOtCertification,
    setBonus,
    isLoading
  } = useEducationCertification();
  const [expanded, setExpanded] = useState<string>("");
  const formInstance = useForm({
    resolver: yupResolver(educationCertificateSchema),
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
    setEducation(formData["hightestEducation"]);
    setOtCertification(formData["otherCertificates"]);
    setBonus(formData["Bonus"])
    setStepComplete(activeStep?.id);
  };

  useEffect(() => {
    getEducation();
    getOtCertification();
    getBonus();
  }, [])

  return (
    <Box>
      <Box sx={{ mx: 3, mt: 3 }}>
        <Typography variant="h6">Education & Certifications</Typography>
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
              title="Highest Education"
              value={getValues("hightestEducation")}
              name="hightestEducation"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["hightestEducation"]}
            >
              <FormCheckboxGrid
                field={{
                  name: "hightestEducation",
                  label: "Highest Education",
                  control: control,
                  options: {
                    options: educationOptions,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="OT Certifications"
              value={getValues("otherCertificates")}
              name="otherCertificates"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["otherCertificates"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "otherCertificates",
                  label: "OT Certifications",
                  control: control,
                  options: {
                    options: otCertificationOptions,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Special Certifications"
              value={getValues("bonus")}
              name="bonus"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["bonus"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "Bonus",
                  label: "Special Certifications",
                  control: control,
                  options: {
                    options: bonusOptions,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>

          {/* User this button when save the record from Diolo */}
          {!showFooter && (
            <Grid item xs={12} sx={{ mt: 2, ml: 2 }}>
              <Button variant="outlined" type="submit">Save</Button>
            </Grid>
          )}
        </Grid>

        {showFooter ? <FormFooter /> : ""}
      </form>
    </Box>
  );
};
