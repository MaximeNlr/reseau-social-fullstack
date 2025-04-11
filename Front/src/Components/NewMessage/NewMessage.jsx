import "./NewMessage.css";
import { useState, useEffect, useContext } from 'react';
import { useUser } from '../UserContext/UserContext';

export default function NewMessage({ selectedUser }) {

    const user = useUser();

    const [messages, setmessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-type': 'application/json' },
                };
                const response = await fetch(`http://localhost:3000/api/get-messages${selectedUser.id}`, options);
                const data = await response.json();
                console.log('fetch messages', data);
                setmessages(data.results);

            } catch (error) {
                console.error('Erreur lors de la récuperation messsages', error);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="conv-component-container">
            {messages.map((message) => (
                <div className={`msg-container ${message.sender_id === user[0].id ? 'sent' : 'received'}`}
                    key={message.id}>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    )
}