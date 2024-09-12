import { useEffect, useState } from 'react'
import './global.css'
import NavBar from './components/navbar'
import styles from './app.module.css'
import useAuth from './Authentification/useAuth'
import Chat from './components/chat'
const backendURL = import.meta.env.VITE_SERVER_URL;

function App() {
  const [userChats, setUserChats] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  const [displayedChatId, setDisplayedChatId] = useState(null);
  const [displayedChat, setDisplayedChat] = useState(null);

  useEffect(() => {
    async function fetchUserMessages() {
      try {
        const response = await fetch(`${backendURL}/messages/${user.id}`);

        if (response.ok) {
          const data = await response.json()
          console.log(data)

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
    if (userChats.length && displayedChatId === null) setDisplayedChatId(userChats[0].id)

    const selectedChat = userChats.find(chat => chat.id === displayedChatId); // Filter by chat ID
    setDisplayedChat(selectedChat || null); // Avoid setting undefined
  
  }, [userChats, displayedChatId]);

  if (loading) return <h1>Loading... </h1>

  return (
    <div className={styles['app-root']}>
      <NavBar />
      <div className={styles['app-body']}>
        <div className={styles['chat-bar']}>
          <div className={styles['chat-title-container']}>
            <h2 className={styles['chat-title']}>Chats</h2>
            {error && <h3>{error}</h3>}
            <button onClick={() => newChat()}>New Chat</button>
          </div>
          {userChats.length > 0 && userChats.map((chat) => (
              <div 
                className={styles['user-chat']} 
                key={chat.id} 
                onClick={() => setDisplayedChatId(chat.id)}
              >
                <p className={styles['chat-name']}>{chat.name}</p>
                <p>{chat.messages[0].content || 'No messages yet'}</p>
              </div>  
          ))}
        </div>
        {displayedChat && <Chat chat={displayedChat} user={user} />}
      </div>
    </div>
  )
}

export default App
