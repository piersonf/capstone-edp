import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Import the hook created earlier

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    // check if ID exists in local storage
    const cachedLogin = localStorage.getItem('user_id');
    if (!auth?.user && !cachedLogin) {
        // Redirect them to the login page, but save the current location they were trying to go to after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;