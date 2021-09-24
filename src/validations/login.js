import { formError } from '../constants';
const { EMAIL_INVALID } = formError;

export const loginValidationRules = {
  email: {
    required: true,
    format: {
      regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: EMAIL_INVALID,
    },
  },
  password: {
    required: true,
  },
};
