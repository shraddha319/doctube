import './Form.scss';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '../../contexts';
import { useState } from 'react';

export default function EditProfile() {
  const {
    user: { profile },
    dispatchUser,
  } = useUser();
  const {
    auth: { status },
    dispatchAuth,
  } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    dispatchUser({ type: 'LOGOUT_USER' });
    dispatchAuth({ type: 'LOGOUT_AUTH' });
    localStorage.removeItem('authToken');
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="form--edit-profile layout--center">
      <div className="form__container">
        <div className="form__header flex--row">
          <p className="text text--md text--primary">Profile Settings</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div class="flex--row">
            <div className="form__field field field--disabled">
              <label class="field__label" htmlFor="first-name">
                First Name
              </label>
              <input
                disabled
                class="field__input"
                id="first-name"
                type="text"
                value={profile.firstName}
              />
            </div>
            {profile.lastName && (
              <div className="form__field field field--disabled">
                <label class="field__label" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  disabled
                  class="field__input"
                  id="last-name"
                  type="text"
                  value={profile.lastName}
                />
              </div>
            )}
          </div>
          <div class="form__field field field--disabled">
            <label class="field__label" htmlFor="email">
              Email
            </label>
            <input
              disabled
              class="field__input"
              id="email"
              type="email"
              autocomplete="email"
              value={profile.email}
            />
          </div>
          <button className="btn justify-center btn--primary" type="submit">
            {status === 'loading' ? 'Loading' : 'Edit'}
          </button>
        </form>
        <div className="form__footer">
          <button
            className="btn justify-center btn--secondary"
            onClick={logoutHandler}
          >
            {loading ? 'Loading' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
