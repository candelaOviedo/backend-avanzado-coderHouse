const Ticket = require('../models/Ticket');
const { v4: uuidv4 } = require('uuid');

const createTicket = async ({ amount, purchaser }) => {
  try {
    const code = uuidv4(); 

    const ticket = new Ticket({
      code,
      amount,
      purchaser
   
    });

    await ticket.save();
    return ticket;
  } catch (error) {
    throw new Error('Error creando el ticket: ' + error.message);
  }
};

module.exports = { createTicket };