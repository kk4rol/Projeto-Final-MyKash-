import { Component, OnInit } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { DadosFinanceiros } from '../../services/dados-financeiros';

@Component({
  selector: 'app-dashboard',
  imports: [MenuLateral, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {

  menuPerfilAberto = false;
  temaClaro = false;
  emailUsuario = '';

  constructor(public dadosFinanceiros:DadosFinanceiros) {}

  ngOnInit(): void {

    const temaSalvo = localStorage.getItem('mykash-tema');

    if (temaSalvo === 'claro') {
      this.temaClaro = true;
      document.body.classList.add('tema-claro');
    }

    const emailSalvo =
      localStorage.getItem('mykash-usuario-logado');

    if (emailSalvo) {
      this.emailUsuario = emailSalvo;
    }

  }

  abrirMenuPerfil(): void {
    this.menuPerfilAberto = !this.menuPerfilAberto;
  }

  alterarTema(): void {

    this.temaClaro = !this.temaClaro;

    if (this.temaClaro) {

      document.body.classList.add('tema-claro');

      localStorage.setItem('mykash-tema', 'claro');

    } else {

      document.body.classList.remove('tema-claro');

      localStorage.setItem('mykash-tema', 'escuro');

    }

  }

  sair(): void {

    // Aqui você pode colocar posteriormente
    // a lógica de logout do sistema.

    console.log('Usuário saiu');

  }

  get percentualGastos(): number {
    if (this.dadosFinanceiros.totalEntradas === 0) {
      return 0;
    }

    return (
      (this.dadosFinanceiros.totalSaidas /
        this.dadosFinanceiros.totalEntradas) * 100
    );
  }

  get despesasPorCategoria(): { categoria: string; valor: number; percentual: number }[] {

    const categorias = [
      'Alimentação',
      'Compras',
      'Transporte',
      'Lazer',
      'Outros'
    ];

    const total = this.dadosFinanceiros.totalSaidas;

    return categorias.map(categoria => {

      const valor = this.dadosFinanceiros.movimentacoes
        .filter(
          movimentacao =>
            movimentacao.tipo === 'saida' &&
            movimentacao.categoria === categoria
        )
        .reduce(
          (totalCategoria, movimentacao) =>
            totalCategoria + movimentacao.valor,
          0
        );

      const percentual =
        total > 0
          ? (valor / total) * 100
          : 0;

      return {
        categoria,
        valor,
        percentual
      };

    });
  }

  get quantidadeEntradas(): number {
    return this.dadosFinanceiros.movimentacoes.filter(
      movimentacao => movimentacao.tipo === 'entrada'
    ).length;
  }

  get diasDoMes(): number {
    return 30;
  }

  get diaAtualSimulacao(): number {

    const hoje = new Date();

    return hoje.getDate();
  }

  get gastoProjetadoMes(): number {

    const gastos = this.dadosFinanceiros.totalSaidas;

    const diaAtual = this.diaAtualSimulacao;

    if (diaAtual <= 0) {
      return gastos;
    }

    return (gastos / diaAtual) * this.diasDoMes;
  }

  get economiaProjetada(): number {

    const entradas = this.dadosFinanceiros.totalEntradas;

    const gastosProjetados = this.gastoProjetadoMes;

    return Math.max(
      entradas - gastosProjetados,
      0
    );
  }

}
