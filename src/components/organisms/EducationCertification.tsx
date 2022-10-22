import { Box, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { educationCertificateSchema } from "src/schema/onboardingSchema";
import { useState } from "react";
import { FormFooter } from "@components/atoms/FormFooter";

export const EducationCertification = () => {
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

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

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
          <AccessTimeIcon fontSize="small" /> 1-2 mins
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ my: 4 }}>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Comfort Setting"
              value={getValues("comfortSetting")}
              name="comfortSetting"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <FormCheckboxGrid
                field={{
                  name: "comfortSetting",
                  label: "Comfort Setting",
                  control: control,
                  options: {
                    options: [
                      {
                        value: "Acute Care",
                        label: "Acute Care",
                      },
                      {
                        value: "Long Term Acute Care (LTAC)",
                        label: "Long Term Acute Care (LTAC)",
                      },
                      {
                        value: "Bachelors in Health Science",
                        label: "Bachelors in Health Science",
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
              title="Patient Population"
              value={getValues("patientPopulation")}
              name="patientPopulation"
              expanded={expanded}
              handleChange={setExpanded}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "patientPopulation",
                  label: "Patient Population",
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
