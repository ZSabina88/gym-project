import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/authHooks";
import { fetchUser } from "../../features/Users/SingleUser/SingleUserAction"; 


interface ProtectedRouteAdminProps {
    children?: React.ReactNode;
}

const ProtectedRouteAdmin: React.FC<ProtectedRouteAdminProps> = ({ children }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    if (user && user.role === "ADMIN") {
        return children;
    }
    else {
        <Navigate to="/" state={{ from: location }} replace />
    }
};

export default ProtectedRouteAdmin;