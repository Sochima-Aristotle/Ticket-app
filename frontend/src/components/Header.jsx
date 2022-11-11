import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaHome, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
        const {user} = useSelector((state)=> {
            console.log(state, 'I am state')
       return  state.auth
        })
    

    console.log(user, 'this is a user');

    const onLogout = () =>{
        dispatch(login())
        dispatch(reset())

        navigate('/')
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
             
        </div>
        <ul>
           {!user ? (
             
                   <>
                   <li>
                   <Link to='/'>
                       <FaHome /> Home
                   </Link>
               </li>
               <li>
                   <Link to='/login'>
                       <FaSignInAlt /> Login
                   </Link>
               </li>
               <li>
                   <Link to='/register'>
                       <FaUser /> Register
                   </Link>
               </li>
        </>
           ): (
            <li>
                  <button className="btn" onClick={onLogout}>
                      <FaSignOutAlt /> Logout
                  </button>
              </li>
       
              )}
        </ul>
    </header>
  )
}

export default Header