import './Message.css';
import { useState, useEffect } from 'react';
import NewMessage from '../../Components/NewMessage/NewMessage';
import NavSide from '../../Components/NavSide/NavSide';
import FetchConv from '../../Components/FetchConv/FetchConv';

export default function Message() {


    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessageDiv, setNewMessageDiv] = useState(false);
    const [conversationDiv, setConversationDiv] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [conversationsData, setConversationsData] = useState(null);

    const handleConversationsData = (data) => {
        setConversationsData(data);
    };

    const newMessage = () => {
        setNewMessageDiv(true);
    }

    const closeNewMessage = () => {
        setNewMessageDiv(false);
    }

    useEffect(() => {
        if (query.length === 0) {
            setUsers([]);
            return
        }
        const delay = setTimeout(async () => {
            setLoading(true);
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                }
                const response = await fetch(`http://localhost:3000/api/search-user?q=${encodeURIComponent(query)}`, options);
                const data = await response.json();
                setUsers(data.results);
            } catch (error) {
                console.error('Erreur lors de la récuperation des utilisateurs depuis la barre de recherche message', error)
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [query])

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setQuery(user.pseudo);
        setUsers([]);
        setNewMessageDiv(false);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: messageText,
                    receiver_id: selectedUser.id
                })
            }
            const response = await fetch('http://localhost:3000/api/create-message', options)
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur lors de l\envoie du messsage', error);
        }
    }
    return (
        <div className='message-container'>
            <div className="nav-container">
                <NavSide />
            </div>
            <div className='message-users-container'>
                <div className="message">
                    <div className="message-header">
                        <h2>Messages</h2>
                        <div className="new-message" onClick={newMessage}>
                            <img src="../../src/assets/icons/new-message-icon.png" alt="" />
                        </div>
                    </div>
                    <div className="search-input">
                        <img src="../../src/assets/icons/search-icon.png" alt="" />
                        <input
                            type="text"
                            placeholder='Chercher dans les messages'
                            onChange={e => setSearchContact(e.target.value)}
                        />
                    </div>
                    <FetchConv ConversationsFetched={handleConversationsData} />
                </div>
                {conversationsData && (
                    <div>
                        <p>salut</p>
                    </div>
                )}
                {selectedUser && (
                    <div className="conv-container">
                        <div className="conv-header">
                            <img src={`http://localhost:3000${selectedUser.profile_picture_url}`} alt="" />
                            <h3>{selectedUser.pseudo}</h3>
                        </div>
                        <div className="conv-component">
                            <NewMessage selectedUser={selectedUser} />
                        </div>
                        <div className="conv-inputs-container">
                            <div className="conv-inputs">
                                <form>
                                    <div className="conv-media-input">
                                        <img src="../../src/assets/icons/media-icon.png" alt="" />
                                    </div>
                                    <textarea
                                        name=""
                                        id=""
                                        placeholder='Nouveau message'
                                        onChange={e => setMessageText(e.target.value)}
                                    ></textarea>
                                    <img onClick={sendMessage} src="../../src/assets/icons/sent-icon.png" alt="" />
                                </form>
                            </div>
                        </div>
                    </div>

                )}
            </div>
            {newMessageDiv && (
                <div className="new-message-container">
                    <div className="new-message-div">
                        <div className="new-message-header">
                            <img src="../../src/assets/icons/cross-icon.png" alt="" onClick={closeNewMessage} />
                            <h2>Nouveau message</h2>
                        </div>
                        <div className="search-input">
                            <img src="../../src/assets/icons/search-icon.png" alt="" />
                            <input
                                type="text"
                                placeholder='Chercher un contact'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="search-container">
                            {loading && <p>chargement...</p>}
                            {!loading && users.length > 0 && (
                                <div className="search-results">
                                    {users.map((user) => (
                                        <div
                                            className='result-container'
                                            key={user.id} onClick={() => handleSelectUser(user)}
                                        >
                                            <img src={`http://localhost:3000${user.profile_picture_url}`} alt="" />
                                            {user.pseudo}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}