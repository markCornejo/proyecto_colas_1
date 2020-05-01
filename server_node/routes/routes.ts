import {Router, Request, Response } from 'express';
import Server from '../classes/server';
import { TicketList } from '../classes/ticketList';

export const ticketLista = new TicketList();

export const router = Router();

router.get('/all', (req: Request, res: Response) => {
    res.json(ticketLista.getAll());
});

router.post('/generar-ticket', (req: Request, res: Response) => {
    
    const cod = req.body.cod;
    const escritorio = req.body.escritorio;
    const state = req.body.state;

    // guardar ticket generado
    ticketLista.add({cod, escritorio, state});

    console.log("estoy en el generar-ticket ", ticketLista.getListNuevos());

    const server = Server.instance;
    server.io.emit('enviar-generar-ticket', ticketLista.getListNuevos());

    res.json(ticketLista.getListNuevos());

});

router.post('/atender-ticket', (req: Request, res: Response) => {
    
    // Cambiar estado al ticket
    ticketLista.atender(req.body.cod);

    // emitir ticket atendidos;
    console.log("estoy en el POST atender-ticket ", ticketLista.getListNuevos());
    const server = Server.instance;
    server.io.emit('enviar-generar-ticket', ticketLista.getListNuevos());
    server.io.emit('enviar-ticket-atendidos', ticketLista.getListAtender());
    // server.io.emit('enviar-generar-ticket', ticketLista.getListNuevos());

    res.json(ticketLista.getListNuevos());

});

router.post('/publico', (req: Request, res: Response) => {
    
    // 

});

router.get('/publico', (req: Request, res: Response) => {
    // obtener lista de atencion
    res.json(ticketLista.getListAtender());
});

router.get('/atender-ticket', (req: Request, res: Response) => {
    // const server = Server.instance;
    // server.io.emit('enviar-ticket-atendidos', ticketlistaa.getListAtender());
    res.json(ticketLista.getListNuevos());
});



router.get('/mensajes',  (req: Request, res: Response) => {
    
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});


router.post('/mensajes',  (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;


    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id',  (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


export default router;