import { Component } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';

@Component({
  selector: 'app-investimentos',
  imports: [MenuLateral, Cabecalho],
  templateUrl: './investimentos.html',
  styleUrl: './investimentos.css',
})
export class Investimentos {

}
