import './FetchConv.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function FetchConv({ conversationsFetched }) {

    const [convs, setConvs] = useState([]);
    const navigate = useNavigate();

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
                console.log(data);
                setConvs(data.result);
            } catch (error) {
                console.error('Erreur lors de la récuperation des discussions', error);
            }
        }
        fetchMsg();
    }, []);

    const getConv = async (receiverId) => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'application/json'
                }
            }
            const response = await fetch(`http://localhost:3000/api/get-user-conversation${receiverId}`, options);
            const data = await response.json();
            if (data.success === true) {
                conversationsFetched(data.result);
            }
        } catch (error) {
            console.error('Erreur lors de la récuperation de la conversation', error);
        }
    };
    return (
        <div className="conversations-container">
            {convs.map((conv) => (
                <div className="conv-user-container" key={conv.id} onClick={() => getConv(conv.user_id)}>
                    <div className="conv-user-img">
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