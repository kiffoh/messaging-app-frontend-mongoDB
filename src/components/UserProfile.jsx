import { useEffect, useState } from 'react';
import NavBar from './navbar';
import styles from './userprofile.module.css'
import useAuth from '../Authentification/useAuth';

function UserProfile() {
    // I want to import the navbar and footer I use from the Homepage into here
    const {user} = useAuth();
    
    return (
        <>
            <NavBar />
            <div className={styles['userprofile-body']}>
                <h2>User Profile</h2>
                {/*error && <h3>{error}</h3>*/}
                <div className={styles['user-photo-container']}>
                    <img src={user.userPhoto} alt='user-photo' className={styles['user-photo']}></img>
                </div>
                <h1 className={styles.username}>{user.username}</h1>
                <h3>{user.bio}</h3>
                <h5>User Created: {user.createdAt}</h5>
            </div>
        </>
    )
}

export default UserProfile;