import styles from './navbar.module.css'
import useAuth from '../../authentication/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const messageIcon =  'https://res.cloudinary.com/dmaq0peyx/image/upload/v1727879837/messagingIcon_zjw84l.webp'

function NavBar({toggleDisplayChange}) {
    const {user} = useAuth();
    const [userId, setUserId] = useState(null);
    const [userPhoto, setUserPhoto] = useState('');
    const [profileLinks, setProfileLinks] = useState(false)
    const navigate = useNavigate();

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
                <p className={styles['messages']} onClick={() => {
                    navigate('/');
                    toggleDisplayChange();
                }}>Messages</p>
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