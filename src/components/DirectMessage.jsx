import { useEffect, useState } from "react";
import styles from './chatContainer.module.css'
import axios from "axios";
const backendURL = import.meta.env.VITE_SERVER_URL

function DirectMessage({setNewChat, filteredContacts, search, setSearch, setDisplayedChat, userChats, user, setDisplayedChatId}) {
    const [error, setError] = useState(null);
    const directMessageChats = userChats.filter(chat => chat.directMsg === true);

    const findUserChat = (recipient) => {
        for (const chat of directMessageChats) {
            if (chat.members.some(member => member.id === recipient.id)) {
                return chat;
            }
        }
        return null;
    }


    async function handleFormSubmit(recipient) {
        const existingChat  = findUserChat(recipient)

        if (existingChat) {
            setDisplayedChat(existingChat);
            setDisplayedChatId(existingChat.id);
        } else {
            try {
                console.log('Triggering try loop')
                // Need to filter this so that the direct message can be found e.g. search through members
                const response = await axios.post(`${backendURL}/groups/create`, {
                    members: [user, recipient]
                });

                if (response.status === 201) { // Check for successful creation
                    const data = await response.json(); // Parse JSON data
                    setDisplayedChat(data.newGroup); // Assuming response contains the new group in 'newGroup'
                } else {
                    setError('Failed to create the chat.');
                }
            } catch (err) {
                setError('An error occurred when trying to create the chat.')
            }
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
                <div key={contact.id} onClick={() => handleFormSubmit(contact)}>
                    <img src={contact.photo} alt='contact photo' className={styles['contact-photo']} />
                    <p className={styles['contact-name']}>{contact.username}</p>                  
                </div>
            )))}                   
        </form>
    )
}

export default DirectMessage;
