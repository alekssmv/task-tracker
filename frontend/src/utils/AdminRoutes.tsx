import { Outlet, Navigate } from "react-router-dom";
import userStore from "../stores/UserStore";

const AdminRoutes = () => {

    if (userStore.getRoles() === "assignee" &&
        localStorage.getItem("access_token")) {
        return <Navigate to="/assignee" />
    }

    if (userStore.getRoles() === "admin" &&
        localStorage.getItem("access_token")) {
        return <Outlet />
    }

    return <Navigate to="/" />
};

export default AdminRoutes;