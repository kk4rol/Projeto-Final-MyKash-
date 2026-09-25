import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Movimentacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  categoria: string;
  conta: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class DadosFinanceiros {

  private chaveLocalStorage = 'mykash-dados-financeiros';

  private numeroSincronizacao = 0;

  movimentacoes: Movimentacao[] = [];

  private dadosAtualizadosSubject =
  new BehaviorSubject<Movimentacao[]>([]);

  dadosAtualizados$ =
    this.dadosAtualizadosSubject.asObservable();

  constructor() {

    const dadosSalvos =
      localStorage.getItem(this.chaveLocalStorage);

    if (dadosSalvos) {

      this.movimentacoes = JSON.parse(dadosSalvos);

    } else {

      this.movimentacoes = this.dadosIniciais();

      this.salvarDados();

    }

    this.dadosAtualizadosSubject.next(this.movimentacoes);

  }


  private dadosIniciais(): Movimentacao[] {

    return [

      {
        id: 1,
        descricao: 'Salário',
        valor: 3500,
        tipo: 'entrada',
        categoria: 'Renda',
        conta: 'Itaú',
        data: '2026-09-05'
      },

      {
        id: 2,
        descricao: 'iFood',
        valor: 42.90,
        tipo: 'saida',
        categoria: 'Alimentação',
        conta: 'Itaú',
        data: '2026-09-06'
      },

      {
        id: 3,
        descricao: 'Amazon',
        valor: 129.90,
        tipo: 'saida',
        categoria: 'Compras',
        conta: 'Itaú',
        data: '2026-09-08'
      },

      {
        id: 4,
        descricao: 'Uber',
        valor: 28.50,
        tipo: 'saida',
        categoria: 'Transporte',
        conta: 'Itaú',
        data: '2026-09-10'
      },

      {
        id: 5,
        descricao: 'Steam',
        valor: 89.90,
        tipo: 'saida',
        categoria: 'Lazer',
        conta: 'Itaú',
        data: '2026-09-12'
      }

    ];

  }


  private salvarDados(): void {

    localStorage.setItem(
      this.chaveLocalStorage,
      JSON.stringify(this.movimentacoes)
    );

  }


  get totalEntradas(): number {

    return this.movimentacoes
      .filter(
        movimentacao =>
          movimentacao.tipo === 'entrada'
      )
      .reduce(
        (total, movimentacao) =>
          total + movimentacao.valor,
        0
      );

  }


  get totalSaidas(): number {

    return this.movimentacoes
      .filter(
        movimentacao =>
          movimentacao.tipo === 'saida'
      )
      .reduce(
        (total, movimentacao) =>
          total + movimentacao.valor,
        0
      );

  }


  get saldo(): number {

    return this.totalEntradas - this.totalSaidas;

  }


  simularSincronizacao(): void {

    this.numeroSincronizacao++;

    const agora = Date.now();

    let novasMovimentacoes: Movimentacao[] = [];

    if (this.numeroSincronizacao === 1) {

      novasMovimentacoes = [

        {
          id: agora,
          descricao: 'Pagamento recebido',
          valor: 300,
          tipo: 'entrada',
          categoria: 'Renda',
          conta: 'Itaú',
          data: '2026-09-23'
        },

        {
          id: agora + 1,
          descricao: 'Mercado',
          valor: 76.40,
          tipo: 'saida',
          categoria: 'Alimentação',
          conta: 'Itaú',
          data: '2026-09-23'
        },

        {
          id: agora + 2,
          descricao: 'Netflix',
          valor: 39.90,
          tipo: 'saida',
          categoria: 'Lazer',
          conta: 'Itaú',
          data: '2026-09-23'
        }

      ];

    } else if (this.numeroSincronizacao === 2) {

      novasMovimentacoes = [

        {
          id: agora,
          descricao: 'Freelance',
          valor: 450,
          tipo: 'entrada',
          categoria: 'Renda',
          conta: 'Itaú',
          data: '2026-09-24'
        },

        {
          id: agora + 1,
          descricao: 'Uber',
          valor: 32.80,
          tipo: 'saida',
          categoria: 'Transporte',
          conta: 'Itaú',
          data: '2026-09-24'
        },

        {
          id: agora + 2,
          descricao: 'Café',
          valor: 14.50,
          tipo: 'saida',
          categoria: 'Alimentação',
          conta: 'Itaú',
          data: '2026-09-24'
        }

      ];

    } else {

      novasMovimentacoes = [

        {
          id: agora,
          descricao: 'Pix recebido',
          valor: 180,
          tipo: 'entrada',
          categoria: 'Renda',
          conta: 'Itaú',
          data: '2026-09-25'
        },

        {
          id: agora + 1,
          descricao: 'PlayStation Store',
          valor: 119.90,
          tipo: 'saida',
          categoria: 'Lazer',
          conta: 'Itaú',
          data: '2026-09-25'
        },

        {
          id: agora + 2,
          descricao: 'Farmácia',
          valor: 27.50,
          tipo: 'saida',
          categoria: 'Outros',
          conta: 'Itaú',
          data: '2026-09-25'
        }

      ];

    }

    this.movimentacoes.push(...novasMovimentacoes);

    this.movimentacoes.sort(
      (a, b) =>
        b.data.localeCompare(a.data)
    );

    this.salvarDados();

    this.dadosAtualizadosSubject.next(this.movimentacoes);

  }


  resetarSimulacao(): void {

    this.movimentacoes = this.dadosIniciais();

    this.numeroSincronizacao = 0;

    this.salvarDados();

    localStorage.removeItem('mykash-numero-sincronizacao');

    this.dadosAtualizadosSubject.next(this.movimentacoes);
  }

  orcamentos: { [categoria: string]: number } = {
    Alimentação: 600,
    Lazer: 600,
    Transporte: 400,
    Compras: 400,
    Contas: 900,
    Outros: 300
  };

  get totalOrcamentos(): number {
    return Object.values(this.orcamentos)
      .reduce((total, valor) => total + valor, 0);
  }

  get totalUtilizadoOrcamentos(): number {
    return Object.keys(this.orcamentos)
      .reduce((total, categoria) => {
        return total + this.getGastoCategoria(categoria);
      }, 0);
  }

  get percentualOrcamentosUtilizados(): number {
    if (this.totalOrcamentos === 0) {
      return 0;
    }

    return Math.min(
      (this.totalUtilizadoOrcamentos / this.totalOrcamentos) * 100,
      100
    );
  }

  getGastoCategoria(categoria: string): number {
    return this.movimentacoes
      .filter(
        movimentacao =>
          movimentacao.tipo === 'saida' &&
          movimentacao.categoria === categoria
      )
      .reduce(
        (total, movimentacao) =>
          total + movimentacao.valor,
        0
      );
  }


  getPercentualOrcamento(categoria: string): number {

    const gasto = this.getGastoCategoria(categoria);
    const orcamento = this.orcamentos[categoria];

    if (!orcamento) {
      return 0;
    }

    return Math.min((gasto / orcamento) * 100, 100);
  }

}