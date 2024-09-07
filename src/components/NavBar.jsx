import messageIcon from '../assets/NavBar/messagingIcon.jpg'
import styles from './navbar.module.css'

function NavBar() {

    return (
        <div className={styles['navbar-body']}>
            <div className={styles['message-icon-container']}>
                <img src={messageIcon} alt='message logo' className={styles['message-logo']}/>
            </div>
            <div className={styles.links}>
                <a href='/home'>Messages</a>
                <div className={styles['profile-links']}>
                    <a href='/userprofile'>Profile</a>
                    <a href='/signout'>Sign Out</a>
                </div>
            </div>
        </div>
    )
}

export default NavBar;