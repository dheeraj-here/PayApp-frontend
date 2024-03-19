import React, { useState, useEffect } from 'react'
import UserProfiles from '../Component/Users'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { useRecoilValue, useRecoilState } from 'recoil';
import { countAtom, currentUser } from '../store/atoms/count';


const Home = () => {
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("payapptoken")
    const myUser = localStorage.getItem('currentUser');

    const [data, setData] = useState(null);
    const navigate = useNavigate()

    // using recoil atom
    const count = useRecoilValue(countAtom);
    const [user, setUser] = useRecoilState(currentUser);

    const getUsers = async () => {
        // console.log("get data");
        try {
            fetch('http://localhost:5000/api/getUsers', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "currentUser": myUser,
                    "Authorization": token
                }
            }).then((res) => res.json())
                .then((result) => {
                    // console.log(result, "2345");
                    if (result.success) {
                        console.log(result.data, "get users result");
                        setData(result?.data)
                    }
                })
        } catch (error) {
            console.log("Error in getUser api: ", error);
        }
    }


    useEffect(() => {
        console.log(myUser, '1234');
        // if(myUser){
        //     setUser(myUser);
        // }
        getUsers()

    }, [myUser, refresh])

    useEffect(() => {
        setRefresh(!refresh)
    }, [])
    

    const send = (elm) => {
        console.log('Send to : ', elm);
        navigate(`/send?id=${elm._id}&name=${elm.username}`)
    }

    return (
        <div className="max-w-[700px] w-5/6  rounded-3xl mx-auto flex-wrap px-auto">
            
            <div className="my-4 p2 flex text-lg font-semibold ">
                <div className="">Your Balance: </div>
                <div className="ml-1 font-bold">₹{user ? user?.balance : 'Loading...'}</div>
            </div>
            <div className="max-w-[700px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-4">
                    <UserProfiles send={send} data={data} />
                </div>
            </div>
        </div >
    )
}

export default Home
