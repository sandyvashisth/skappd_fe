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
  const [jobStatusPreferenceId, setJobStatusPreferenceId] = useState();

  const [typeOfPositions, setTypeOfPositions] = useState([]);
  const [typeOfPositionsPreferenceId, setTypeOfPositionsPreferenceId] = useState();

  const [shifts, setShifts] = useState([]);
  const [shiftsPreferenceId, setShiftsPreferenceId] = useState();


  useEffect(() => {
    getJobStatusPreferences();
    typeOfPositionPreference();
    shiftPreference();

  }, [])

  // Get job Status possible values
  // All below code should moved to service
  const getJobStatusPreferences = async () => {
    let profile = await apiWrapper("v1/job_status/preferences");
    setJobStatus(profile?.data)
    setJobStatusPreferenceId(profile?.preference_id)
  }

  // Get Type of positions
  const typeOfPositionPreference = async () => {
    let positions = await apiWrapper("v1/preferences?preference_name=type_of_position_preference")
    setTypeOfPositions(positions?.data)
    setTypeOfPositionsPreferenceId(positions?.preference_id)
  }
  
  // Get Shift Preferences
  const shiftPreference = async () => {
    let shifts = await apiWrapper("v1/preferences?preference_name=shift_preference")
    setShifts(shifts?.data)
    setShiftsPreferenceId(shifts?.preference_id)
  }

  // a common GET API wrapper
  const apiWrapper = async (end_point: string) => {
    try {
      let resp = await api.get(end_point);
      return resp.data;
    } catch (err: any) {
      toast.error(err?.message || err);
    } 
  }

  const onSubmit = async (formData: any) => {

    try {
      let resp = await api.put("v1/profile", {
        user: {
          status: parseInt(formData.status)
        },
      });

      localStorage.setItem("user", JSON.stringify(resp?.data?.data));
      // call 2nd API
      addShiftPreference(formData)
      setStepComplete(activeStep?.id);
    } catch (err: any) {
      toast.error(err?.message || err);
    }
  };

  // Shift Preference
  const addShiftPreference = async (obj: any) => {
    try {
      let resp = await api.post("v1/profile/user_preferences/", {
        preferences: {
          preference_id: shiftsPreferenceId,
          preference_value_ids: obj.shifts
        },
      });
      addPositionsPreference(obj)
      // setStepComplete(activeStep?.id);
    } catch (err: any) {
      toast.error(err?.message || err);
    }    
  }

  // Positions Preference
  const addPositionsPreference = async (obj: any) => {
    try {
      let resp = await api.post("v1/profile/user_preferences/", {
        preferences: {
          preference_id: typeOfPositionsPreferenceId,
          preference_value_ids: obj.typeOfPositions
        },
      });
      // setStepComplete(activeStep?.id);
    } catch (err: any) {
      toast.error(err?.message || err);
    }
  }

  // return array of values
  // should be put to a common file
  const getLabels = (key: any, type: any) => {
    let selected: any;
    let selectedValues = getValues(key)
    if(type == 'job_status'){
      selected = jobStatus.find((o: any) => o.value === parseInt(selectedValues));
      selected = selected?.label
    } else if (type == 'positions'){
        selected = typeOfPositions.filter(function (o: any) {
        return selectedValues.includes(o.value)
      }).map(function (obj: any) { return obj.label; });
    } else if (type == 'shift') {
      selected = shifts.filter(function (o: any) {
        return selectedValues.includes(o.value)
      }).map(function (obj: any) { return obj.label; });
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
              <Button variant="outlined" type="submit">Save</Button>
            </Grid>
          )}
        </Grid>

        {showFooter ? <FormFooter /> : ""}
      </form>
    </Box>
  );
};
