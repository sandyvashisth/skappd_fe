import { atom } from "jotai";
import { TStep } from "src/constants/onboarding";

const initialState = [
  {
    id: "login_setup",
    title: "Login Setup",
    active: false,
    status: "completed",
    approxCompletionTime: 1,
  },
  {
    id: "personal_details",
    title: "Personal Details",
    active: true,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "job_preferences",
    title: "Job Preferences",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "setup_your_discipline",
    title: "Setup your Discipline",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "education_certifications",
    title: "Education & Certifications",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "level_of_comfort",
    title: "Level of Comfort",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "location_preferences",
    title: "Location Preferences",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "benefits_priorities",
    title: "Benefits & Priorities",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
  {
    id: "upload_documents",
    title: "Upload Resume",
    active: false,
    status: null,
    approxCompletionTime: 1,
  },
];

export const onboarding_steps = atom(initialState);

export const active_step = atom((get) =>
  get(onboarding_steps).find((item) => item.active === true)
);

export const udpate_step = atom(
  (get) => {
    let activeStepIndex = 0;
    const activeStep = get(onboarding_steps).find((item, index) => {
      if (item.active === true) {
        activeStepIndex = index;
        return true;
      }
    });
    return { activeStepIndex, activeStep };
  },
  (get, set, id: string) =>
    set(onboarding_steps, setActiveStepById(get(onboarding_steps), id))
);

export const set_step_completed = atom(
  (get) => get(onboarding_steps).find((item) => item.active === true),
  (get, set, id) => {
    set(
      onboarding_steps,
      get(onboarding_steps).map((step) =>
        step.id === id ? { ...step, status: "completed" } : step
      )
    );
    set(onboarding_steps, setNextStepActive(get(onboarding_steps)));
  }
);

export const progress_status = atom((get) =>
  getProgressStatus(get(onboarding_steps))
);
//Helper functions

function setActiveStepById(steps: TStep[], id: string) {
  return steps.map((step) => {
    if (step.id !== id && step.active === true)
      return { ...step, active: false };
    if (step.id === id && step.active !== true)
      return { ...step, active: true };
    return step;
  });
}

function setNextStepActive(steps: TStep[]) {
  const currentActiveStepIndex = steps.findIndex((step) => step.active);
  const newActiveStepIndex = currentActiveStepIndex + 1;
  if (newActiveStepIndex < steps.length) {
    steps[currentActiveStepIndex].active = false;
    steps[newActiveStepIndex].active = true;
  }
  return steps;
}

function getProgressStatus(steps: TStep[]) {
  let totalTime = 0;
  let remainingTime = 0;
  let timeCompleted = 0;
  steps.forEach(({ status, approxCompletionTime }) => {
    if (status === "completed")
      timeCompleted = timeCompleted + approxCompletionTime;
    totalTime = totalTime + approxCompletionTime;
  });
  remainingTime = totalTime - timeCompleted;
  const progressPercent = (timeCompleted / totalTime) * 100;
  return { totalTime, remainingTime, progressPercent };
}
