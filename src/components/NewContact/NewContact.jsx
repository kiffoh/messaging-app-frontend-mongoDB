import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './newContact.module.css'
import useAuth from '../../Authentification/useAuth';

const backendURL = import.meta.env.VITE_SERVER_URL;

function NewContact({setNewChat, setNewContact, user}) {
    const {setUser} = useAuth();
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');

    const [allUsernames, setAllUsernames] = useState([]) // To check if username is in use
    const [filteredUsernames, setFilteredUsernames] = useState([])
    const [usernamesLoading, setUsernamesLoading] = useState(true);

    useEffect(() => {
        async function fetchAllUsernames() {
            try {
                const response = await axios.get(`${backendURL}/users/usernames`);
        
                if (response.status != 200) return setError('An error occurred when trying to fetch all usernames.');

                const userContactsId = new Set(user.contacts.map(user => user.id))
                const filteredUsernames = response.data
                                            .filter(username => username.id !== user.id)
                                            .filter(username => !userContactsId.has(username.id));
                const filteredUsernamesWithSelection = filteredUsernames.map(user => ({
                    ...user,
                    selected: false
                }))
                
                setAllUsernames(filteredUsernamesWithSelection); // Does not include current username for UI reasons        
                setFilteredUsernames(filteredUsernamesWithSelection);
            } catch (err) {
                console.log(err)
                return setError('An unknown error occurred when trying to fetch all usernames.')
            } finally {
                setUsernamesLoading(false);
            }
        }
        fetchAllUsernames();
    }, [user])


    useEffect(() =>{
        function filterUsernames() {
            const trimmedSearch = search.trim();
            if (trimmedSearch === '') {
                setFilteredUsernames(allUsernames); // Show all contacts if search is empty
            } else {
                const updatedUsers = allUsernames.filter(user => 
                    user.username.includes(trimmedSearch)
                );
                setFilteredUsernames(updatedUsers);
            }
        }
        filterUsernames()
    }, [search, allUsernames])


    // Update the selected state for a contact
    function handleUserSelection(contactId) {
        const updatedUsers = allUsernames.map(contact => 
            contact.id === contactId ? { ...contact, selected: !contact.selected } : contact
        );
        setAllUsernames(updatedUsers);
        setFilteredUsernames(updatedUsers);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false)
        }, 2000)

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, [error])

    async function handleAddContacts() {
        const selectedContacts = allUsernames
                                    .filter(user => user.selected === true)
                                    .map(user => user.id);

        if (selectedContacts.length === 0) return setError('Select contact to add.')

        try {
            const response = await axios.put(`${backendURL}/users/${user.id}/update-contacts`, {
                selectedContacts
            })

            if (response.status != 200) return setError('An error occurred when trying to fetch all usernames.');
            console.log(response)
            setUser(response.data)
        } catch (err) {
            console.log(err)
            return setError('An unknown error occurred when trying to fetch all usernames.')
        }
    }

    return (
        <div className={styles['new-contact-root']}>
            <div className={styles['new-contact-body']}>
                <h1 className={styles.title}>Add New Contact</h1>
                <div className={styles['search-container']}>
                    <button type='button' onClick={() => setNewContact(false)} className={styles['back-btn']}>
                        Back
                    </button>
                    <input 
                        type="text"
                        placeholder="Search contacts"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className={styles['cancel-btn-container']}>
                        <button 
                            type='button' 
                            onClick={() => {
                                setNewChat(false)
                                setNewContact(false)}
                            }
                            className={styles['cancel-btn']}>X</button>
                    </div>
                </div>
                {usernamesLoading && <h2 className={styles['usernames-loading']}>Loading the users...</h2>}
                <div className={styles['usernames-container']}>
                    {filteredUsernames.length === 0 ? (
                        <p className={styles['no-users-found']}>No users found</p>
                    ) : (
                        filteredUsernames.map(user => (
                        <div key={user.id} onClick={() => handleUserSelection(user.id)} className={styles['user-div']}>
                            <img src={user.photo} alt='user photo' className={styles['user-photo']} />
                            <p className={styles['user-name']}>{user.username}</p>
                            <div className={styles[user.selected ? "checkbox-highlighted" : "checkbox"]}></div>                 
                        </div>
                    )))}
                </div>
                {error && <h3 className={styles['error']}>{error}</h3>}
                <div>
                    <button onClick={handleAddContacts} className={styles['add-contacts-btn']}>Add Contacts</button>
                </div>
            </div>
        </div>
    )
}

export default NewContact;