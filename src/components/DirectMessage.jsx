import { useState } from "react";
import styles from './chatContainer.module.css'
import axios from "axios";
const backendURL = import.meta.env.VITE_SERVER_URL

function DirectMessage({setNewChat, filteredContacts, search, setSearch, setDisplayedChat, userChats}) {
    const [error, setError] = useState(null);

    async function handleFormSubmit(chatId) {
        

        try {
            // Need to filter this so that the direct message can be found e.g. search through members
            const response = await axios(`${backendURL}/messages/${chatId}`);
            if (response.ok) {
                const data = response.json()
                setDisplayedChat(data);
            }

        } catch (err) {
            setError('An error occurred when trying to create the chat.')
        }

        setNewChat(false);
    }

    return (
        <form>
            {error && <h3 className={styles['error']}>{error}</h3>}
            <button type='button'>New Group</button>
            <button type='button' onClick={() => setNewChat(false)}>X</button>
            <input 
                type="text"
                placeholder="Search contacts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredContacts.length === 0 ? (
                <p className={styles['no-contacts-found']}>No contacts found</p>
            ) : (
            filteredContacts.map(contact => (
                <div key={contact.id} onClick={() => handleFormSubmit(contact.id)}>
                    <img src={contact.photo} alt='contact photo' className={styles['contact-photo']} />
                    <p className={styles['contact-name']}>{contact.username}</p>                  
                </div>
            )))}                   
        </form>
    )
}

export default DirectMessage;
