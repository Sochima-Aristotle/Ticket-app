import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Ticket = () => {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state)=> state.tickets)
    const dispatch = useDispatch()
    const param = useParams()
    const {ticketId} = useParams()

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
    }, [ticketId, isError, message, dispatch])
  return (
    <div>Ticket</div>
  )
}

export default Ticket