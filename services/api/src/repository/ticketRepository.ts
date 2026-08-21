import type{Ticket}from'../domain/ticket.js';export interface TicketRepository{list():Promise<Ticket[]>;get(id:string):Promise<Ticket|undefined>;save(ticket:Ticket):Promise<Ticket>}
