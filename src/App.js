import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Header from './Component/Header';
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import Send from './pages/Send'
import { useRecoilState } from 'recoil';
import { currentUser } from './store/atoms/count';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useRecoilState(currentUser);
  const storedUserId = localStorage.getItem('currentUser');
  const token = localStorage.getItem('payapptoken')

  const fetchUserDetailsById = async(id) => {
    try{
      const res = await fetch(`http://localhost:5000/api/profile/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });

      if(!res.ok){
        console.log("Error get profile api");
      }
      const result = await res.json();
      if(result.success){
        console.log(result, 'result of get profile');
        setUser(result.user)
      }
    }
    catch(err) {
      console.log(err, "catch error in ...");
    }
  }

  useEffect(() => {
    console.log('re-render');
    if (storedUserId) {
      fetchUserDetailsById(storedUserId)
    }
  }, [setUser]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/send" element={<Send />} />

      </Routes>
    </Router>
  );
}

export default App;