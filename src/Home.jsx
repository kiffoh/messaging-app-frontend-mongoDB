import LogIn from "./components/LoginForm";
import styles from '../src/components/login.module.css'

function Home() {
    const user = false;

    return (
        (user ? (
            null
        ) : (
            <LogIn />
        ))
    )
}

export default Home;