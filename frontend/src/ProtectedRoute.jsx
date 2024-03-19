import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const {loading, isAuthenticated} = useAuth();
    console.log(loading, isAuthenticated);

    if (loading) return 
    <div className="flex h-screen items-center justify-center">
        <h1>Loading...</h1>
    </div>

    if (!loading && !isAuthenticated) return <Navigate to= '/login' replace/>
  
    return (
        <Outlet />
  )
}

export default ProtectedRoutes;