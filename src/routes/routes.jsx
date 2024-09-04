import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Home from "../Home";
import App from "../App"
import SignUp from "../components/SignUpForm";

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
    }
])

export default router