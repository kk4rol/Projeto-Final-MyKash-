import { Component } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';
import { DadosFinanceiros } from '../../services/dados-financeiros';

@Component({
  selector: 'app-movimentacoes',
  imports: [MenuLateral, CommonModule, Cabecalho],
  templateUrl: './movimentacoes.html',
  styleUrl: './movimentacoes.css',
})
export class Movimentacoes {

  premiumAberto = false;

  constructor(public dadosFinanceiros:DadosFinanceiros) {}

  abrirPremium(): void {
      this.premiumAberto = true;
  }

  fecharPremium(): void {
      this.premiumAberto = false;
  }

  simularSincronizacao(): void {
  this.dadosFinanceiros.simularSincronizacao();
}

  formatarData(data: string): string {
      const partes = data.split('-');

      return `${partes[2]}/${partes[1]}`;
  }

}
