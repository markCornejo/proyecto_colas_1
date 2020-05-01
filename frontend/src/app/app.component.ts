import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'colas';

  constructor(
    private wsService: WebsocketService
  ) {}

  ngOnInit() {

    this.wsService.listen('enviar-generar-ticket').subscribe( msg => {
      console.log('estoy nuevossss ', msg);
    });

    this.wsService.listen('enviar-ticket-atendidos').subscribe( msg => {
      console.log('estoy atendidosss ', msg);
    });

  }

}
