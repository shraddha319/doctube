import './Form.scss';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth, useToast } from '../../contexts';
import { useState } from 'react';
import { editProfileRules, validate } from '../../validations';
import { updateUser, API } from '../../api';
import { Loader } from '../../components';

export default function EditProfile() {
  const {
    user: { profile },
    dispatchUser,
  } = useUser();
  const { dispatchToast } = useToast();
  const {
    auth: { status },
    dispatchAuth,
  } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
  });
  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const logoutHandler = () => {
    dispatchUser({ type: 'LOGOUT_USER' });
    dispatchAuth({ type: 'LOGOUT_AUTH' });
    localStorage.removeItem('authToken');
    delete API.defaults.headers.common['Authorization'];
    navigate('/');
  };

  const editProfileHandler = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    const validationError = validate(input, editProfileRules);
    setFormError({
      firstName: '',
      lastName: '',
      email: '',
      ...validationError,
    });

    if (Object.keys(validationError).length > 0) return;
    try {
      setLoading(true);
      const update = Object.keys(input).reduce((obj, key) => {
        if (input[key] !== profile[key] && (profile[key] || input[key]))
          obj[key] = input[key];
        return obj;
      }, {});
      if (Object.keys(update).length > 0) {
        const { status } = await updateUser(profile._id, update);
        if (status === 204) {
          dispatchUser({ type: 'UPDATE_PROFILE', payload: { update } });
          dispatchToast({
            type: 'TRIGGER_TOAST',
            payload: {
              type: 'success',
              body: `${profile.firstName}'s profile updated!`,
            },
          });
        }
      }
      setEditMode(false);
    } catch (error) {
      if (error?.response) {
        setFormError(
          error.response.data.error.errors.reduce(
            (errObj, { message, key, type }) => {
              return { ...errObj, [key]: message };
            },
            {}
          )
        );
      }
      dispatchToast({
        type: 'TRIGGER_TOAST',
        payload: {
          type: 'error',
          body: 'Profile update failed',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return status === 'loading' || !profile ? (
    <Loader />
  ) : (
    <div className="form--edit-profile layout--center">
      <div className="form__container">
        <div className="form__header flex--row">
          <p className="text text--md text--primary">Profile Settings</p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div
            className={`form__field field ${editMode ? '' : 'field--disabled'}`}
          >
            <label class="field__label" htmlFor="first-name">
              First Name
            </label>
            <input
              disabled={!editMode}
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
          <div
            className={`form__field field ${editMode ? '' : 'field--disabled'}`}
          >
            <label class="field__label" htmlFor="last-name">
              Last Name
            </label>
            <input
              disabled={!editMode}
              class="field__input"
              id="last-name"
              type="text"
              value={input.lastName}
              onChange={(e) => setInput({ ...input, lastName: e.target.value })}
            />
            <p className="field__error small">{formError.lastName}</p>
          </div>
          <button
            onClick={editProfileHandler}
            className="btn justify-center btn--primary"
            type="submit"
          >
            {loading ? 'Loading...' : editMode ? 'Save' : 'Edit'}
          </button>
        </form>
        <div className="form__footer">
          <button
            className="btn justify-center btn--secondary"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
