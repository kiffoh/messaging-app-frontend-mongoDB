import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Home from "../Home";
import App from "../App"
import SignUp from "../components/SignUpForm";
import UserProfile from "../components/UserProfile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: (
            <Home />
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/userprofile',
        element: <UserProfile />
    }
])

export default router