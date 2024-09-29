import { useEffect, useRef, useState } from 'react';
import NavBar from './navbar';
import styles from './userprofile.module.css'
import useAuth from '../Authentification/useAuth';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import nameGroup from '../functions/nameGroup';
import { useNavigate } from 'react-router-dom';
import PhotoUpload from './PhotoUpload';
import { string } from 'prop-types';
const backendURL = import.meta.env.VITE_SERVER_URL;
const editLogo = import.meta.env.VITE_EDIT_LOGO;



function UserProfile({group}) {
    // I want to import the navbar and footer I use from the Homepage into here
    const {user, setUser} = useAuth();
    const {userId} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [chatData, setChatData] = useState(null);
    const [combinedGroupName, setCombinedGroupName] = useState('')

    const [canEdit, setCanEdit] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    let currentProfilePic = useRef('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState(''); // For UI logic, 
    const [bio, setBio] = useState('');

    
    const [allUsernames, setAllUsernames] = useState([]) // To check if username is in use
    const [filteredUsernames, setFilteredUsernames] = useState([])
    const [usernamesLoading, setUsernamesLoading] = useState(true);

    useEffect(() => {
        async function fetchAllUsernames() {
            try {
                const response = await axios.get(`${backendURL}/users/usernames`);
        
                if (response.status != 200) return setError('An error occurred when trying to fetch all usernames.');
                
                setAllUsernames(response.data.filter(user => user.id !== parseInt(userId))); // Does not include current username for UI reasons        
            } catch (err) {
                return setError('An unknown error occurred when trying to fetch all usernames.')
            } finally {
                setUsernamesLoading(false);
            }
        }
        fetchAllUsernames();
    }, [])

    useEffect(() =>{
        function filterUsernames() {
            if (!username) return;

            const trimmedSearch = username.trim();
            if (trimmedSearch === '') {
                setFilteredUsernames(allUsernames); // Show all contacts if search is empty
            } else {
                const updatedUsernames = allUsernames.filter(user => 
                    user.username.includes(trimmedSearch)
                );
                setFilteredUsernames(updatedUsernames);
            }
        }
        filterUsernames()
    }, [username, allUsernames])

    useEffect(() => {
        function editingPrivileges() {
            if (!user || !chatData) return;

            if (group) {
                const groupAdminIds = chatData.admins.map(admin => admin.id);
                if (groupAdminIds.includes(user.id)) setCanEdit(true);
            } else {
                if (parseInt(userId) === user.id) setCanEdit(true);
            }
        } 
        editingPrivileges()
    }, [user, chatData, userId, group])
    

    useEffect(() => {
        async function fetchUserProfile() {
            if (user && parseInt(userId) === user.id) {
                setChatData(user)
            } 
            else {
                try {
                    const response = await axios.get(`${backendURL}/${group ? 'groups': 'users'}/${userId}/profile`);
                    
                    if (response.status != 200) return setError('An error occurred when fetching the profile.') 
                    
                    setChatData(response.data)
                    
                    setProfilePic(response.data.photo);
                    currentProfilePic.current = response.data.photo;
                    setUsername(response.data.username);
                    setName(response.data.name || response.data.username);
                    setBio(response.data.bio);

                    if (group) {
                        setCombinedGroupName(nameGroup(response.data.members))
                    }
                } catch (error) {
                    setError('An unknown error occurred')
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchUserProfile();

    }, [user, userId, group])

    useEffect(() => {
        if (!chatData) return;
        
        if (group && chatData.name !== combinedGroupName) setUsername(chatData.name); // Triggers if the group name is user selected (e.g. not the default, combinedGroupName is the default) 
    }, [chatData, combinedGroupName, group])

    const [editProfilePic, setEditProfilePic] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editBio, setEditBio] = useState(false);

    function cancelEdit() {
        if (editProfilePic) {
            setProfilePic(chatData.photo);
            setEditProfilePic(false);
        }
        if (editUsername) {
            if (group && chatData.name !== combinedGroupName) { // Triggers if the group name is user selected (e.g. not the default, combinedGroupName is the default) 
                setUsername(chatData.name)
            } else { // Triggers for user profiles and default group names
                setUsername(chatData.username);
            }    
            setEditUsername(false);
        }
        if (editBio) {
            setBio(chatData.bio);
            setEditBio(false)
        }
    }

    async function saveEdit() {
        setError(null);  // Clear previous error messages

        try {
            let data = {};
            
            if (editUsername) {
                if (username === undefined || username.trim() === "") return setError("Username cannot be empty.");
                const currentName = group ? chatData.name : chatData.username;
                if (currentName !== username ) {

                    const usernameTaken = filteredUsernames.some((user) => user.username === username);

                    if (usernameTaken) return setError('Username is taken.');

                    data.username = username;
                    group ? setChatData(current => ({ ...current, name: username })) : setChatData(current => ({ ...current, username: username }));
                }
            }

            if (editProfilePic) {
                if (profilePic === "") return setError("Profile picture cannot be empty.");
                if (chatData.photo !== profilePic) {
                    data.photo = profilePic;
                    setChatData(current => ({ ...current, photo: profilePic }));
                }
            }

            if (editBio) {
                if (bio.trim() === "") return setError("Bio cannot be empty.");
                if (chatData.bio !== bio) {
                    data.bio = bio;
                    setChatData(current => ({ ...current, bio: bio }));
                }
            }

            
            if (Object.keys(data).length != 0) {
                console.log(data)
                const response = await axios.put(`${backendURL}/${group ? 'groups': 'users'}/${userId}/profile`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Important for file uploads
                    }
                });
                
                if (response.status != 200) return setError('An error occurred when trying to update the profile.');
    
                setChatData(response.data)
                setUser(response.data)
                
                setProfilePic(response.data.photo);
                currentProfilePic.current = response.data.photo;
                setUsername(response.data.username);
                setName(response.data.name || response.data.username);
                setBio(response.data.bio);
    
                if (group) {
                    setCombinedGroupName(nameGroup(response.data.members))
                }
            }

            // Reset all edit flags after processing
            setEditProfilePic(false);
            setEditBio(false);
            setEditUsername(false);
        } catch (err) {
            console.log(err)
            setError('An unknown error occurred when trying to update the profile.')
        }
    }

    async function deleteProfile() {
        if (!window.confirm(`Are you sure you want to delete this ${group ? 'group' : 'profile'}?`)) {
            return;
        }
    
        try {
            const response = await axios.delete(`${backendURL}/${group ? 'groups': 'users'}/${userId}/profile`, {
                user
            })
            if (response.status != 200) return setError('An error occurred when trying to delete the profile.');
        
            navigate("/")
        } catch (err) {
            setError('An unknown error occurred when trying to delete the profile.')
        }
        
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false)
        }, 2000)

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, [error])

    if (loading) return <h1>Fetching profile data...</h1>

    return (
        <>
            <NavBar />
            <div className={styles['userprofile-body']}>
                <div className={styles['userprofile-flexbox']}>
                    <h2>{group ? 'Group' : 'User'} Profile</h2>
                    {error && <h3>{error}</h3>}
                    {chatData && 
                    <div className={styles['profile-container']}>
                        <div className={styles['user-photo-container']}>
                            {editProfilePic ? (
                            <div className={styles['edit-photo-container']}>
                                <img src={currentProfilePic.current} alt='user-photo' className={styles['user-photo']} draggable='false'></img>
                                <PhotoUpload file={profilePic} setFile={setProfilePic} className={styles.profile}/>
                            </div>
                            ) : (
                            <>
                                <img src={profilePic} alt='user-photo' className={styles['user-photo']} draggable='false'></img>
                                {canEdit && 
                                    <img
                                        src={editLogo}
                                        alt='Edit logo'
                                        className={styles['edit-logo-photo']}
                                        onClick={() => setEditProfilePic(!editProfilePic)}
                                        draggable='false'
                                    />}
                            </>
                            )}
                        </div>

                        <div className={styles['username-container']}>
                            {editUsername ? 
                                <>
                                    <input 
                                        type='text'
                                        name='username'
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder={name}
                                    />
                                    <div className={styles['username-search']}>
                                        {!group && usernamesLoading ? (
                                            <p className={styles['username-loading']}>Loading usernames...</p>
                                        ) : (
                                            !group && (
                                                filteredUsernames.length > 0 &&
                                                <>
                                                    <p className={styles['current-usernames-title']}>Usernames in use:</p>
                                                    {filteredUsernames.map(currentUser => (
                                                        <p key={currentUser.id} className={styles['current-username']}>{currentUser.username}</p>
                                                    ))}
                                                </>   
                                            )
                                        )} 
                                    </div>
                                </>
                                : (
                                    <>
                                        <h1 className={styles.username}>{group ? username || name : username}</h1> 
                                        {// Username is initially undefined for groups, but becomes defined once edited
                                        canEdit && 
                                            <img
                                                src={editLogo}
                                                alt='Edit logo'
                                                className={styles['edit-logo']}
                                                onClick={() => setEditUsername(!editUsername)}
                                                draggable='false'
                                            />}
                                    </>
                                )
                            }
                        </div>
                        
                        {group && chatData.name !== combinedGroupName && ( // Displays group members if they group name is not the default (a combination of the member's names)
                            <h2 className={styles['combined-group-name']}>{combinedGroupName}</h2>
                        )}

                        <div className={styles['bio-container']}>
                            {editBio ? (
                            <textarea 
                                type='text'
                                name='bio'
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                            />
                            ) : (
                            <>
                                <h3>{bio}</h3>
                                {canEdit && 
                                    <img
                                        src={editLogo}
                                        alt='Edit logo'
                                        className={styles['edit-logo']}
                                        onClick={() => setEditBio(!editBio)}
                                        draggable='false'
                                    />}
                            </>)}
                        </div>
                        <h5>{group ? 'Group' : 'User'} Created: {chatData.createdAtTime}, {chatData.createdAtDate}</h5>
                    </div>}
                    {(editProfilePic || editUsername || editBio) && (
                        <div className={styles['btns-container']}>
                            <div className={styles['edit-btns-container']}>
                                <button type='button' className={styles['cancel-edit']} onClick={cancelEdit}>Cancel</button>
                                <button type='button' className={styles['save-edit']} onClick={saveEdit}>Save</button>
                            </div>
                            <div className={styles['delete-btn-container']}>
                                <button type='button' className={styles['delete-profile']} onClick={deleteProfile}>Delete {group? 'group' : 'profile'}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserProfile;