import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string()
    .required('You must enter a name')
    .min(3, 'Your name must be at least 3 characters long'),
    email: yup.string()
    .email('Must be a valid email address')
    .required('Email address is required'),
    password: yup.string()
    .required('You must enter a password')
    .min(8, 'Password must be at least 8 characters long'),
    terms: yup
    .boolean()
    .oneOf([true], "You must accept Terms and Conditions (duh)")

})