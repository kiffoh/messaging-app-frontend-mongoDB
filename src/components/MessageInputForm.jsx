import styles from './displayedChat.module.css'
import { useState } from 'react';
import axios from 'axios';
import { MdAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const backendURL = import.meta.env.VITE_SERVER_URL;

function MessageInputForm({displayedChat, user}) {

    const [message, setMessage] = useState('');
    
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

    return (
        <div className={styles['messaging-container']}>
            <form onSubmit={sendMessage} className={styles['message-container']}>
                <div className={styles['attach-btn-container']}>
                    <button type='button' className={styles['attach-btn']}>
                        <MdAttachFile size={24}/>
                    </button>
                </div>
                <textarea
                    className={styles['message-box']}
                    name='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className={styles['send-btn-container']}>
                    <button type='submit' className={styles['send-btn']}>
                        <IoIosSend size={24}/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInputForm;