import React from 'react'
import '../globals.css'
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../store/atoms/count';


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('payapptoken')
  const user = useRecoilValue(currentUser)

  const goToHome = () => {
    console.log(token);
    if (token == null) {
      navigate('/login');
    }
    navigate('/');
  }
  const goToProf = () => {
    console.log('Prof');
    if (token == null) {
      navigate('/login')
    }
    navigate('/profile');
  }

  return (
    <div className="">
      <div className=' max-w-[750px] px-5 mx-auto py-2  justify-between flex'>
        <div className="font-bold text-2xl cursor-pointer" onClick={goToHome}>PayApp</div>
        <div className="flex">
        {user ?
          <div className="text-base font-semibold my-2 mr-2">Hi, {user.username}</div>
          :
          <div className="text-base font-semibold my-2 mr-2 underline"><Link to='/login'>Sign in</Link></div>

        }
          <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-semibold rounded-full">
            U
          </div>
        </div>
      </div>
      <hr class="border border-black rounded-full flex mx-auto" />
    </div>
  )
}

export default Navbar
