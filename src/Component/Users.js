import React, { useEffect, useState } from 'react'
import '../globals.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '../Component/Button';




const Input = ({ data, send }) => {
    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState(data);

    const heandleSearch = (val) => {
        setSearch(val)
        if (val === "") {
            setFilteredList(data)
            return;
        }
        const list = data.filter((item) => item.username.toLowerCase().startsWith(val.toLowerCase()))
        setFilteredList(list)
    }

    useEffect(() => {
        setFilteredList(data);
    }, [data])


    return (
        <div className=''>
            <div className="font-semibold text-xl ml-1 my-4">Users</div>
            <div className="mb-8 px-2">
                <input   className="border-2 w-full border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:border-gray-300"
                type='text' value={search} onChange={(e) => heandleSearch(e.target.value)} placeholder='Search User...' />
            </div>
            {filteredList && filteredList.map((elm, i) => (
                <>
                    <div className=' flex justify-between mt-2 p-1 rounded-lg'>
                        <div className="flex">
                            <div className="bg-black text-white w-10 h-10 flex items-center justify-center text-center font-semibold rounded-full">
                                {elm.username.charAt(0).toUpperCase()}
                            </div>
                            <div key={i} className="text-medium font-medium text-left flex items-center justify-center px-3">
                                {elm.username}
                            </div>
                        </div>
                        <button onClick={() => send(elm)} className="bg-black text-white text-base font-semibold rounded-md h-9 hover:bg-gray-800 font-medium flex items-center justify-center px-8">Send</button>
                    </div>
                    <div className="mt-2 "><hr></hr></div>
                </>
            ))}

        </div>
    )
}

export default Input;