import { useState } from 'react'
import '../global.css'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import storySetPic from '../assets/SignUp/Prototyping process-pana.png'
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
                // Navigate to the page where user can input bio, pic and ect.
                navigate(`/user/${userId}/account`);
            }
        } catch (err) {
            setError('Log in failed. Please try again.')
        }
    }
    
    return (
    <>  
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
                {/*
                    <div className={styles['storyset-div']}>
                        <img src={storySetPic} media="(min-width: 1024px)" alt="Sign Up Illustration" className={styles['storyset-pic']}/>
                        <a href="https://storyset.com/app" className={styles['storyset-link']} media="(min-width: 1024px)">App illustrations by Storyset</a>
                    </div>
                */}     
            </div>  
        </div>
        
    </>
  )
}

export default SignUp;
