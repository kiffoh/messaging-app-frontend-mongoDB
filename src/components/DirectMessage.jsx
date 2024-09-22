import { useEffect, useState } from "react";
import styles from './directMessage.module.css'
import axios from "axios";
const backendURL = import.meta.env.VITE_SERVER_URL;
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";

function DirectMessage({setNewChat, filteredContacts, search, setSearch, setDisplayedChat, userChats, user, setDisplayedChatId, setUserChats, setNewGroup, newContact, setNewContact}) {
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
        console.log(existingChat)

        if (existingChat) {
            setDisplayedChat(existingChat);
            setDisplayedChatId(existingChat.id);
        } else {
            try {
                const response = await axios.post(`${backendURL}/groups/createDirectMessage`, {
                    members: [user, recipient]
                });

                if (response.status === 200 || response.status === 201) {
                    console.log('GOING THROUGH RESPONSE')
                    const data = response.data.newGroup || response.data.existingGroup;
                    
                    setDisplayedChat(data);
                    setDisplayedChatId(data.id);
                    setUserChats(prevChats => [data, ...prevChats]);
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
        <div className={styles['direct-message-body']}>
            <form className={styles['direct-message-form']}>
                {error && <h3 className={styles['error']}>{error}</h3>}
                <div className={styles['search-container']}>
                    <button type='button' onClick={() => setNewGroup(true)} className={styles['new-group-btn']}>
                        <GrGroup size={24}/>
                    </button>
                    <input 
                        type="text"
                        placeholder="Search contacts"
                        className={styles['search-bar']}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className={styles['cancel-btn-container']}>
                        <button type='button' onClick={() => setNewChat(false)} className={styles['cancel-btn']}>X</button>
                    </div>
                </div>
                <div className={styles['contacts-container']}>
                    {filteredContacts.length === 0 ? (
                        <p className={styles['no-contacts-found']}>No contacts found</p>
                    ) : (
                    filteredContacts.map(contact => (
                        <div key={contact.id} onClick={() => handleFormSubmit(contact)} className={styles['contact-div']}>
                            <img src={contact.photo} alt='contact photo' className={styles['contact-photo']} draggable='false'/>
                            <p className={styles['contact-name']}>{contact.username}</p>                  
                        </div>
                    )))}                   
                </div>
                <div className={styles['add-contact-btn-container']}>
                    <button type="button" className={styles['add-contact-btn']} onClick={() => setNewContact(true)}>
                        <AiOutlineUserAdd size={24} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DirectMessage;
