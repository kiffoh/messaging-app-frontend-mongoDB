import { useState, useRef, useEffect } from 'react';
import styles from './displayedChat.module.css';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { RxUpdate } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import { useSocket } from '../socketContext/useSocket';
import formatDateTime from '../functions/formatTimeDate';

const backendURL = import.meta.env.VITE_SERVER_URL;


function Messages({ displayedChat, authorIdToPhotoURL, user, setDisplayedChat }) {
  const socket = useSocket();
  const [error, setError] = useState(false);
  const [userClick, setUserClick] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const chatBodyRef = useRef(null); // Ref for the chat-body container

  const clickedMessage = useRef(null);
  const [editMsg, setEditMsg] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState('');

  useEffect(() => {
    console.log(displayedChat)
  }, [displayedChat])

  const handleUserMessageClick = (event, message) => {
    event.stopPropagation(); // Stop click from propagating to parent

    const clientX = event.clientX;
    const clientY = event.clientY;

    // Get the position of the chat-body container relative to the viewport
    const chatBodyRect = chatBodyRef.current.getBoundingClientRect();

    // Adjust the position relative to the chat-body container
    const relativeX = clientX - chatBodyRect.left;
    const relativeY = clientY - chatBodyRect.top;

    setUserClick(true);
    clickedMessage.current = message;

    // Update the coordinates based on the click position relative to chat-body
    setCoords({ x: relativeX, y: relativeY });
  };

  const handleEditBtnClick = () => {
    setUserClick(false)
    setEditMsg(true);
    setUpdatedMessage(clickedMessage.current.content)
  }

  const handleUpdateMessage = async (event) => {
    event.preventDefault()

    if (clickedMessage.current.content === updatedMessage) return;

    if (updatedMessage.trim() === '') return setError('The message cannot be empty.');

    try {
        const response = await axios.put(`${backendURL}/messages/${displayedChat.id}/${clickedMessage.current.id}`, {
            content: updatedMessage
        })

        if (response.status === 200) {
            socket.emit('messageUpdated', response.data);
        }

        setEditMsg(false);

    } catch (err) {
        console.log(err)
        setError('An unknown error ocurred when trying to update the message.')
    }
  }

  const handleDeleteBtnClick = async () => {
      if (!clickedMessage.current) return setError('The message could not be deleted. Please try again.')
        
        setUserClick(false)
        
        try {
            const response = await axios.delete(`${backendURL}/messages/${displayedChat.id}/${clickedMessage.current.id}`)
            
            if (response.status === 200) {
              socket.emit('messageDeleted', clickedMessage.current.id)
            }
            
        } catch (err) {
            console.log(err)
            setError('An unknown error ocurred when trying to delete the message.')
        }
    }
    
    useEffect(() => {
      socket.on('messageUpdated', (updatedMessage) => {
        setDisplayedChat((prevChat) => ({
          ...prevChat,
          messages: prevChat.messages.map((msg) =>
            msg.id === updatedMessage.id ? updatedMessage : msg
          ),
        }));
      });
  
    
      socket.on('messageDeleted', (deletedMessageId) => {
        setDisplayedChat((prevChat) => ({
          ...prevChat,
          messages: prevChat.messages.filter((msg) => msg.id !== deletedMessageId),
        }));
      });  
  
      return () => {
      socket.off('messageUpdated');
      socket.off('messageDeleted');
      };
    }, [socket]);

    // Code for clicking on an image to enlarge it
    const [enlargeImage, setEnlargeImage] = useState(null);

    const handleImageClick = (event, url) => {
      event.stopPropagation()

      setEnlargeImage(url);
    };

  return (
    <>
    
      <div className={styles['chat-body']} ref={chatBodyRef} onClick={() => setUserClick(false)}>
        {enlargeImage && 
        <div className={styles['enlarged-image-container']} onClick={() => setEnlargeImage(null)}>
          <img src={enlargeImage} className={styles['enlarged-image']}></img>
        </div>}
        {error && <h3>{error}</h3>}
        {userClick && (
          <div
            className={`${styles['update-delete-container']} ${
              userClick ? styles['visible'] : styles['invisible']
            }`}
            style={{
              top: `${coords.y}px`,
              left: `${coords.x}px`,
              position: 'absolute',
            }}
          >
            <button className={styles['edit-btn']} onClick={handleEditBtnClick}>
              <FaEdit size={24}/>
            </button>
            <button className={styles['delete-btn']} onClick={handleDeleteBtnClick}>
              <MdDeleteForever size={24}/>
            </button>
          </div>
        )}
        {displayedChat.messages.map((message) => {
          const formattedDateTime = formatDateTime(message.updatedAt);

          return message.authorId === user.id ? (
            <div key={message.id} className={styles['user-chat-container']}>
              {editMsg && message.id === clickedMessage.current?.id ? (
                <form className={styles['update-message-form']} onSubmit={handleUpdateMessage}>
                  <button type='button' className={styles['cancel-message-btn']} onClick={() => setEditMsg(false)}>
                    <MdOutlineCancel size={24}/>
                  </button>
                  <button type='submit' className={styles['update-message-btn']}>
                    <RxUpdate size={24}/>
                  </button>
                  <div className={styles['user-chat']}>
                    {message.photoUrl && 
                    <img 
                      src={message.photoUrl} 
                      alt='User photo' 
                      className={styles['user-photo-message']}
                      onClick={(event) => handleImageClick(event, message.photoUrl)}>
                    </img>}
                    <textarea
                      className={styles['update-message-box']}
                      name='message'
                      value={updatedMessage}
                      onChange={(e) => setUpdatedMessage(e.target.value)}
                    />
                  </div>
                </form>
              ) : (
                <div
                  className={styles['user-chat']}
                  onClick={(event) => handleUserMessageClick(event, message)}
                >
                  {message.photoUrl && 
                  <img 
                  src={message.photoUrl} 
                  alt='User photo' 
                  className={styles['user-photo-message']}
                  onClick={(event) => handleImageClick(event, message.photoUrl)}>
                  </img>}
                  {message.content}
                  <div className={styles['user-message-timestamp']}>
                    {message.createdAt === message.updatedAt
                      ? `${formattedDateTime.time}, ${formattedDateTime.date}`
                      : `Edited ${formattedDateTime.time}, ${formattedDateTime.date}`}
                  </div>
                </div>
              )}
              <div className={styles['user-photo-container']}>
                <img
                  src={authorIdToPhotoURL[message.authorId]}
                  alt="user-photo"
                  className={styles['user-photo']}
                />
              </div>
            </div>
          ) : (
            <div key={message.id} className={styles['responder-chat-container']}>
              <div className={styles['user-photo-container']}>
                <img
                  src={authorIdToPhotoURL[message.authorId]}
                  alt="recipient-photo"
                  className={styles['recipient-photo']}
                />
              </div>
              <div className={styles['responder-chat']}>
                {message.photoUrl && 
                <img 
                  src={message.photoUrl} 
                  alt='Responder photo' 
                  className={styles['responder-photo-message']}
                  onClick={(event) => handleImageClick(event, message.photoUrl)}>
              </img>}
                {message.content}
                <div className={styles['responder-message-timestamp']}>
                    {message.createdAt === message.updatedAt
                      ? `${formattedDateTime.time}, ${formattedDateTime.date}`
                      : `Edited ${formattedDateTime.time}, ${formattedDateTime.date}`}
                  </div>
                </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Messages;