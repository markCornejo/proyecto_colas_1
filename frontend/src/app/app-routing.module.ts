import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscritorioComponent } from './pages/escritorio/escritorio.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NuevoTicketComponent } from './pages/nuevo-ticket/nuevo-ticket.component';
import { PublicoComponent } from './pages/publico/publico.component';

const routes: Routes = [
  { path: 'escritorio/:id', component: EscritorioComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nuevo-ticket', component: NuevoTicketComponent },
  { path: 'publico', component: PublicoComponent },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
