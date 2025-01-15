import * as yup from 'yup'

const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/)

export const schema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Required field')
        .min(5, 'Minimum 5 characters required'),
    email: yup
        .string()
        .required('Required field')
        .matches(regExpEmail, 'Invalid mail format'),
    body: yup
        .string()
        .required('Please comment...')
})