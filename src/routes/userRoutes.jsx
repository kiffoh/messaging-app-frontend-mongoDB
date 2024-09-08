import LogIn from "../components/LoginForm";
import UserProfile from "../components/UserProfile";
import SignUp from '../components/SignUpForm';

const userRoutes = [
    {
        path: 'login',
        element: <LogIn />
    },
    {
        path: 'signup',
        element: <SignUp />
    },
    {
        path: ':userId/profile',
        element: <UserProfile />
    }
]

export default userRoutes;