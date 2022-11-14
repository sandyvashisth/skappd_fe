import * as yup from "yup";

export const PersonalDetailsSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^\D*$/, "Please enter a valid full name.")
    .required("Please enter full name."),
  address: yup.string().required("Please enter an address."),
  city: yup
    .object()
    .shape({ value: yup.string(), label: yup.string() })
    .required("Please select a city."),
  state: yup
    .object()
    .shape({ value: yup.string(), label: yup.string() })
    .required("Please select a state."),
  zip: yup
    .string()
    .min(4, "Please enter a valid ZIP code")
    .required("Please enter a ZIP code."),
});

export const LevelOfComfortSchema = yup.object().shape({
  comfortSetting: yup.array().min(1, "Please select an option."),
  patientPopulation: yup.array().min(1, "Please select an option."),
});

export const JobPreferencesSchema = yup.object().shape({
  jobStatus: yup.string().nullable().required("Please select an option."),
  typeOfPosition: yup.array().min(1, "Please select an option."),
  shift: yup.array().min(1, "Please select at least an option."),
});

export const educationCertificateSchema = yup.object().shape({
  hightestEducation: yup.array().min(1, "Please select an option."),
  otherCertificates: yup.array().min(1, "Please select an option."),
});

export const BenefitsSchema = yup.object().shape({
  benifits: yup.array().min(1, "Please select an option."),
});

export const LocationPreferenceSchema = yup.object().shape({
  relocating: yup.string().nullable().required("Please select an option."),
  statePrefer: yup.array().min(1, "Please select an option."),
  stateLicenses: yup.array().min(1, "Please select an option."),
  languages: yup.array().min(1, "Please select an option."),
  nearMiles: yup.string().nullable().required("Please Enter mile."),
});

export const SetupDiscipline = yup.object().shape({
  discipline: yup.array().min(1, "Please select an option."),
  otSkills: yup
    .array()
    .of(yup.object().shape({ key: yup.string(), experience: yup.number() }))
    .min(1, "Please select at least one skill."),
});

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup
    .string()
    .required("required")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "password must contain at least a symbol, upper and lower case letters and a number"
    ),
});

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup
    .string()
    .required("required")
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "password must contain at least a symbol, upper and lower case letters and a number"
    ),
  cnfPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const uploadResumeSchema = yup.object().shape({
  resume: yup.array().nullable().min(1, "Please select Resume."),
  summary: yup.string(),
});
