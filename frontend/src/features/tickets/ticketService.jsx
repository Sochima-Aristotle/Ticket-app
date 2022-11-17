import axios from "axios";


const API_URL = '/api/tickets/'

// create new ticket
const createTicket = async(ticketData, token) =>{
    config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, config, ticketData)
    return response.data
}
//Get user ticket
const getTickets = async( token) =>{
    config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, config)
    return response.data
}

// Get ticket 
const getTicket = async(ticketId, token) =>{
    config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + ticketId, config)
    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket
}

export default ticketService