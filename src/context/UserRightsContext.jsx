import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from './AuthContext'; 

const UserRightsContext = createContext();

export const UserRightsProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [rights, setRights] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRights = async () => {
      if (user?.id) {
        try {
     
          const response = await fetch(`http://localhost:5000/api/rights/${user.id}`);
          const data = await response.json();
          
        
          const rightsMap = {};
          data.forEach(item => {
            rightsMap[item.module_right_code] = item.has_access === 1;
          });
          
          setRights(rightsMap);
        } catch (error) {
          console.error("Error fetching user rights:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRights();
  }, [user]);

  return (
    <UserRightsContext.Provider value={{ rights, loading }}>
      {children}
    </UserRightsContext.Provider>
  );
};

export const useRights = () => useContext(UserRightsContext);