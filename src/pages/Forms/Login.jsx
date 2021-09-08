import './Form.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginValidationRules, validate } from '../../utility';
import { loginUser } from '../../api';
import { Loader } from '../../components';
import { useAuth } from '../../context';

export default function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    login: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();

  async function loginHandler() {
    const validationError = validate(input, loginValidationRules);
    setFormError({ ...formError, ...validationError });

    if (Object.keys(validationError).length === 0) {
      setLoading(true);
      try {
        const {
          data: {
            data: { user, authToken },
          },
          status: loginStatus,
        } = await loginUser(input);

        if (loginStatus === 200) {
          dispatchAuth({ type: 'LOGIN_USER', payload: { user, authToken } });
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('userId', user._id);
          navigate('/my-list');
        }
      } catch (err) {
        if (err.response) {
          const {
            data: {
              error: { code, errors },
            },
            status,
          } = err.response;
          if (status === 400 && errors) {
            setFormError(
              errors.reduce((errObj, { message, key, type }) => {
                return { ...errObj, [key]: message };
              }, {})
            );
          } else if (status > 400) {
            setFormError({
              email: '',
              password: '',
              login: 'Incorrect username/password',
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="form--login layout--default justify-center">
      <div className="form__container">
        <div className="form__header">
          <p className="text text--md text--primary">Login In</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <p className="form__field field__error small">{formError.login}</p>
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
            <p className="field__error small">{formError.email}</p>
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
            <p className="field__error small">{formError.password}</p>
          </div>
          <button
            className="btn justify-center btn--primary"
            type="submit"
            onClick={loginHandler}
          >
            {loading ? <Loader /> : 'Login'}
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
