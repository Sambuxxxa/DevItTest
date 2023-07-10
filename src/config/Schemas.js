import * as yup from "yup";

const newUserSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
  password: yup
    .string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .required('Введите пароль'),
  email: yup.string().email('Введите корректный email').required('Введите email'),
  name: yup.string().min(2, 'Имя должно содержать минимум 2 символа').required('Введите имя'),
  code: yup
    .string()
    .matches(/^\d{4}$/, 'Код должен состоять из 4 цифр')
    .required('Введите код'),
  phoneNumber: yup
    .string()
    .matches(/^\+?\d{11}$/, 'Номер телефона должен состоять из 11 цифр')
    .required('Введите номер телефона'),
});

const logInSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .required('Введите пароль'),
  email: yup.string().email('Введите корректный email').required('Введите email'),
});

const userInfoSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^\+?\d{11}$/, 'Номер телефона должен состоять из 11 цифр')
    .required('Введите номер телефона'),
  email: yup.string().email('Введите корректный email').required('Введите email'),
  name: yup.string().min(2, 'Имя должно содержать минимум 2 символа').required('Введите имя'),
});

export { newUserSchema, logInSchema, userInfoSchema };
