import { atom } from "jotai";

const initialState = [{
    id: 'login_setup',
    label: 'Login Setup',
    active: false
},
{
    id: 'personal_details',
    label: 'Personal Details',
    active: true
},
{
    id: 'job_preferences',
    label: 'Job Preferences',
    active: false
},
{
    id: 'setup_your_discipline',
    label: 'Setup your Discipline',
    active: false
}, {
    id: 'education_certifications',
    label: 'Education & Certifications',
    active: false
}, {
    id: 'level_of_comfort',
    label: 'Level of Comfort',
    active: false
},
{
    id: 'location_preferences',
    label: 'Location Preferences',
    active: false
}, {
    id: 'benefits_priorities',
    label: 'Benefits & Priorities',
    active: false
},
]

export const onboarding_steps = atom(initialState);

export const active_step = atom((get) => get(onboarding_steps).find(item => item.active === true))