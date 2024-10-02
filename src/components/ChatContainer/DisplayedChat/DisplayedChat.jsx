import { useState, useEffect } from 'react';
import styles from './displayedChat.module.css'
import MessageInputForm from './MessageInputForm/MessageInputForm';
import Messages from './Messages/Messages';
import ProfileHeader from './ProfileHeader/ProfileHeader';


function DisplayedChat({displayedChat, user, authorIdToPhotoURL, setDisplayedChat}) {
    
    const [error, setError] = useState(null);

    useEffect(() => {

        const timer = setTimeout(() => {
            setError(null)
        }, 2000)

        return clearTimeout(timer)
    }, error)

    return (
        <div className={styles['chat-root']}>
            <ProfileHeader displayedChat={displayedChat} user={user} />
            <Messages displayedChat={displayedChat} user={user} authorIdToPhotoURL={authorIdToPhotoURL} setDisplayedChat={setDisplayedChat}/>
            {error && <h3>{error}</h3>}
            <MessageInputForm displayedChat={displayedChat} user={user} setError={setError} setDisplayedChat={setDisplayedChat}/>
        </div>
    )
}

export default DisplayedChat;
