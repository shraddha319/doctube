import { useAuth } from '../contexts';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ path, ...props }) {
  const {
    auth: { token },
  } = useAuth();

  return token ? (
    <Route {...props} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
