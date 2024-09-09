import { useEffect, useState } from 'react';
import NavBar from './navbar';
import styles from './userprofile.module.css'
import useAuth from '../Authentification/useAuth';

function UserProfile() {
    // I want to import the navbar and footer I use from the Homepage into here
    const {user} = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (user) {
            setProfilePic(user.userPhoto);
            setUsername(user.username);
            setBio(user.bio);
        }
    }, [user])

    const [editProfilePic, setEditProfilePic] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const editLogo = "https://res.cloudinary.com/dmaq0peyx/image/upload/v1725869568/pngwing.com_t379lh.png";

    return (
        <>
            <NavBar />
            <div className={styles['userprofile-body']}>
                <div className={styles['userprofile-flexbox']}>
                    <h2>User Profile</h2>
                    {/*error && <h3>{error}</h3>*/}
                    {user && 
                    <>
                        <div className={styles['user-photo-container']}>
                            <img src={user.userPhoto} alt='user-photo' className={styles['user-photo']} draggable='false'></img>
                            <img src={editLogo} alt='Edit logo' className={styles['edit-logo-photo']} onClick={() => setEditProfilePic(!editProfilePic)} draggable='false'/>
                        </div>
                        <div className={styles['username-container']}>
                        {editUsername ?
                            <input 
                                type='text'
                                name='username'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            :
                            <h1 className={styles.username}>{user.username}</h1>
                            }
                            
                            <img src={editLogo} alt='Edit logo' className={styles['edit-logo']} onClick={() => setEditUsername(!editUsername)} draggable='false'/>
                        </div>
                        <div className={styles['bio-container']}>
                            {editBio ?
                            <textarea 
                                type='text'
                                name='bio'
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                            />
                            :
                            <h3>{user.bio}</h3>
                            }
                            <img src={editLogo} alt='Edit logo' className={styles['edit-logo']} onClick={() => setEditBio(!editBio)} draggable='false'/>
                        </div>
                        <h5>User Created: {user.createdAt}</h5>
                    </>}
                </div>
            </div>
        </>
    )
}

export default UserProfile;