import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../classes/ticket';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit {

  tickets: any;

  escritorio: number;
  cod: string;

  constructor(
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {

    this.http.get('http://localhost:5000/atender-ticket').subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
    });

    this.wsService.listen('enviar-generar-ticket').subscribe( (tickets: Ticket) => {
      console.log('estoy en escritorioComponent ', tickets);
      this.tickets = tickets;
    });
  }

  atender() {
    console.log(this.tickets);
    for (const i in this.tickets) {
      if (this.tickets[i].state === 0) {
        this.cod = this.tickets[i].cod;
        this.escritorio = this.tickets[i].escritorio;

        // this.wsService.emit('atender-ticket', this.cod);
        this.http.post('http://localhost:5000/atender-ticket', {cod: this.cod}).subscribe((tickets: Ticket[]) => {
          console.log('atendidos ', tickets);
        });
        break;

      }
    };

  }

}
