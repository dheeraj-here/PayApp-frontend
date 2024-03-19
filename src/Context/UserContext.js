import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState();
  const token = localStorage.getItem('payapptoken')

  const getCurrentUser = async() => {
    try{
      const res = await fetch('http://localhost:5000/api/profile/65e826cffb1fa6c2de2da579', {
        method: 'GET',
        headers: {
          
          'Authorization': token,
        }
      });
      
      if(!res.ok){
        console.log('Error in res!', res);
      }

      const result = res.json();
      if(result.success){
        setUserData(result.user);
        console.log("Current user is: ", result.user);
      }
    }
    catch(err){
      console.log("Error in fetching getUser api: ", err);
    }
  }

  // useEffect( () => {
  //   // Save to local storage when userId changes
  //   if (userId !== null) {
  //     localStorage.setItem('currentUser', JSON.stringify(userId));
  //     getCurrentUser();
  //   } else {
  //     // If userId is null, you may want to remove the item from local storage
  //     localStorage.removeItem('currentUser');
  //   }
  // }, [userId]);
  
  // To load userId from local storage when the component mounts
  // useEffect(() => {
  //   const storedUserId = localStorage.getItem('currentUser');
  //   if (storedUserId !== null) {
  //     setUserId(JSON.parse(storedUserId));
  //   }
  // }, []);

  const value = {
    userId,
    setUserId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
