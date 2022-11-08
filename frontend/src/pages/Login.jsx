import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
    
  })

  const { email, password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()


 
  const {user, isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.auth
  )

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  }, [isSuccess, isError, user, message,dispatch, navigate])

 const onChange = e=>{
   setFormData((prevState)=> ({
     ...prevState,
     [e.target.name]: e.target.value
   }))
 }

 if(isLoading){
   return <Spinner />
 }

const onSubmit = e =>{
  e.preventDefault()

  const useData = {
      
      email,
      password
    }
    dispatch(login(useData))
   
      toast.success('Welcome Back')
    
}

  return (
    <>
      <section className="heading">
        <FaSignInAlt /> Login
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
         
          <div className="form-group">
            <input type="email"
              value={email} 
              name='email'
              onChange={onChange}
              id='email'
              placeholder='Please Enter an email' 
              required
              className="form-control" />
          </div>
          <div className="form-group">
            <input type="password"
              value={password} 
              name='password'
              onChange={onChange}
              id='password'
              placeholder='Please Enter a password' 
              required
              className="form-control" />
          </div>
          
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login