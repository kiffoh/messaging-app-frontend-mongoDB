import { useEffect, useState } from 'react';
import styles from './displayedChat.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendURL = import.meta.env.VITE_SERVER_URL; 


function DisplayedChat({displayedChat, user, authorIdToPhotoURL}) {
    const [profileInformation, setProfileInformation] = useState('select for contact info');
    const [fadeOut, setFadeOut] = useState(false); // Added state for fading

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const [error, setError] = useState(null);

    async function sendMessage(event) {
        event.preventDefault();

        if (message.trim() === '') return;

        try {
            const response = await axios.post(`${backendURL}/messages/${displayedChat.id}`, {
                content: message,
                groupId: displayedChat.id,
                authorId: user.id
            });
    
            // Check if the response is successful
            if (response.status === 200) {
                // Handle successful response
                // Update delivered?
                console.log('Message sent successfully');
                // Clear or update state if needed
            } else {
                setError('An error occurred when trying to send the message.');
            }
        } catch (err) {
            // Log error for debugging purposes
            console.error('Error sending message:', err);
            setError('An unknown error occurred.');
        }
    }
    

    function displayGroupInfo() {
        if (displayedChat.members.length == 2) { // For direct message
            const reciepient = displayedChat.members.filter(member => member.id != user.id)[0]
            navigate(`/users/${reciepient.id}/profile`);
        } else { // For groupChats
            navigate(`/groups/${displayedChat.id}/profile`);
        }
    }

    useEffect(() => {
        setProfileInformation('select for contact info')
        setFadeOut(false); // Reset fade state
        const timer = setTimeout(() => {
            setFadeOut(true); // Trigger fade-out effect
            setTimeout(() => setProfileInformation(null), 1000)
        }, 3000); // Time before fading starts

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, [displayedChat])

    return (
        <div className={styles['chat-root']}>
            <div className={styles['chat-profile-container']} >
                <div className={styles['chat-header']} onClick={displayGroupInfo}>
                    <img src={displayedChat.photo} alt='chat photo' className={styles['chat-photo']} draggable='false' />
                    <div className={styles['chat-name-container']}>
                        <h2 className={styles['chat-name']}>{displayedChat.name}</h2>
                        {profileInformation && (
                            <p className={`${styles['profile-info']} ${fadeOut ? styles['fade-out'] : ''}`}>
                                {profileInformation}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles['chat-body']}>
                {displayedChat.messages.map(message => (
                    message.authorId === user.id ? 
                    <div key={message.id} className={styles['user-chat-container']}>
                        <div className={styles['user-chat']}>{message.content}</div>
                        <img src={authorIdToPhotoURL[message.authorId]} alt='user-photo' className={styles['user-photo']}/>
                    </div>
                    :
                    <div key={message.id} className={styles['responder-chat-container']}>
                        <img src={authorIdToPhotoURL[message.authorId]} alt='recipient-photo' className={styles['recipient-photo']}/>
                        <div className={styles['responder-chat']}>{message.content}</div>
                    </div>
                ))}
            </div>
            <div className={styles['messaging-container']}>
                <form onSubmit={sendMessage} className={styles['message-container']}>
                    <button type='button'>File</button>
                    <textarea
                        className={styles['message-box']}
                        name='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit' className={styles['send-btn']}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default DisplayedChat;
