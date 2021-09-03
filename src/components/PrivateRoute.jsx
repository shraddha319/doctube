import { useAuth } from '../context';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ path, ...props }) {
  const {
    auth: { authToken },
  } = useAuth();

  return authToken ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  );
}
