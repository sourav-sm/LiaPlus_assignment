import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold hover:text-gray-200">
          Blog App
        </Link>
      </div>
      <div className="flex space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-200">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="font-semibold">{`Welcome, ${user.username}`}</span>
            <button
              onClick={handleLogout}
              className="hover:text-gray-200 underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
