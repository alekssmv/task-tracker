import { Navigate, Outlet } from "react-router-dom";
import userStore from "../stores/UserStore";

const NotAuthRoutes = () => {
    console.log(userStore.getRoles(), "NotAuthRoutes");
    if (userStore.getRoles() === "assignee" &&
        localStorage.getItem("access_token")
    ) {
        return <Navigate to="/assignee" />;
    }
    if (userStore.getRoles() === "admin" &&
        localStorage.getItem("access_token")) {
        return <Navigate to="/admin" />;
    }
    return <Outlet />
};

export default NotAuthRoutes;