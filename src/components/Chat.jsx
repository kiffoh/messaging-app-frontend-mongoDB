import { useEffect, useState } from 'react';
import styles from './chat.module.css'


function Chat({chat, user}) {
    const [profileInformation, setProfileInformation] = useState('select for contact info')

    useEffect(() => {
        setProfileInformation('select for contact info')
        setTimeout(() => {
            setProfileInformation(null)
        }, 3000)
    }, [chat])

    return (
        <div className={styles['chat-root']}>
            <div className={styles['chat-header']}>
                <img src={chat.photo} alt='chat photo' className={styles['chat-photo']}/>
                <div className={styles['chat-name-container']}>
                    <h2 className={styles['chat-name']}>{chat.name}</h2>
                    {profileInformation && <p className={styles['profile-info']}>{profileInformation}</p>}
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
        </div>
    )
}

export default Chat;
