import { useAppSelector } from "../hooks/authHooks";
import { Navigate, Route, useLocation } from "react-router-dom";

export enum ROLE {
    'Client' = "client",
    'Coach' = "coach",
    'Admin' = "admin"
}

const PrivateRoute: React.FC<{ children: React.ReactNode, roles: Array<ROLE> }> = ({ children, roles }) => {
    let location = useLocation();

    const {  loading, userInfo } = useAppSelector((state) => state.signup);

    if (loading) {
        return <p>Checking authenticaton..</p>;
    }

    const userHasRequiredRole = userInfo && roles.includes(userInfo.role) ? true : false;

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" state={{ from: location }} />;
    // }

    // if (isAuthenticated && !userHasRequiredRole) {
    //     // return <AccessDenied />;
    // }

    return children;
};

export default PrivateRoute;