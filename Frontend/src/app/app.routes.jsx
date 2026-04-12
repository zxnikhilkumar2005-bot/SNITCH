import { createBrowserRouter, Navigate } from "react-router";
import AuthPage from "../features/auth/pages/AuthPage";
// import Register from "../features/auth/pages/Register";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>hello world</h1>
    },
    {
        path: "/auth",
        element: <AuthPage />
    },
    {
        path: "/register",
        element: <Navigate to="/auth" replace />
    }
])
