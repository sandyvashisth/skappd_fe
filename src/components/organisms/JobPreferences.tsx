import { Box, Grid, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCustomRadioGroup } from "@components/atoms/FormCustomRadioGroup";
import { StepAccordion } from "@components/molecules/StepAccordion";
import { FormCheckboxGrid } from "@components/atoms/FormCheckboxGrid";
import { JobPreferencesSchema } from "src/schema/onboardingSchema";
import { useState, useEffect } from "react";
import { FormFooter } from "@components/atoms/FormFooter";
import { set_step_completed } from "@state/onboarding";
import { useAtom } from "jotai";
import { useToast } from "use-toast-mui";
import api from "@/services/api";


export const JobPreferences = ({
  showFooter = true,
}: {
  showFooter?: Boolean;
}) => {
  const toast = useToast();
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

  const [jobStatus, setJobStatus] = useState([]);
  const [typeOfPositions, setTypeOfPositions] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    getJobStatusPreferences();
    typeOfPositionPreference();
    shiftPreference();

  }, [])

  // Get job Status possible values
  const getJobStatusPreferences = async () => {
    let profile = await apiWrapper("v1/job_status/preferences");
    setJobStatus(profile)
  }

  // Get Type of positions
  const typeOfPositionPreference = async () => {
    let positions = await apiWrapper("v1/preferences?preference_name=type_of_position_preference")
    setTypeOfPositions(positions)
  }
  
  // Get Shift Preferences
  const shiftPreference = async () => {
    let shifts = await apiWrapper("v1/preferences?preference_name=shift_preference")
    setShifts(shifts)
  }

  // a common GET API wrapper
  const apiWrapper = async (end_point) => {
    try {
      let resp = await api.get(end_point);
      return resp.data.data;
    } catch (err: any) {
      toast.error(err?.message || err);
    } 
  }

  const onSubmit = async (formData: any) => {
    console.log("Form Data ===> ", formData);

    try {
      let resp = await api.put("v1/profile", {
        user: {
          status: parseInt(formData.status)
        },
      });

      localStorage.setItem("user", JSON.stringify(resp?.data?.data));

      // setNotificationMessage("Saving...")
      // setOpen(true);
      setStepComplete(activeStep?.id);
    } catch (err: any) {
      toast.error(err?.message || err);
    }

  };

  // return array of values
  // should be put to a common file
  const getLabels = (key: any, type: any) => {
    let selected;
    let selectedValues = getValues(key)
    if(type == 'job_status'){
      selected = jobStatus.find(o => o.value === parseInt(selectedValues));
      selected = selected?.label
    } else if (type == 'positions'){
      selected = typeOfPositions.filter(function (o) {
        return selectedValues.includes(o.value)
      }).map(function (obj) { return obj.label; });
    } else if (type == 'shift') {
      selected = shifts.filter(function (o) {
        return selectedValues.includes(o.value)
      }).map(function (obj) { return obj.label; });
    }
    return selected
  }

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
              value={getLabels("status", 'job_status')}
              name="status"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["status"]}
            >
              <FormCustomRadioGroup
                field={{
                  name: "status",
                  label: "What is your current job status?",
                  control: control,
                  options: {
                    options: jobStatus,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Type of Position"
              value={getLabels("typeOfPositions", 'positions')}
              name="typeOfPositions"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["typeOfPositions"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "typeOfPositions",
                  label: "Type of Position",
                  control: control,
                  options: {
                    options: typeOfPositions,
                  },
                }}
                formInstance={formInstance}
              />
            </StepAccordion>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: "1px solid #CEE0DB" }}>
            <StepAccordion
              title="Shift"
              value={getLabels("shifts", "shift")}
              name="shifts"
              expanded={expanded}
              handleChange={setExpanded}
              isError={errors["shifts"]}
            >
              <Typography sx={{ mb: 2 }}></Typography>
              <FormCheckboxGrid
                field={{
                  name: "shifts",
                  label: "Shift",
                  control: control,
                  options: {
                    options: shifts,
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
