import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import { useAppSelector, useAppDispatch } from "../../hooks/authHooks";
// import { fetchUser } from "../../features/Users/SingleUserSLice";

interface JwtPayloadType extends JwtPayload {
    "cognito:groups"?: string[];
}

interface ProtectedRouteAdminProps {
    children?: React.ReactNode;
}

const ProtectedRouteAdmin: React.FC<ProtectedRouteAdminProps> = ({ children }) => {
    const [roleState, setRoleState] = useState<string | undefined>("");
    const location = useLocation();
    const token = localStorage.getItem("userToken");

    // const dispatch = useAppDispatch();
    // const { user } = useAppSelector((state) => state.user);
    // useEffect(() => {
    //     dispatch(fetchUser());
    //   }, [dispatch]);

    useEffect(() => {
        if (token) {
            const decodedData = jwtDecode<JwtPayloadType>(token);
            const role = decodedData["cognito:groups"]?.[0];
            setRoleState(role);
            console.log(role);
        }
    }, []);

    if (!token) return <Navigate to="/" />;

    // if (user[0].role === "ADMIN") {
    if (roleState?.includes("ADMINGroup")) {
        return children;
    }
    else {
        <Navigate to="/" state={{ from: location }} replace />
    }
};

export default ProtectedRouteAdmin;