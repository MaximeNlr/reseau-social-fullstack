import "./UserConversation.css";
import { useState, useEffect, useContext } from 'react';
import { useUser } from '../UserContext/UserContext';

export default function UserConversation({ selectedUser }) {

    const { user } = useUser();
    const userInfo = Array.isArray(user) && user.length > 0 ? user[0] : null;

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-type': 'application/json' },
                };
                const response = await fetch(`http://localhost:3000/api/get-messages/${selectedUser.id}`, options);
                const data = await response.json();
                setMessages(data.results);
            } catch (error) {
                console.error('Erreur lors de la récuperation messsages', error);
            }
        };
        fetchMessages();
    }, []);

    const deleteMessage = async (messageId) => {
        try {
            const options = {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' }
            };
            const response = await fetch(`http://localhost:3000/api/delete-message/${messageId}`, options);
            const data = await response.json();
            setMessages((prevMessages) => prevMessages.filter(message => message.id !== messageId));
        } catch (error) {
            console.error('Erreur lors de la suppréssion du message', error)
        }
    };

    const deleteMessageClick = (e, messageId) => {
        e.stopPropagation();
        deleteMessage(messageId);
    };

    return (
        <div className="conv-component-container">
            {messages.map((message) => (
                <div className={`msg-container ${message.sender_id === userInfo.id ? 'sent' : 'received'}`}
                    key={message.id}>
                    <p>{message.text}</p>
                    {message.sender_id === userInfo.id && (
                        <div className="message-option-icon-container" onClick={(e) => deleteMessageClick(e, message.id)}>
                            <img className="option-icon" src="../../src/assets/icons/option-icon.png" alt="icon options" />
                            <div className="message-options-container"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}