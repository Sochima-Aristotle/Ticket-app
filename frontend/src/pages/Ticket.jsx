import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import {getNotes, createNote, reset as noteRest} from '../features/notes/noteSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPencilAlt } from 'react-icons/fa'
import NoteItem from '../components/NoteItem.jsx'


const customStyles = {
    content :{
        width: '600px',
        top: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        position : 'relative',
        transition: 'translate(-50%, -50%)'

    }
}

Modal.setAppElement('#root')
const Ticket = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state)=> state.tickets)
    const {notes, isLoading: noteIsLoading} = useSelector((state)=> state.notes)
    
    const dispatch = useDispatch()
    const param = useParams()
    const navigate = useNavigate()
    const {ticketId} = useParams()

    useEffect(()=>{
        if(isError){
            
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))


        // eslint-disable-next-line
    }, [ isError, message, ticketId])

    // close ticket
    const onTicketClose =e =>{
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
       }

    if(isLoading || noteIsLoading){
        return <Spinner />
    }
    if(isError){
        toast.error('Something went wrong')
    }


    // close/open modal 
    const openModal =()=> setModalIsOpen(true)
    const closeModal =()=> setModalIsOpen(false)
    const onNoteSubmit = (e) =>{
        e.preventDefault()
        dispatch(createNote({noteText}))
        closeModal()
    }
  return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                Ticket ID: {ticket._id}
                
                <span className={`status status-${ticket.status}`}>
                
                  {ticket.status}
                  
                  
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
            <h2>Notes:</h2>
        </header>
        
        <Modal openModal={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
            <h2>Add Notes</h2>
            <button className='btn-close' onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit} >
                <div className="form-group">
                    <textarea name="noteText" id="noteText" className='form-control' placeholder='Please add a note' value={noteText} onChange={(e)=> setNoteText(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type='submit'>Submit</button>
                </div>
            </form>
        </Modal>

        {ticket.status !== 'closed' &&(
            <button className='btn' onClick={openModal} ><FaPencilAlt /> Add Notes</button>
        )}
        {notes.map((note)=>(
            <NoteItem key={note._id} note={note} />
        ))}

        {ticket.status !== 'closed' &&(
            <button onClick={onTicketClose} className="btn btn-danger btn-block">Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket