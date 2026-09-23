import { Component } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';

@Component({
  selector: 'app-movimentacoes',
  imports: [MenuLateral, CommonModule, Cabecalho],
  templateUrl: './movimentacoes.html',
  styleUrl: './movimentacoes.css',
})
export class Movimentacoes {

  premiumAberto = false;

  abrirPremium(): void {
      this.premiumAberto = true;
  }

  fecharPremium(): void {
      this.premiumAberto = false;
  }

}
