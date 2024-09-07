import NavBar from './navbar';
import styles from './userprofile.module.css'

function UserProfile() {
    // I want to import the navbar and footer I use from the Homepage into here
    const user = {username:'default', createdAt: '07-09-2024', photo:null, bio: 'This will be the user bio.'}

    return (
        <>
            <NavBar />
            <div className={styles['userprofile-body']}>
                <h3>User Profile</h3>
                <div className={styles['user-photo-container']}>
                    <img src={user.photo} alt='user-photo' className={styles['user-photo']}></img>
                </div>
                <h1 className={styles.username}>{user.username}</h1>
                <h3>{user.bio}</h3>
                <h5>User Created: {user.createdAt}</h5>
            </div>
        </>
    )
}

export default UserProfile;