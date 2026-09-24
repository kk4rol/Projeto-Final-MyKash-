import { Component } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';
import { DadosFinanceiros } from '../../services/dados-financeiros';

@Component({
  selector: 'app-analises',
  imports: [MenuLateral, CommonModule, Cabecalho],
  templateUrl: './analises.html',
  styleUrl: './analises.css',
})
export class Analises {

  constructor(public dadosFinanceiros:DadosFinanceiros) {}

  indiceAtual: number = 0;

  private intervaloCarrossel:
    ReturnType<typeof setInterval> | undefined;

  alertas = [

    {
      tipo: 'red',
      icone: 'trending_up',
      categoria: 'GASTOS',
      titulo: 'Seus gastos aumentaram 24% este mês.',
      descricao: 'O aumento foi principalmente concentrado em lazer e compras.'
    },

    {
      tipo: 'orange',
      icone: 'paid',
      categoria: 'ORÇAMENTO',
      titulo: 'Você já utilizou 82% do orçamento de lazer.',
      descricao: 'Ainda restam R$ 180 para o restante do mês.'
    },

    {
      tipo: 'purple',
      icone: 'savings',
      categoria: 'RESERVA',
      titulo: 'Sua reserva planejada ainda não foi atingida.',
      descricao: 'Você precisa guardar mais R$ 250 este mês.'
    },

    {
      tipo: 'cyan',
      icone: 'gamepad',
      categoria: 'COMPORTAMENTO',
      titulo: 'Muitas compras em plataformas de jogos.',
      descricao: 'Foram registradas 6 compras nos últimos 7 dias.'
    }

  ];

  ngOnInit():void{

    this.iniciarCarrossel();

  }

  proximoCard(): void {

    if (this.indiceAtual < this.alertas.length - 1) {

      this.indiceAtual++;

    } else {

      this.indiceAtual = 0;

    }

  }


  cardAnterior(): void {

    if (this.indiceAtual > 0) {

      this.indiceAtual--;

    } else {

      this.indiceAtual = this.alertas.length - 1;

    }

  }


  irParaCard(index: number): void {

    this.indiceAtual = index;

  }


  iniciarCarrossel():void{

    this.intervaloCarrossel = setInterval(() => {

      this.proximoCard();

    }, 5000)
  }

    ngOnDestroy():void{

      if(this.intervaloCarrossel){

        clearInterval(this.intervaloCarrossel);
      }
    }

  
  get totalAlimentacao(): number {
  return this.dadosFinanceiros.movimentacoes
    .filter(
      movimentacao =>
        movimentacao.tipo === 'saida' &&
        movimentacao.categoria === 'Alimentação'
    )
    .reduce(
      (total, movimentacao) =>
        total + movimentacao.valor,
      0
    );
}

  get totalLazer(): number {
    return this.dadosFinanceiros.movimentacoes
      .filter(
        movimentacao =>
          movimentacao.tipo === 'saida' &&
          movimentacao.categoria === 'Lazer'
      )
      .reduce(
        (total, movimentacao) =>
          total + movimentacao.valor,
        0
      );
  }
  
  get percentualLazer(): number {

    const percentual =
      (this.totalLazer / 600) * 100;

    return Math.min(percentual, 100);
  }

}

