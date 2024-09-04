import LogIn from "./components/LoginForm";
import styles from '../src/components/login.module.css'

function Home() {
    const user = false;

    return (
        (user ? (
            null
        ) : (
            <div className={styles["home-container"]}>
                <LogIn />
            </div>
        ))
    )
}

export default Home;