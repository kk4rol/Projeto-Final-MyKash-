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

  movimentacoes: Movimentacao[] = [
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


  constructor() {

    const dadosSalvos =
      localStorage.getItem(this.chaveLocalStorage);

    if (dadosSalvos) {
      this.movimentacoes = JSON.parse(dadosSalvos);
    } else {
      this.salvarDados();
    }

  }


  private salvarDados(): void {

    localStorage.setItem(
      this.chaveLocalStorage,
      JSON.stringify(this.movimentacoes)
    );

  }


  get totalEntradas(): number {

    return this.movimentacoes
      .filter(movimentacao => movimentacao.tipo === 'entrada')
      .reduce(
        (total, movimentacao) =>
          total + movimentacao.valor,
        0
      );

  }


  get totalSaidas(): number {

    return this.movimentacoes
      .filter(movimentacao => movimentacao.tipo === 'saida')
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

    this.movimentacoes.push(

      {
        id: Date.now(),
        descricao: 'Pagamento recebido',
        valor: 300,
        tipo: 'entrada',
        categoria: 'Renda',
        conta: 'Itaú',
        data: '2026-09-23'
      },

      {
        id: Date.now() + 1,
        descricao: 'iFood',
        valor: 42.90,
        tipo: 'saida',
        categoria: 'Alimentação',
        conta: 'Itaú',
        data: '2026-09-23'
      },

      {
        id: Date.now() + 2,
        descricao: 'Steam',
        valor: 89.90,
        tipo: 'saida',
        categoria: 'Lazer',
        conta: 'Itaú',
        data: '2026-09-23'
      }

    );

    this.salvarDados();

  }

}