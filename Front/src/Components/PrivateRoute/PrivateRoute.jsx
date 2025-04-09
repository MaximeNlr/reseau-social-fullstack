import { Navigate } from "react-router-dom";
import useUserAuth from "../UserAuth/UserAuth";

export default function PrivateRoute({ children }) {
    const isAuth = useUserAuth();

    if (isAuth == null) {
        return <p>Chargement...</p>
    }
    return isAuth ? children : <Navigate to="/register" />
}