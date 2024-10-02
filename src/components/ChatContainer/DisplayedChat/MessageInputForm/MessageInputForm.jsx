import styles from '../displayedChat.module.css'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MdAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { useSocket } from '../../../../socketContext/useSocket';

const backendURL = import.meta.env.VITE_SERVER_URL;

function MessageInputForm({displayedChat, user, setDisplayedChat, setError}) {
    const socket = useSocket();
    const [message, setMessage] = useState('');
    
    async function sendMessage(event) {
        event.preventDefault();

        if (message.trim() === '' && file === null) return setError('Please provide a valid message.')

        try {
            const formData = new FormData();
            if (message) {
                formData.append('content', message);
            }
            formData.append('groupId', displayedChat.id);
            formData.append('authorId', user.id);

            if (file) {
                formData.append('photoUrl', file); // Append the file only if one is selected
            }

            const response = await axios.post(`${backendURL}/messages/${displayedChat.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Check if the response is successful
            if (response.status === 201 || response.status === 200) {
                // Handle successful response
                socket.emit("newMessage", response.data)
                setMessage('');
                setFile(null);
            } else {
                setError('An error occurred when trying to send the message.');
            }
        } catch (err) {
            // Log error for debugging purposes
            console.error('Error sending message:', err);
            setError('An unknown error occurred.');
        }
    }

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            setDisplayedChat((prevChat) => ({
                ...prevChat,
                messages: [newMessage, ...prevChat.messages], // Ensure you're appending the new message correctly
            }));
        });
    
        return () => {
            socket.off("newMessage"); // Clean up listener when component unmounts
        };
    }, [socket]);    

    /* Code for sending files */
    const [file, setFile] = useState(null); // State to store the selected file
    const fileInputRef = useRef(null);

    const handleFileInputClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input when button is clicked
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Set the selected file in state
        }
    };


    return (
        <div className={styles['messaging-container']}>
            <form onSubmit={sendMessage} className={styles['message-container']}>
                <div className={styles['attach-btn-container']}>
                    <button 
                     type='button'
                     className={styles['attach-btn']}
                     onClick={handleFileInputClick}
                    >
                        <MdAttachFile size={24}/>
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef} // Reference to the file input
                        style={{ display: 'none' }} // Hide it visually
                        onChange={handleFileChange} // Trigger when a file is selected
                    />

                    {/* Display selected file name */}
                    {file && (
                        <div className={styles['file-info']}>
                            <p>Selected file: {file.name}</p>
                        </div>
                    )}
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