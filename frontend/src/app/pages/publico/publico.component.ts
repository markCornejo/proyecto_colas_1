import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../classes/ticket';
import { WebsocketService } from '../../services/websocket.service';


@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {

  tickets: any = [];
  atepublicos: any = [Ticket, Ticket, Ticket, Ticket];

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('container');

    this.http.get('http://localhost:5000/publico').subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.ordernaAtencion();
    });

    this.wsService.listen('enviar-ticket-atendidos').subscribe( (tickets: Ticket) => {
      console.log('estoy en PublicoComponent ', tickets);
      this.tickets = tickets;
      this.ordernaAtencion();
    });

  }

  ordernaAtencion() {
    console.log("entrando a ordenar ", this.tickets);
    if(this.tickets.length){

      // const reversa = this.tickets.reverse();
      this.atepublicos = this.tickets.reverse();
      const index = 0;
      /*
      for (let i = 0; i < 4; i++) {
        ate  reserva[i]
      }
      */

    }

  }

}
