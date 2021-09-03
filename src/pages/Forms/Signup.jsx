import './Form.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerValidationRules, validate } from '../../utility';

export default function Signup() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function signupHandler() {
    const validationError = validate(input, registerValidationRules);
    setError(validationError);
  }

  return (
    <div className="form--signup layout--default justify-center">
      <div className="form__container">
        <div className="form__header">
          <p className="text text--md text--primary">Sign Up</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div class="form__field field">
            <label class="field__label" htmlhtmlFor="name">
              Full Name
            </label>
            <input
              class="field__input"
              id="name"
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            <p className="field__error">{error.name}</p>
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
            <p className="field__error">{error.email}</p>
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
            <p className="field__error">{error.password}</p>
          </div>
          <div class="form__field field field--required">
            <label class="field__label" htmlFor="password">
              Confirm Password
            </label>
            <input
              class="field__input"
              id="password"
              type="password"
              autocomplete="new-password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
            <p className="field__error">{error.confirmPassword}</p>
          </div>
          <button
            className="btn justify-center btn--primary"
            type="submit"
            onClick={signupHandler}
          >
            Register
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
