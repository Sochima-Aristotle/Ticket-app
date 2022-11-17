import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


function NewTicket() {
    const {user} = useSelector((state)=> state.auth)
    const {isLoading, isSuccess, isError, message} = useSelector((state)=> state.tickets)
   

    const [name, ] = useState(user.name)
    const [email, ] = useState(user.email)
    const [product, setProduct] = useState("iPhone")
    const [description, setDescription] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    },[isError, isSuccess, navigate, dispatch, message])

    const onSubmit = e =>{
        e.preventDefault()
        console.log('object');
        dispatch(createTicket({product, description}))
    }
    if(isLoading){
        <Spinner />
    }
  return (
    <>
    <BackButton url="/login" />
        <section className="header">
        <h1>Please create new ticket</h1>
        <p>Please fill out the form below</p>
        </section>

        <section className="form">
            <div className="form-group">
                <label htmlFor="name">Customer Name</label>
                <input type="text" className="form-control" value={name} disabled/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Customer Email</label>
                <input type="text" className="form-control" value={email} disabled/>
            </div>
            
            <form onSubmit={onSubmit}>
            
             <div className="form-group">

             <label htmlFor="product">Product:</label>
             <select name="product" value={product} id="product" onChange={(e)=>{
                 setProduct(e.target.value)
             }}>
                 <option value="android">Android</option>
                 <option value="iPhone">iPhone</option>
                 <option value="macbook pro">macbook pro</option>
                 <option value="HP">HP</option>
                 <option value="Others">Others</option>
                 
             </select>
             </div>

             <div className="form-group">

             <label htmlFor="description">Description of the issue:</label>
            <textarea name="decription" id="description" value={description} cols="30" rows="10" className="form-control" placeholder='Description/message' onChange={(e) => setDescription(e.target.value)}></textarea>

            <div className="form-group" style={{paddingTop: '35px'}}>
                <button className="btn btn-block">Submit</button>
            </div>
             </div>
            </form>
        </section>
   
    </>
  )
}

export default NewTicket