import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../classes/ticket';
import { Escritorio } from '../../classes/escritorio';
import { WebsocketService } from '../../services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit {

  ticket: Ticket[] = [];
  // escritorios: string[];

  cod: string;
  escritorio: number;

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // this.generar();
    // const escritorios = new Escritorio();
    // this.escritorios = escritorios.cod;

  }

  generar() {

    const escritorioid = Number(Math.round(Math.random() * 3));
    // this.ticket.push({cod: this.makeid(4), escritorio: escritorioid});
    this.cod = this.makeid(4);
    this.escritorio = escritorioid;

    // console.log(this.ticket);
    // this.wsService.emit('generar-ticket', {cod: this.cod, escritorio:  this.escritorio, state: 0});

    // Guardar lo generado
    // tslint:disable-next-line: max-line-length
    this.http.post('http://localhost:5000/generar-ticket', {cod: this.cod, escritorio:  this.escritorio, state: 0}).subscribe((tickets: Ticket[]) => {
       // console.log('respuesta ', tickets);
    });

  }


  makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}
