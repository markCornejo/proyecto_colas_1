
export class Ticket {

  public cod: string;
  public escritorio: number;
  public state: number;

  constructor(cod: string, escritorio: number, state: number) {
    this.cod = cod;
    this.escritorio = escritorio;
    this.state = state;
  }

}
