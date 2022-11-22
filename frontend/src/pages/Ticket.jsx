import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Ticket = () => {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state)=> state.tickets)
    
    const dispatch = useDispatch()
    const param = useParams()
    const navigate = useNavigate()
    const {ticketId} = useParams()

    useEffect(()=>{
        if(isError){
            
            toast.error(message)
        }
        dispatch(getTicket(ticketId))


        // eslint-disable-next-line
    }, [ isError, message, ticketId])

    // close ticket
    const onTicketClose =e =>{
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
       }

    if(isLoading){
        return <Spinner />
    }
    if(isError){
        toast.error('Something went wrong')
    }

  return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                Ticket ID: {ticket._id}
                
                <span className={`status status-${ticket.status}`}>
                
                  {ticket.status}
                   {/* {console.log(ticket.status)} */}
                  
                </span>
            </h2>
            <h2>  
                Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h2>
                <h2>
                    Product: {ticket.product}
                </h2>
            
            <hr />
            <div className="ticket-desc">
                <h3>Description of issue</h3>
                <p>{ticket.description}</p>
            </div>
        </header>
        {ticket.status !== 'closed' &&(
            <button onClick={onTicketClose} className="btn btn-danger btn-block">Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket