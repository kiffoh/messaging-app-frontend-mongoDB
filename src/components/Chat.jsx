import { useEffect, useState } from 'react';
import styles from './chat.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendURL = import.meta.env.VITE_SERVER_URL; 


function Chat({chat, user}) {
    const [profileInformation, setProfileInformation] = useState('select for contact info');
    const [fadeOut, setFadeOut] = useState(false); // Added state for fading

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const [error, setError] = useState(null);

    async function sendMessage(event) {
        event.preventDefault();

        if (message.trim() === '') return;

        try {
            const response = await axios.post(`${backendURL}/messages/${chat.id}`, {
                content: message,
                groupId: chat.id,
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
        if (chat.members.length == 2) { // For direct message
            const reciepient = chat.members.filter(member => member.id != user.id)[0]
            navigate(`/users/${reciepient.id}/profile`);
        } else { // For groupChats
            navigate(`/groups/${chat.id}/profile`);
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
    }, [chat])

    return (
        <div className={styles['chat-root']}>
            <div className={styles['chat-profile-container']} >
                <div className={styles['chat-header']} onClick={displayGroupInfo}>
                    <img src={chat.photo} alt='chat photo' className={styles['chat-photo']} draggable='false' />
                    <div className={styles['chat-name-container']}>
                        <h2 className={styles['chat-name']}>{chat.name}</h2>
                        {profileInformation && (
                            <p className={`${styles['profile-info']} ${fadeOut ? styles['fade-out'] : ''}`}>
                                {profileInformation}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles['chat-body']}>
                {chat.messages.map(message => (
                    <div 
                        key={message.id}
                        className={styles[message.authorId === user.id ? 'user-chat-container' : 'responder-chat-container']}
                    >
                        <div
                            className={styles[message.authorId === user.id ? 'user-chat' : 'responder-chat']}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles['messaging-container']}>
                <form onSubmit={sendMessage}>
                    <input 
                        type='text'
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

export default Chat;
