import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
            setUser(data.results);
        } catch (error) {
            console.error('Erreur lors de la récuperation des infos utilisateur pour le header', error);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser: fetchUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
