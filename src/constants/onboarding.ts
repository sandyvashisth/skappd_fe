export type TStep = {
  id: string;
  title: string;
  status: null | 'completed'
}

export const steps: TStep[] = [
  {
    id: "login_setup",
    title: "Login Setup",
    status: "completed",
  },
  {
    id: "personal_details",
    title: "Personal Details",
    status: null,
  },
  {
    id: "job_preferences",
    title: "Job Preferences",
    status: null,
  },
  {
    id: "setup_your_discipline",
    title: "Setup your Discipline",
    status: null,
  },
  {
    id: "education_certifications",
    title: "Education & Certifications",
    status: null,
  },
  {
    id: "level_of_comfort",
    title: "Level of Comfort",
    status: null,
  },
  {
    id: "location_preferences",
    title: "Location Preferences",
    status: null,
  },
  {
    id: "benefits_priorities",
    title: "Benefits & Priorities",
    status: null,
  },
];
