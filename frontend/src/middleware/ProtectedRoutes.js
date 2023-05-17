import { Outlet, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import { useEffect } from "react";

const useAuth = () => {
    const session = JSON.parse(localStorage.getItem("loggedIn"));
    if (session && session.email.length > 0) {
        return true
    }
    return false
}

const ProtectedRoutes = () => {
    const isAuthorized = useAuth();
    console.log(isAuthorized)
    const navigate = useNavigate();
    useEffect(()=>{
        if (!isAuthorized){
            navigate("/", {replace:true})
        }
    },[navigate])
    return <Outlet />
}

export default ProtectedRoutes;