import { useEffect, useState } from 'react'
import '../../global.css'
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css'
import '../../SignUpGlobalOverride.css'
import useAuth from '../../Authentification/useAuth';
const backendURL = import.meta.env.VITE_SERVER_URL;

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if ( !username.trim() || !password.trim()) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await fetch(`${backendURL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({username, password}),
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Response okay: ', data)
                
                const token = data.token;
                const user = data.user;
                // Store in local storage
                localStorage.setItem('token', token);

                const userId = user.id;
                // Navigate to the page where user can input bio, pic and ect.
                navigate(`/users/${userId}/profile`);
            }
        } catch (err) {
            console.log(err);
            setError('Sign Up failed. Please try again.')
        }
    }
    
    return (
    <>  
        <div className={styles['signup-body']}>
            <div className={styles["signup-form-container"]}>
                <div className={styles['signup-form-wrapper']}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={styles['title-div']}>
                            <h1 className={styles.title}>Sign Up</h1>
                        </div>
                        <div className={styles['input-div-container']}>
                            <div className={styles['input-div']}>
                                {error && <h3>{error}</h3>}
                                <div className={styles['username']}>
                                    <label className={styles['username-label']}
                                        htmlFor='username'
                                    >
                                        Username
                                    </label>
                                    <input 
                                        type='text'
                                        name='username'
                                        placeholder='Username'
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className={styles['password']}>
                                    <label className={styles['password-label']}
                                        htmlFor='password'
                                    >
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='*********'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles['btn-container']}>
                            <button type='submit' className={styles['signup-btn']}>Create Account</button>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    </>
  )
}

export default SignUp;
