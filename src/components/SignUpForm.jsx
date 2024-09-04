import { useState } from 'react'
import '../global.css'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import messageIcon from '../assets/SignUp/messageIcon.jpg'
import styles from './signup.module.css'
import '../SignUpGlobalOverride.css'

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        try {
            const response = await fetch(`${backendURL}/signup`, {
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

  return (
    <>
        <div className={styles["signup-form-container"]}>
            <form onSubmit={handleFormSubmit}>
                <h1 className={styles.title}>Sign Up</h1>
                <div className={styles['input-div']}>
                    {error && <h3>{error}</h3>}
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
                </div>
                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['signup-btn']}>Create Account</button>
                </div>
            </form>       
        </div>
    </>
  )
}

export default SignUp;
