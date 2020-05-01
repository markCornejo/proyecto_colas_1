import { Ticket } from './ticket';

export class TicketList {

    private ticket: Ticket[] =[]

    constructor() {

    }

    // Agregar un ticket
    public add( ticket: Ticket ) {
        this.ticket.push( ticket );
        return ticket;
    }
    
    // Atender, se modidica el estado a 1
    public atender(cod: string) {
        console.log(this.ticket, cod);
        for(const i in this.ticket) {
            if(this.ticket[i].cod == cod) {
                this.ticket[i].state = 1;
                break;
            }
        }
    }

    public getAll() {
        return this.ticket;
    }

    // Enviar lista no atendidas
    public getListNuevos() {
        return this.ticket.filter(ticket => ticket.state === 0);
        // return this.ticket;
    }
    
    // Enviar listas antendidas
    public getListAtender() {
        return this.ticket.filter(ticket => ticket.state === 1);
    }

}