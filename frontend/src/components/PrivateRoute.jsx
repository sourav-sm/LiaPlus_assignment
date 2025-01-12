import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  return user && user.role === role ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
