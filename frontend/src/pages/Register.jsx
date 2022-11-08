import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

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

const onSubmit = e =>{
  e.preventDefault()

  if(password !==password2){

    toast.error('Please check the password')

  }else{

    const useData = {
      name,
      email,
      password
    }
    dispatch(register(useData))
    toast.success('Great! You just registered')

  }
}

if(isLoading){
  return <Spinner />
}

  return (
    <>
      <section className="heading">
        <FaUser /> Register 
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text"
              value={name} 
              name='name'
              onChange={onChange}
              id='name'
              placeholder='Please Enter a name' 
              required
              className="form-control" />
          </div>
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
            <input type="password2"
              value={password2} 
              name='password2'
              onChange={onChange}
              id='password2'
              placeholder='Confirm password' 
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

export default Register
