import LogIn from "./components/LogIn/LoginForm";
import styles from '../src/components/LogIn/login.module.css'
import useAuth from './authentication/useAuth'
import App from "./App";

function Home() {
    const {user} = useAuth();

    return (
        (user ? (
            <App />
        ) : (
            <LogIn />
        ))
    )
}

export default Home;