import LogIn from "./components/LoginForm";
import styles from '../src/components/login.module.css'
import useAuth from './Authentification/useAuth'
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