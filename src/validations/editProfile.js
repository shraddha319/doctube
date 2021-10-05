import { formError } from '../constants';

const { EMAIL_INVALID, LETTERS_ONLY } = formError;

export const editProfileRules = {
  firstName: {
    required: true,
    format: {
      regexp: /^[a-zA-Z]+$/,
      message: LETTERS_ONLY,
    },
  },
  lastName: {
    format: {
      regexp: /^[a-zA-Z]*$/,
      message: LETTERS_ONLY,
    },
  },
  email: {
    required: true,
    format: {
      regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: EMAIL_INVALID,
    },
  },
};
