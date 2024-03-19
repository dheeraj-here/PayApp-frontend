import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Component/Input';
import Button from '../Component/Button';
import { useRecoilState } from 'recoil';
import { countAtom, currentUser } from '../store/atoms/count';

const Signup = () => {

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  // to update recoil atom of count
  const [count, setCount] = useRecoilState(countAtom);
  const [user, setUser] = useRecoilState(currentUser);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    setFormData({
      username: '',
      password: ""
    })
  }, [loading])

  const token = localStorage.getItem('payapptoken');

  const handleSignup = async () => {
    const { username, password } = formData;
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
      });

      if (!res.ok) {
        console.log("Error in res");
      }
      const result = await res.json();


      if (result.success) {
        localStorage.setItem('payapptoken', result.token);
        console.log("Logged in successfully", result?.user);
        setUser(result?.user)
        localStorage.setItem('currentUser', result?.user?._id);
        navigate('/', { state: { id: id } });
        window.location.reload();
      }
      setLoading(false)
    } catch (error) {
      console.error("Error in api", error);
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="text-center text-3xl font-bold m-2">Login</div>
      <div className="space-y-2">
        <Input type='text' value={formData.username} label='username' placeholder='Enter Name' onChange={handleChange} />
        <Input type='password' value={formData.password} label='password' placeholder='Enter Name' onChange={handleChange} />
        <Button onClick={handleSignup} name='Login'></Button>

        <hr class="border my-6 border-gray-300 rounded-full flex mx-auto" />

        <div className="flex items-center justify-center">
          <div className="text-base mr-1">Don't have an account </div>
          <div className="font-medium underline"><Link to='/signup'>Sign up</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Signup;