import * as yup from 'yup';

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