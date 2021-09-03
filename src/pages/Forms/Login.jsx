import './Form.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginValidationRules, validate } from '../../utility';

export default function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  function loginHandler() {
    const validationError = validate(input, loginValidationRules);
    setError(validationError);
  }

  return (
    <div className="form--login layout--default justify-center">
      <div className="form__container">
        <div className="form__header">
          <p className="text text--md text--primary">Login In</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div class="form__field field field--required">
            <label class="field__label" for="email">
              Email
            </label>
            <input
              class="field__input"
              id="email"
              type="email"
              autocomplete="email"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <p className="field__error small">{error.email}</p>
          </div>
          <div class="form__field field field--required">
            <div className="justify-between">
              <label class="field__label" htmlFor="password">
                Password
              </label>
              <Link to="/" className="text--xs link">
                Forgot password?
              </Link>
            </div>
            <input
              class="field__input"
              id="password"
              type="password"
              autocomplete="current-password"
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <p className="field__error small">{error.password}</p>
          </div>
          <button
            className="btn justify-center btn--primary"
            type="submit"
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
        <div className="form__footer">
          <p>
            New to DocTube?{' '}
            <Link to="/signup" className="link link--hover">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
