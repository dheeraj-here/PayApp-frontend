import React, { useEffect, useState } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Input from '../Component/Input';
import Button from '../Component/Button';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        balance: null,
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'balance' ? parseFloat(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }))
    }

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            balance: null,
            password: '',
        });
    };

    useEffect(() => {
        resetForm();
    }, [loading])

    const handleSignup = async () => {
        const { username, email, balance, password } = formData;
        console.log(formData);
        try {
            setLoading(true)
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "balance": balance,
                    "password": password
                }),
            });

            if (!res.ok) {
                console.log("Error in res");
            }

            const result = await res.json();
            localStorage.setItem('payapptoken', result.token);

            console.log("Result", result);
            if (result.success) {
                console.log("User created: ", result);
                localStorage.setItem('currentUser', result?.user?._id)

                navigate('/');
                window.location.reload();
            }

            setLoading(false)
        } catch (error) {
            console.error("Error in api", error);
            setLoading(false)
        }
    }

    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-center text-3xl font-bold m-2">Sign Up</div>
            <div className="space-y-2">
                <Input type='text' value={formData.username} label='username' placeholder='Enter Name' onChange={handleChange} />
                <Input type='email' value={formData.email} label='email' placeholder='Enter Email' onChange={handleChange} />
                <Input type='number' value={formData.balance} label='balance' placeholder='Enter balance' onChange={handleChange} />
                <Input type='password' value={formData.password} label='password' placeholder='Enter Password' onChange={handleChange} />

            </div>
            {/* <button onClick={handleSignup} className="bg-blue-500 rounded-full mx-auto flex mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign up
            </button> */}
            <Button onClick={handleSignup} name="Sign Up"></Button>
            <hr class="border my-4 border-gray-300 rounded-full flex mx-auto" />

            <div className="flex items-center justify-center">
                <div className="text-base mr-1">Already have an account </div>
                <div className="font-medium underline"><Link to='/login'>Sign in</Link></div>
            </div>

        </div>
    )
}

export default Signup
