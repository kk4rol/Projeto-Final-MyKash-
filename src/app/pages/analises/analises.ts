import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';
import { DadosFinanceiros } from '../../services/dados-financeiros';
import { Subscription } from 'rxjs';

interface Alerta {
  tipo: string;
  icone: string;
  categoria: string;
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-analises',
  imports: [
    CommonModule,
    MenuLateral,
    Cabecalho
  ],
  templateUrl: './analises.html',
  styleUrl: './analises.css'
})
export class Analises implements OnInit, OnDestroy {

  indiceAtual = 0;

  alertas: Alerta[] = [];

  private intervaloCarrossel:
    ReturnType<typeof setInterval> | undefined;

  private inscricaoDados?: Subscription;

  constructor(
    public dadosFinanceiros: DadosFinanceiros
  ) {}

  ngOnInit(): void {

    this.atualizarAnalises();

    this.iniciarCarrossel();

    this.inscricaoDados =
      this.dadosFinanceiros.dadosAtualizados$
        .subscribe(() => {

          this.atualizarAnalises();

        });
  }

  ngOnDestroy(): void {

    if (this.intervaloCarrossel) {
      clearInterval(this.intervaloCarrossel);
    }

    this.inscricaoDados?.unsubscribe();
  }

  atualizarAnalises(): void {

    this.alertas = this.gerarAlertas();

    if (this.indiceAtual >= this.alertas.length) {
      this.indiceAtual = 0;
    }
  }

  iniciarCarrossel(): void {

    this.intervaloCarrossel = setInterval(() => {

      this.proximoCard();

    }, 5000);

  }

  proximoCard(): void {

    if (this.alertas.length === 0) {
      return;
    }

    if (this.indiceAtual < this.alertas.length - 1) {
      this.indiceAtual++;
    } else {
      this.indiceAtual = 0;
    }

  }

  cardAnterior(): void {

    if (this.alertas.length === 0) {
      return;
    }

    if (this.indiceAtual > 0) {
      this.indiceAtual--;
    } else {
      this.indiceAtual = this.alertas.length - 1;
    }

  }

  irParaCard(index: number): void {

    this.indiceAtual = index;

  }


  // ==================================================
  // ANÁLISES
  // ==================================================

  get totalGastos(): number {

    return this.dadosFinanceiros.totalSaidas;

  }


  get totalEntradas(): number {

    return this.dadosFinanceiros.totalEntradas;

  }


  get saldo(): number {

    return this.dadosFinanceiros.saldo;

  }


  get quantidadeGastos(): number {

    return this.dadosFinanceiros.movimentacoes.filter(
      movimentacao => movimentacao.tipo === 'saida'
    ).length;

  }


  get quantidadeEntradas(): number {

    return this.dadosFinanceiros.movimentacoes.filter(
      movimentacao => movimentacao.tipo === 'entrada'
    ).length;

  }


  get gastoMedio(): number {

    if (this.quantidadeGastos === 0) {
      return 0;
    }

    return this.totalGastos / this.quantidadeGastos;

  }

  get percentualLazer(): number {
    return this.dadosFinanceiros.getPercentualOrcamento('Lazer');
  }


  // ==================================================
  // CATEGORIA COM MAIOR GASTO
  // ==================================================

  get categoriaMaiorGasto(): {
    categoria: string;
    valor: number;
  } {

    const categorias: {
      [categoria: string]: number;
    } = {};

    this.dadosFinanceiros.movimentacoes
      .filter(m => m.tipo === 'saida')
      .forEach(m => {

        if (!categorias[m.categoria]) {
          categorias[m.categoria] = 0;
        }

        categorias[m.categoria] += m.valor;

      });

    let maiorCategoria = 'Nenhuma';
    let maiorValor = 0;

    Object.entries(categorias).forEach(
      ([categoria, valor]) => {

        if (valor > maiorValor) {

          maiorCategoria = categoria;
          maiorValor = valor;

        }

      }
    );

    return {
      categoria: maiorCategoria,
      valor: maiorValor
    };

  }


  // ==================================================
  // PERCENTUAL DA MAIOR CATEGORIA
  // ==================================================

  get percentualMaiorCategoria(): number {

    if (this.totalGastos === 0) {
      return 0;
    }

    return (
      this.categoriaMaiorGasto.valor /
      this.totalGastos
    ) * 100;

  }


  // ==================================================
  // PEQUENOS GASTOS
  // ==================================================

  get pequenosGastos(): number {

    return this.dadosFinanceiros.movimentacoes
      .filter(
        m =>
          m.tipo === 'saida' &&
          m.valor < 30
      )
      .length;

  }


  get valorPequenosGastos(): number {

    return this.dadosFinanceiros.movimentacoes
      .filter(
        m =>
          m.tipo === 'saida' &&
          m.valor < 30
      )
      .reduce(
        (total, m) => total + m.valor,
        0
      );

  }


  // ==================================================
  // ALERTAS
  // ==================================================

  gerarAlertas(): Alerta[] {

    const alertas: Alerta[] = [];

    if (this.totalGastos > 0) {

      alertas.push({
        tipo: 'orange',
        icone: 'pie_chart',
        categoria: 'GASTOS',
        titulo:
          `Sua maior categoria de gastos é ${this.categoriaMaiorGasto.categoria}.`,
        descricao:
          `Ela representa ${this.percentualMaiorCategoria.toFixed(0)}% das suas saídas.`
      });

    }

    if (this.pequenosGastos > 0) {

      alertas.push({
        tipo: 'purple',
        icone: 'payments',
        categoria: 'COMPORTAMENTO',
        titulo:
          `${this.pequenosGastos} pequenos gastos foram registrados.`,
        descricao:
          `Juntos, eles representam R$ ${this.valorPequenosGastos
            .toFixed(2)
            .replace('.', ',')}.`
      });

    }

    if (this.saldo < 0) {

      alertas.push({
        tipo: 'red',
        icone: 'warning',
        categoria: 'SALDO',
        titulo:
          'Suas saídas ultrapassaram suas entradas.',
        descricao:
          'Revise suas movimentações para evitar um saldo negativo.'
      });

    }

    if (this.quantidadeGastos >= 10) {

      alertas.push({
        tipo: 'cyan',
        icone: 'receipt_long',
        categoria: 'MOVIMENTAÇÕES',
        titulo:
          'Você realizou várias movimentações.',
        descricao:
          `Foram registradas ${this.quantidadeGastos} saídas no período.`
      });

    }

    return alertas;
  }

}