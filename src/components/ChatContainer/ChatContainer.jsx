import { useState, useEffect } from 'react';
import styles from './chatContainer.module.css'
import axios from 'axios';
import DirectMessage from './NewChat/DirectMessage/DirectMessage';
import DisplayedChat from './DisplayedChat/DisplayedChat';
import GroupMessage from './NewChat/GroupMessage/GroupMessage';

function ChatContainer({ user, displayedChat, setDisplayedChat, newChat, setNewChat, userChats, setDisplayedChatId, setUserChats, authorIdToPhotoURL, setAuthorIdToPhotoURL }) {
    const [search, setSearch] = useState('')
    const [contacts, setContacts] = useState([]) // Need id's names and photos
    const [newGroup, setNewGroup] = useState(false);
    const [newContact, setNewContact] = useState(false);

    const [filteredContacts, setFilteredContacts] = useState([]) // Need id's names and photos

    useEffect(() => {
        if (user.contacts) {
            const contactsWithSelection = user.contacts.map(contact => ({
                ...contact,
                selected: false // Initialize as not selected
            }));
            setContacts(contactsWithSelection);
            setFilteredContacts(contactsWithSelection);
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


    // Update the selected state for a contact
    function handleContactSelection(contactId) {
        const updatedContacts = contacts.map(contact => 
            contact.id === contactId ? { ...contact, selected: !contact.selected } : contact
        );
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
    }

    return (
        <>
            {newChat ? (
                newGroup ? (
                    <GroupMessage 
                        setNewChat={setNewChat}
                        search={search}
                        setSearch={setSearch}
                        filteredContacts={filteredContacts}
                        setDisplayedChat={setDisplayedChat}
                        userChats={userChats}
                        user={user}
                        setDisplayedChatId={setDisplayedChatId}
                        setUserChats={setUserChats}
                        setNewGroup={setNewGroup}
                        handleContactSelection={handleContactSelection}
                        contacts={contacts}
                        newContact={newContact}
                        setNewContact={setNewContact}
                    />
                ) : (
                    <DirectMessage 
                        setNewChat={setNewChat}
                        search={search}
                        setSearch={setSearch}
                        filteredContacts={filteredContacts}
                        setDisplayedChat={setDisplayedChat}
                        userChats={userChats}
                        user={user}
                        setDisplayedChatId={setDisplayedChatId}
                        setUserChats={setUserChats}
                        setNewGroup={setNewGroup}
                        newContact={newContact}
                        setNewContact={setNewContact}
                    />
                )
            ) : (
                displayedChat && <DisplayedChat displayedChat={displayedChat} user={user} authorIdToPhotoURL={authorIdToPhotoURL} setDisplayedChat={setDisplayedChat} setAuthorIdToPhotoURL={setAuthorIdToPhotoURL}/>
            )}
        </>
    );
}

export default ChatContainer;
