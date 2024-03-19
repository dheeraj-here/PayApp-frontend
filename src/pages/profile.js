
import React, { useEffect, useState } from 'react'


const Profile = () => {
  const [data, setData] = useState(null);

  const token = localStorage.getItem('payapptoken');

  useEffect(() => {
    const fetchUserData = async (id) => {
      const token = localStorage.getItem('payapptoken');
      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setData(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error while fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [])

  return (
    <div className=''>
      profile
    </div>
  )
}

export default Profile;
