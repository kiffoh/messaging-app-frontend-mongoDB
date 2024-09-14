import UserProfile from "../components/UserProfile";

const groupRoutes = [
    {
        path: ':userId/profile',
        element: <UserProfile group={true}/>
    }
]

export default groupRoutes;