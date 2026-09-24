import { Injectable } from '@angular/core';

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

  constructor() {

    const dadosSalvos =
      localStorage.getItem(this.chaveLocalStorage);

    if (dadosSalvos) {

      this.movimentacoes = JSON.parse(dadosSalvos);

    } else {

      this.movimentacoes = this.dadosIniciais();

      this.salvarDados();

    }

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

  }


  resetarSimulacao(): void {

    this.movimentacoes = this.dadosIniciais();

    this.salvarDados();

  }

}