import './MsgList.css';
import { useEffect, useState } from "react";

export default function MsgList({ conversationsFetched, onSelectUser }) {

    const [convs, setConvs] = useState([]);

    useEffect(() => {
        const fetchMsg = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-type': 'application/json' }
                }
                const response = await fetch('http://localhost:3000/api/get-conversations', options)
                const data = await response.json();
                setConvs(data.results);
            } catch (error) {
                console.error('Erreur lors de la récuperation des discussions', error);
            }
        }
        fetchMsg();
    }, []);
    return (
        <div className="conversations-container">
            {convs.map((conv) => (
                <div
                    className="conv-user-container"
                    key={conv.id}
                    onClick={() => {
                        const user = {
                            id: conv.user_id,
                            pseudo: conv.pseudo,
                            profile_picture_url: conv.profile_picture_url
                        };
                        onSelectUser(user);
                    }}

                >                    <div className="conv-user-img">
                        <img src={`http://localhost:3000${conv.profile_picture_url}`} alt="" />
                    </div>
                    <div className="conv-user-text">
                        <h3>{conv.pseudo}</h3>
                        <p>{conv.last_message}</p>
                    </div>
                </div>
            ))
            }
        </div >
    )
}