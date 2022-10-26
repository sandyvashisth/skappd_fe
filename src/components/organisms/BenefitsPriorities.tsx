import { Box, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BenefitsSchema } from "src/schema/onboardingSchema";
import { FormFooter } from "@components/atoms/FormFooter";
import { FormSelectableChips } from "@components/atoms/FormSelectableChips";

export const BenefitsPriorities = () => {
  const formInstance = useForm({
    resolver: yupResolver(BenefitsSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formInstance;

  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
  };

  return (
    <Box>
      <Box sx={{ mx: 3, mt: 6, pb: 2, borderBottom: "1px solid #CEE0DB" }}>
        <Typography variant="h6">Benefits & Priorities</Typography>
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
        <Grid container md={6} sx={{ px: 3 }}>
          <FormSelectableChips
            field={{
              name: "benifits",
              label: "What is the most important thing to you?",
              control: control,
              options: {
                options: [
                  {
                    value: "Benefits",
                    label: "Benefits",
                  },
                  {
                    value: "Speciality",
                    label: "Speciality",
                  },
                  {
                    value: "Training",
                    label: "Training",
                  },
                  {
                    value: "Culture",
                    label: "Culture",
                  },
                  {
                    value: "Loan Repayment",
                    label: "Loan Repayment",
                  },
                  {
                    value: "Location",
                    label: "Location",
                  },
                  {
                    value: "Just need a job",
                    label: "Just need a job",
                  },
                  {
                    value: "Setting",
                    label: "Setting",
                  },
                  {
                    value: "Challenge of the role",
                    label: "Challenge of the role",
                  },
                  {
                    value: "Job Title",
                    label: "Job Title",
                  },
                  {
                    value: "Convenience",
                    label: "Convenience",
                  },
                  {
                    value: "Company Stability",
                    label: "Company Stability",
                  },
                  {
                    value: "Shift",
                    label: "Shift",
                  },
                  {
                    value: "Growth",
                    label: "Growth",
                  },
                ],
              },
            }}
            formInstance={formInstance}
          />
        </Grid>
        <FormFooter />
      </form>
    </Box>
  );
};
