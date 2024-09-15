import { useEffect, useState } from 'react';
import NavBar from './navbar';
import styles from './userprofile.module.css'
import useAuth from '../Authentification/useAuth';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import nameGroup from '../function/nameGroup';
const backendURL = import.meta.env.VITE_SERVER_URL;


function UserProfile({group}) {
    // I want to import the navbar and footer I use from the Homepage into here
    const {user} = useAuth();
    const {userId} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [chatData, setChatData] = useState(null);
    const [combinedGroupName, setCombinedGroupName] = useState('')

    const [canEdit, setCanEdit] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

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
                    setChatData(response.data)
                    
                    setProfilePic(response.data.photo);
                    setUsername(response.data.username);
                    setBio(response.data.bio);

                    if (group) setCombinedGroupName(nameGroup(response.data.members))
                } catch (error) {
                    setError('An unknown error occured')
                    console.error('Error fetching data:', error);
                  }
            }
        }
        fetchUserProfile();

    }, [user, userId])

    const [editProfilePic, setEditProfilePic] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const editLogo = "https://res.cloudinary.com/dmaq0peyx/image/upload/v1725869568/pngwing.com_t379lh.png";

    return (
        <>
            <NavBar />
            <div className={styles['userprofile-body']}>
                <div className={styles['userprofile-flexbox']}>
                    <h2>{group ? 'Group' : 'User'} Profile</h2>
                    {error && <h3>{error}</h3>}
                    {chatData && 
                    <>
                        <div className={styles['user-photo-container']}>
                            <img src={chatData.photo} alt='user-photo' className={styles['user-photo']} draggable='false'></img>
                            {canEdit && 
                                <img
                                    src={editLogo}
                                    alt='Edit logo'
                                    className={styles['edit-logo-photo']}
                                    onClick={() => setEditProfilePic(!editProfilePic)}
                                    draggable='false'
                                />}
                        </div>
                        <div className={styles['username-container']}>
                            {editUsername ?
                                <input 
                                    type='text'
                                    name='username'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                : (
                                    <h1 className={styles.username}>{group ? chatData.name : chatData.username}</h1>
                                )
                            }
                            {canEdit && 
                                <img
                                    src={editLogo}
                                    alt='Edit logo'
                                    className={styles['edit-logo']}
                                    onClick={() => setEditUsername(!editUsername)}
                                    draggable='false'
                                />}
                        </div>
                        {group && chatData.name !== combinedGroupName && (
                            <h2 className={styles['combined-group-name']}>{combinedGroupName}</h2>
                        )}
                        <div className={styles['bio-container']}>
                            {editBio ?
                            <textarea 
                                type='text'
                                name='bio'
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                            />
                            :
                            <h3>{chatData.bio}</h3>
                            }
                            {canEdit && 
                                <img
                                    src={editLogo}
                                    alt='Edit logo'
                                    className={styles['edit-logo']}
                                    onClick={() => setEditBio(!editBio)}
                                    draggable='false'
                                />}
                        </div>
                        <h5>{group ? 'Group' : 'User'} Created: {chatData.createdAtTime}, {chatData.createdAtDate}</h5>
                    </>}
                </div>
            </div>
        </>
    )
}

export default UserProfile;