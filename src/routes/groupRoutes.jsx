import UserProfile from "../components/UserProfile/UserProfile";

const groupRoutes = [
    {
        path: ':userId/profile',
        element: <UserProfile group={true}/>
    }
]

export default groupRoutes;