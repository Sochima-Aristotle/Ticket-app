import React from 'react'
import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

function Home() {
  return (
    <>
     <section className="heading">
       <h1>What can we help you with?</h1>
       <p>Please select from the list</p>
    </section> 
    <Link to='new-ticket' className='btn btn-reverse btn-block'>
      <FaQuestionCircle /> Create a new ticket
    </Link>
    <Link to='new-ticket' className='btn btn-block'>
      <FaTicketAlt /> View My Ticket
    </Link>
      
    </>
  )
}

export default Home