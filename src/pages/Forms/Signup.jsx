import './Form.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signupValidationRules, validate } from '../../validations';
import { useAuth, useUser } from '../../contexts';

export default function Signup() {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const {
    auth: { status, error },
    dispatchAuth,
    signUpUser,
  } = useAuth();
  const { dispatchUser } = useUser();

  useEffect(() => {
    if (status === 'failed' && error && error.statusCode === 400) {
      console.log(error);
      setFormError(
        error.errors.reduce((errObj, { message, key, type }) => {
          return { ...errObj, [key]: message };
        }, {})
      );
    }

    if (status === 'success') navigate('/watch');
  }, [status, navigate, error]);

  async function signupHandler() {
    const validationError = validate(input, signupValidationRules);
    setFormError({ ...formError, ...validationError });

    if (Object.keys(validationError).length === 0) {
      const reqBody = (({ email, firstName, password }) => ({
        email,
        firstName,
        password,
      }))(input);

      if (input.lastName !== '') reqBody.lastName = input.lastName;

      signUpUser(dispatchAuth, dispatchUser, reqBody);
    }
  }

  return (
    <div className="form--signup layout--center">
      <div className="form__container">
        <div className="form__header">
          <p className="text text--md text--primary">Sign Up</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div class="flex--row">
            <div className="form__field field field--required">
              <label class="field__label" htmlFor="first-name">
                First Name
              </label>
              <input
                class="field__input"
                id="first-name"
                type="text"
                value={input.firstName}
                onChange={(e) =>
                  setInput({ ...input, firstName: e.target.value })
                }
              />
              <p className="field__error small">{formError.firstName}</p>
            </div>
            <div className="form__field field">
              <label class="field__label" htmlFor="last-name">
                Last Name
              </label>
              <input
                class="field__input"
                id="last-name"
                type="text"
                value={input.lastName}
                onChange={(e) =>
                  setInput({ ...input, lastName: e.target.value })
                }
              />
              <p className="field__error small">{formError.lastName}</p>
            </div>
          </div>
          <div class="form__field field field--required">
            <label class="field__label" htmlFor="email">
              Email
            </label>
            <input
              class="field__input"
              id="email"
              type="email"
              autocomplete="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <p className="field__error small">{formError.email}</p>
          </div>
          <div class="form__field field field--required">
            <label class="field__label" htmlFor="password">
              Password
            </label>
            <input
              class="field__input"
              id="password"
              type="password"
              autocomplete="new-password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <p className="field__error small">{formError.password}</p>
          </div>
          <div class="form__field field field--required">
            <label class="field__label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              class="field__input"
              id="confirm-password"
              type="password"
              autocomplete="new-password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
            <p className="field__error small">{formError.confirmPassword}</p>
          </div>
          <button
            className="btn justify-center btn--primary"
            type="submit"
            onClick={signupHandler}
          >
            {status === 'loading' ? 'Loading...' : 'Register'}
          </button>
        </form>
        <div className="form__footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link link--hover">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
