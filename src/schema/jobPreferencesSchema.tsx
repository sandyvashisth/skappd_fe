import * as yup from "yup";

export const JobPreferencesSchema = yup.object().shape({
  jobStatus: yup.string().nullable().required('Please select job status.'),
  typeOfPosition: yup.array().min(1, 'Please select type of position.'),
  shift: yup.array().min(1, 'Please select suitable shift.'),
});
