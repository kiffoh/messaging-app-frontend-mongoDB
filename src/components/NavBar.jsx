import messageIcon from '../assets/NavBar/messagingIcon.jpg'
import styles from './navbar.module.css'
import useAuth from '../Authentification/useAuth';
import { useEffect, useState } from 'react';

function NavBar() {
    const {user} = useAuth();
    const [userId, setUserId] = useState(null);
    const [userPhoto, setUserPhoto] = useState('');
    const [profileLinks, setProfileLinks] = useState(false)

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            setUserPhoto(user.photo);
        }
    }, [user])

    return (
        <div className={styles['navbar-body']}>
            <div className={styles['message-icon-container']}>
                <img src={messageIcon} alt='message logo' className={styles['message-logo']} draggable='false' />
            </div>
            <div className={styles.links}>
                <a href='/'>Messages</a>
                <div className={styles['profile-container']}>
                    <div className={styles[(profileLinks? 'image-container-highlighted' : 'image-container')]}>
                        {userPhoto && <img src={user.photo} alt='User Photo' className={styles[(profileLinks? 'profile-picture-highlighted': 'profile-picture')]} onClick={() => setProfileLinks(!profileLinks)} draggable='false'/>}
                    </div>
                    {profileLinks && 
                        <>
                            <div className={styles['profile-links']}>
                                <a href={`/users/${userId}/profile`}>Profile</a>
                                <a href='/users/signout'>Sign Out</a>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar;