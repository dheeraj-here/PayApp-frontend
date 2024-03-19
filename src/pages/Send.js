import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Input from '../Component/Input';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Send = () => {

    const token = localStorage.getItem('payapptoken')
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState();
    const navigate = useNavigate();
    const userId = localStorage.getItem('currentUser');

    const onChange = (e) => {
        const inputValue = e.target.value;

        //Check fot the valid value should have only two digit after decimal
        const isValidInput = /^\d*\.?\d{0,2}$/.test(inputValue);

        if(isValidInput){
            setAmount(inputValue)
        }
    }

    useEffect(() => {
        if (!userId) {
            navigate('/login');
          }
    }, [])

    const transferMoney = async () => {
        console.log('transfer', userId, id);

        try {
            const res = await fetch('http://localhost:5000/api/transferMoney', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    "from": userId,
                    "to": id,
                    "amount": amount
                }),
            })

            if(!res.ok){
                console.log("Error in res!");
            }
            const result = await res.json();

            if(result.success){
                console.log(result, 'Money transfered successfully!');
                navigate('/')
                window.location.reload();
            }
        }
        catch {
            console.log("Error in Transfer Api");
        }
    }
    const cardStyle = {
        width: '400px', // Set a fixed width for the square card
        height: '350px', // Set a fixed height for the square card
        // border: '2px solid #3f51b5',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
        marginTop: '50px',
        marginBottom: '300px'

    };


    return (
        <div className='flex items-center justify-center'>
            <Card style={cardStyle}>
                <CardContent>
                    <div className='flex items-center justify-center py-6 font-bold text-4xl'>
                        Send Money
                    </div>
                    <div className=' flex  mt-2 px-2 py-4 rounded-lg'>
                        <div className="bg-purple-300 w-12 h-12 flex items-center justify-center font-bold text-xl text-center font-semibold rounded-full">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xl font-semibold text-left flex items-center justify-center px-3">
                            {/* {elm.username} */} {name}
                        </div>
                    </div>
                    <div className="px-2 my-2">
                        <div className="font-medium mb-1">Amount (in Rs)</div>
                        <input value={amount} name='amount' type='number' onChange={onChange} className='w-full px-2 py-1 border rounded border-slate-200' placeholder='Enter Amount' />
                        <button onClick={transferMoney} className='bg-purple-400 w-full rounded-sm mx-auto flex items-center justify-center mt-2 hover:bg-purple-500 text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline'>Transfer Money</button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Send
