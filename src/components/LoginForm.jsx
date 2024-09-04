import { useState } from 'react'
import '../global.css'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import messageIcon from '../assets/LogIn/messagingIcon.jpg'
import messageIconCropped from '../assets/LogIn/messagingIconCropped.jpg'
import styles from './login.module.css'
import '../LogInGlobalOverride.css'


function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        try {
            const response = await fetch(`${backendURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({username, password}),
            })

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                // Store in local storage
                localStorage.setItem('token', token);

                const decodedToken = jwtDecode(token);
                navigate('/');
            }
        } catch (err) {
            setError('Log in failed. Please try again.')
        }
    }

    const navigateSignUp = () => {
        navigate('/signup');
    }

  return (
    <>
        <picture>
            <source srcSet={messageIconCropped} media="(max-width: 426px)" />
            <img src={messageIcon} className={styles['message-logo']} alt="logo messaging"></img>
        </picture>
        <div className={styles["login-form-container"]}>
            <h1 className={styles.title}>Log In</h1>
            {error && <h3>{error}</h3>}
            <form onSubmit={handleFormSubmit}>
                <input 
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='*********'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className={styles['btn-container']}>
                    <button onClick={navigateSignUp} className={styles['signup-btn']}>Sign Up</button>
                    <button type='submit' className={styles['login-btn']}>Log In</button>
                </div>
            </form>       
        </div>
    </>
  )
}

export default LogIn;
