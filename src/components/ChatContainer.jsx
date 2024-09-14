import { useState, useEffect } from 'react';
import Chat from './Chat'; // Import your Chat component
import styles from './chatContainer.module.css'
import axios from 'axios';
import DirectMessage from './DirectMessage';

function ChatContainer({ user, displayedChat, setDisplayedChat, newChat, setNewChat, userChats }) {
    const [error, setError] = useState(false)
    const [search, setSearch] = useState('')
    const [contacts, setContacts] = useState([]) // Need id's names and photos

    const [filteredContacts, setFilteredContacts] = useState([]) // Need id's names and photos

    const [members, setMembers] = useState([])

    useEffect(() => {
        if (user.contacts) {
            setContacts(user.contacts);
            setFilteredContacts(user.contacts);
        }
    }, [user, newChat])

    useEffect(() =>{
        function filterContacts() {
            const trimmedSearch = search.trim();
            if (trimmedSearch === '') {
                setFilteredContacts(contacts); // Show all contacts if search is empty
            } else {
                const updatedContacts = contacts.filter(contact => 
                    contact.username.includes(trimmedSearch)
                );
                setFilteredContacts(updatedContacts);
            }
        }
        filterContacts()
    }, [search, contacts])

    return (
        <>
            {newChat ? (
                <DirectMessage setNewChat={setNewChat} serach={search} setSearch={setSearch} filteredContacts={filteredContacts} setDisplayedChat={setDisplayedChat}/>
            ) : (
                displayedChat && <Chat chat={displayedChat} user={user} />
            )}
        </>
    );
}

export default ChatContainer;
