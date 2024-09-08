import messageIcon from '../assets/NavBar/messagingIcon.jpg'
import styles from './navbar.module.css'
import useAuth from '../Authentification/useAuth';
import { useEffect, useState } from 'react';

function NavBar() {
    const {user} = useAuth();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
        }
    }, [user])

    return (
        <div className={styles['navbar-body']}>
            <div className={styles['message-icon-container']}>
                <img src={messageIcon} alt='message logo' className={styles['message-logo']}/>
            </div>
            <div className={styles.links}>
                <a href='/'>Messages</a>
                <div className={styles['profile-links']}>
                    <a href={`/users/${userId}/profile`}>Profile</a>
                    <a href='/users/signout'>Sign Out</a>
                </div>
            </div>
        </div>
    )
}

export default NavBar;