import { useEffect, useState } from 'react'
import './global.css'
import NavBar from './components/navbar'
import styles from './app.module.css'
import useAuth from './Authentification/useAuth'
import axios from 'axios'
import ChatContainer from './components/ChatContainer'
const backendURL = import.meta.env.VITE_SERVER_URL;

function App() {
  const [userChats, setUserChats] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useAuth();

  const [displayedChatId, setDisplayedChatId] = useState(null);
  const [displayedChat, setDisplayedChat] = useState(null);
  const [newChat, setNewChat] = useState(false); // State to toggle between chat and form

  useEffect(() => {
    async function fetchUserMessages() {
      try {
        const response = await fetch(`${backendURL}/messages/${user.id}`);

        if (response.ok) {
          const data = await response.json()
          setUserChats(data);
        } else {
          setError("An error occurred when fetching the user's messages.")
        }
      } catch (err) {
        setError('An unknown error occurred.')
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchUserMessages();
  }, [user])

  useEffect(() => {
    if (userChats.length > 0 && displayedChatId === null) setDisplayedChatId(userChats.filter(chat => chat.messages.length > 0)[0].id)

    const selectedChat = userChats.find(chat => chat.id === displayedChatId); // Filter by chat ID
    setDisplayedChat(selectedChat || null); // Avoid setting undefined
  
  }, [userChats, displayedChatId]);

  useEffect(() => {
    async function updateUser() {
      if (!user || !user.id) return; // Check if user and user.id are available

      try {
        const response = await axios.get(`${backendURL}/users/${user.id}/profile`);
        if (response.status === 200) {
          const updatedUser = response.data;
          setUser(updatedUser);
        }
      } catch (err) {
          setError('An error occurred when updating the user.')
      }
    }
    if (user) updateUser();
  }, [])

  if (loading) return <h1>Loading... </h1>

  return (
    <div className={styles['app-root']}>
      <NavBar />
      <div className={styles['app-body']}>
        <div className={styles['chat-bar']}>
          <div className={styles['chat-title-container']}>
            <h2 className={styles['chat-title']}>Chats</h2>
            {error && <h3>{error}</h3>}
            <button onClick={() => setNewChat(true)}>New Chat</button>
          </div>
          <div className={styles['user-chats-container']}>
            {userChats.length > 0 ? (
              userChats
              .filter(chat => chat.messages.length > 0) // Filter out chats with no messages
              .map((chat) => (
                <div 
                  className={styles[displayedChatId === chat.id ? 'user-chat-highlighted' : 'user-chat']} 
                  key={chat.id} 
                  onClick={() => setDisplayedChatId(chat.id)}
                >
                  <p className={styles['chat-name']}>{chat.name}</p>
                  <p className={styles['last-chat-message']}>{chat.messages[0].content}</p> {/* Optional chaining */}
                </div>
              ))
            ) : (
              <p>No chats available</p>
            )}
          </div>
        </div>
        <ChatContainer
          user={user}
          displayedChat={displayedChat}
          setDisplayedChat={setDisplayedChat}
          newChat={newChat}
          setNewChat={setNewChat}
          userChats={userChats}
          setDisplayedChatId={setDisplayedChatId}
          setUserChats={setUserChats}
        />
      </div>
    </div>
  )
}

export default App
