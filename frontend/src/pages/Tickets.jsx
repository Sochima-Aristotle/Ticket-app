import React, {useEffect} from 'react'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
    const {isLoading, tickets, isSuccess} = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTickets())
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    if(isLoading){
       return <Spinner />
    }
  return (
    <>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {/* {console.log(`${tickets} is the ticket you are looking for`)} */}
        {tickets.map((ticket)=>(
          <TicketItem key={ticket._id} ticket={ticket} />
          
        ))}
      </div>
      </>
  )
}

export default Tickets