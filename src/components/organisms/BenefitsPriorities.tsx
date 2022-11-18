import { Box, Grid, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BenefitsSchema } from "src/schema/onboardingSchema";
import { FormFooter } from "@components/atoms/FormFooter";
import { FormSelectableChips } from "@components/atoms/FormSelectableChips";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { useBenefitsPriorities } from 'services/benefitsPriorities';
import { useEffect } from "react";
export const BenefitsPriorities = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const formInstance = useForm({
    resolver: yupResolver(BenefitsSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formInstance;
  const { benefitsPreferencesOptions = [], getBenefitsPreferencesOptions } = useBenefitsPriorities();
  const [activeStep, setStepComplete] = useAtom(set_step_completed);
  useEffect(()=>{getBenefitsPreferencesOptions()},[])
  const onSubmit = (formData: any) => {
    console.log("Form Data ===> ", formData);
    setStepComplete(activeStep?.id);
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
          {/* <AccessTimeIcon fontSize="small" /> 1-2 mins */}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container md={6} sx={{ px: 3, mt: 4, mb: 8 }} item>
          <FormSelectableChips
            field={{
              name: "benifits",
              label: "What is the most important thing to you?",
              control: control,
              options: {
                options: benefitsPreferencesOptions,
              },
            }}
            formInstance={formInstance}
          />
          {/* User this button when save the record from Diolo */}
          {!showFooter && (
            <Grid item xs={12}>
              <Button variant="outlined" type="submit">
                Save
              </Button>
            </Grid>
          )}
        </Grid>

        {showFooter ? <FormFooter /> : ""}
      </form>
    </Box>
  );
};
