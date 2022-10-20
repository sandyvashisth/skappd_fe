import * as yup from "yup";

export const PersonalDetailsSchema = yup.object().shape({
  fullName: yup
      .string()
      .matches(/^\D*$/, 'Please enter a valid full name.')
      .required('Please enter full name.'),
  address: yup.string().required('Please enter an address.'),
  city: yup.string().required('Please enter a city.'),
  state: yup.string().nullable().required('Please enter a state.'),
  zip: yup
      .string()
      .min(4, 'Please enter a valid ZIP code')
      .required('Please enter a ZIP code.'),
});

export const educationCertificateSchema = yup.object().shape({
  comfortSetting: yup.array().min(1, 'Please select an option.'),
  patientPopulation: yup.array().min(1, 'Please select an option.'),
});

export const JobPreferencesSchema = yup.object().shape({
  jobStatus: yup.string().nullable().required('Please select an option.'),
  typeOfPosition: yup.array().min(1, 'Please select an option.'),
  shift: yup.array().min(1, 'Please select at least an option.'),
});

export const LevelOfComfortSchema = yup.object().shape({
  hightestEducation: yup.string().nullable().required('Please select an option.'),
  otherCertificates: yup.array().min(1, 'Please select an option.'),
});

export const LocationPreferenceSchema = yup.object().shape({
  relocating: yup.string().nullable().required('Please select an option.'),
  statePrefer: yup.array().min(1, 'Please select an option.'),
});