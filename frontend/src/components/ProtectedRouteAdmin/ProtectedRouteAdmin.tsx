// import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/authHooks";
// import { jwtDecode, JwtPayload } from "jwt-decode";

// interface JwtPayloadType extends JwtPayload {
//     "cognito:groups"?: string[];
// }

interface ProtectedRouteAdminProps {
    children?: React.ReactNode;
}

const ProtectedRouteAdmin: React.FC<ProtectedRouteAdminProps> = ({ children }) => {
    // const [roleState, setRoleState] = useState<string | undefined>("");
    // const token = localStorage.getItem("userToken");
    const location = useLocation();
    const {users} = useAppSelector((state)=> state.users);
    console.log(users[0].role);
    

    // useEffect(() => {
    //     if (token) {
    //         const decodedData = jwtDecode<JwtPayloadType>(token);
    //         const role = decodedData["cognito:groups"]?.[0];
    //         setRoleState(role);
    //         console.log(role);
    //     }
    // }, []);

    // if (role == "") return <Navigate to="/" />;

    // if (role) {
        return children;
    // }
    // else {
    //     <Navigate to="/" state={{ from: location }} replace />
    // }
};

export default ProtectedRouteAdmin;