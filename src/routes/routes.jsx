import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Home from "../Home";
import { AuthProvider } from "../Authentification/AuthContext";
import userRoutes from './userRoutes'
import UserLayout from "../layouts/UserLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: (<AuthProvider>
                    <Home />
                </AuthProvider>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/users',
        element: (<AuthProvider>
                    <UserLayout />
                </AuthProvider>
        ),
        children: userRoutes,
    }
])

export default router