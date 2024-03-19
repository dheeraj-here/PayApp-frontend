import React from 'react'
import '../globals.css'

const Button = ({ name, onClick }) => {
    return (
        <div>
            <button onClick={onClick} className='hover:bg-gray-800 rounded-md mx-auto flex mt-5 bg-black text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline w-full flex items-center justify-center'>{name}</button>
        </div>
    )
}

export default Button;
