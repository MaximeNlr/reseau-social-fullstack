import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'application/json'
                    },
                }
                const response = await fetch('http://localhost:3000/api/get-user-info', options);
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error('Erreur lors de la récuperation des infos utilisateur pour le header', error);
            }
        }
        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
