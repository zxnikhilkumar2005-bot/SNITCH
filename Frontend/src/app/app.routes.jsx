import { createBrowserRouter, Navigate } from "react-router";
import AuthPage from "../features/auth/pages/AuthPage";


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
