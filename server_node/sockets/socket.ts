import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { TicketList } from "../classes/ticketList";

export const ticketLista = new TicketList();

export const desconectar = (cliente: Socket) => {
    
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    
}

// Escuchar mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });

}


// Escuchar generar ticket nuevos o no atendidos
export const generarTicket = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('generar-ticket', (payload) => {
        
        console.log('Ticket Generado', payload);

        // guardar ticket generado
        ticketLista.add(payload);
        
        // emitir ticket generado
        io.emit('enviar-generar-ticket', ticketLista.getListNuevos());

    });

}

// Escuchar atender ticket
export const atenderTicket = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('atender-ticket', (cod) => {
        
        console.log('Atendiendo Ticket', cod);

        // Cambiar estado al ticket
        ticketLista.atender(cod);

        // emitir ticket atendidos;
        io.emit('enviar-ticket-atendidos', ticketLista.getListAtender());
        
    });

}

