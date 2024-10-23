import { useEffect, useState } from 'react'
import '../../global.css'
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css'
import '../../SignUpGlobalOverride.css'
import useAuth from '../../authentication/useAuth';
import axios from 'axios';
const backendURL = import.meta.env.VITE_SERVER_URL;

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
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
            setErrors({ general: 'Username and password are required.' });
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/users/signup`, {
                username,
                password
            })

            if (response.status === 201) {
                const data = response.data;
                console.log('Response okay: ', data)
                
                const token = data.token;
                const user = data.user;
                // Store in local storage
                localStorage.setItem('token', token);

                const userId = user.id;
                // Navigate to the page where user can input bio, pic and ect.
                navigate(`/users/${userId}/profile`);
            }
        } catch (error) {
            if (error.response) {
                // Handle validation errors (status 400)
                if (error.response.status === 400) {
                    const validationErrors = error.response.data.errors;
                    if (validationErrors) {
                        // Convert array of errors to object keyed by field name
                        const errorObject = validationErrors.reduce((acc, curr) => ({
                            ...acc,
                            [curr.field]: curr.message
                        }), {});
                        setErrors(errorObject);
                    }
                }
                // Handle username already exists (status 409)
                else if (error.response.status === 409) {
                    setErrors({
                        username: error.response.data.message
                    });
                }
                // Handle other server errors
                else {
                    setErrors({
                        general: error.response.data.message || 'An error occurred during signup'
                    });
                }
            } else {
                setErrors({
                    general: 'Unable to connect to the server'
                });
            }
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
                            <p className={`${styles['error']} ${styles['general']} ${errors.general ? styles['show'] : ''}`}>{errors.general ? errors.general : ''}</p>
                        </div>
                        <div className={styles['input-div-container']}>
                            <div className={styles['input-div']}>
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
                            <p className={`${styles['error']} ${styles['username']} ${errors.username ? styles['show'] : ''}`}>{errors.username ? errors.username : ''}</p>
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
