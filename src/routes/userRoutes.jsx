import LogIn from "../components/LoginForm";
import UserProfile from "../components/UserProfile";
import SignUp from '../components/SignUpForm';
import SignOut from "../components/SignOut";

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
        element: <UserProfile group={false}/>
    },
    {
        path: 'signout',
        element: <SignOut />
    }
]

export default userRoutes;