import { Outlet, Navigate } from "react-router-dom";
import userStore from "../stores/UserStore";

const AssigneeRoutes = () => {
    if (userStore.getRoles() === "assignee" && 
        localStorage.getItem("access_token")
    ) {
        return <Outlet />;
    }
    if (userStore.getRoles() === "admin" && 
        localStorage.getItem("access_token")
    ) {
        return <Navigate to="/admin" />;
    }

    return <Navigate to="/" />;
};

export default AssigneeRoutes;