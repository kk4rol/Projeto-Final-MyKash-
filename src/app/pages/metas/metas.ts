import { Component, OnInit } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';

interface Meta {
  id: number;
  nome: string;
  valorObjetivo: number;
  valorAtual: number;
  prazo: string;
  categoria: string;
  icone: string;
}

@Component({
  selector: 'app-metas',
  imports: [MenuLateral, CommonModule, FormsModule, Cabecalho],
  templateUrl: './metas.html',
  styleUrl: './metas.css',
})

export class Metas implements OnInit {

  
  /* ==================================================
     CONTROLE DO MODAL
  ================================================== */

  modalAberto: boolean = false;


  /* ==================================================
     LISTA DE METAS
  ================================================== */

  metas: Meta[] = [];


  /* ==================================================
     NOVA META
  ================================================== */

  novaMeta: Meta = this.metaVazia();

  /* ==================================================
     EXCLUIR META
  ================================================== */

  modalExclusaoAberto = false;
  metaParaExcluir: Meta | null = null;

  /* ==================================================
     INICIALIZAÇÃO
  ================================================== */

  ngOnInit(): void {

    const metasSalvas = localStorage.getItem('mykash-metas');

    if (metasSalvas) {

      this.metas = JSON.parse(metasSalvas);

    } else {

      this.metas = [
        {
          id: 1,
          nome: 'Reserva de Emergência',
          valorObjetivo: 5000,
          valorAtual: 3800,
          prazo: '2027-03-10',
          categoria: 'Reserva',
          icone: 'savings'
        },

        {
          id: 2,
          nome: 'Viagem de Férias',
          valorObjetivo: 4000,
          valorAtual: 1800,
          prazo: '2027-01-20',
          categoria: 'Viagem',
          icone: 'flight'
        },

        {
          id: 3,
          nome: 'Comprar um notebook',
          valorObjetivo: 5000,
          valorAtual: 2400,
          prazo: '2026-12-15',
          categoria: 'Bens Materiais',
          icone: 'computer'
        },

        {
          id: 4,
          nome: 'Curso profissionalizante',
          valorObjetivo: 1800,
          valorAtual: 650,
          prazo: '2027-02-12',
          categoria: 'Educação',
          icone: 'school'
        }
      ];

      this.salvarMetas();

    }

  }


  /* ==================================================
     META VAZIA
  ================================================== */

  metaVazia(): Meta {

    return {
      id: 0,
      nome: '',
      valorObjetivo: 0,
      valorAtual: 0,
      prazo: '',
      categoria: '',
      icone: 'flag'
    };

  }


  /* ==================================================
     ABRIR MODAL
  ================================================== */

  abrirModal(): void {

    this.novaMeta = this.metaVazia();

    this.modalAberto = true;

  }


  /* ==================================================
     FECHAR MODAL
  ================================================== */

  fecharModal(): void {

    this.modalAberto = false;

  }


  /* ==================================================
     CRIAR META
  ================================================== */

  criarMeta(): void {

    /*
     * Validação dos campos obrigatórios
     */

    if (
      !this.novaMeta.nome.trim() ||
      !this.novaMeta.valorObjetivo ||
      !this.novaMeta.prazo ||
      !this.novaMeta.categoria
    ) {

      return;

    }


    /*
     * O valor atual não pode ser negativo
     */

    if (this.novaMeta.valorAtual < 0) {

      this.novaMeta.valorAtual = 0;

    }


    /*
     * O valor atual não pode ultrapassar
     * o valor objetivo
     */

    if (this.novaMeta.valorAtual > this.novaMeta.valorObjetivo) {

      this.novaMeta.valorAtual = this.novaMeta.valorObjetivo;

    }


    /*
     * Define o ícone de acordo com a categoria
     */

    this.novaMeta.icone = this.obterIcone(
      this.novaMeta.categoria
    );


    /*
     * Cria um ID único
     */

    this.novaMeta.id = Date.now();


    /*
     * Adiciona a meta no início da lista
     */

    this.metas.unshift({
      ...this.novaMeta
    });


    /*
     * Salva no navegador
     */

    this.salvarMetas();


    /*
     * Fecha o modal
     */

    this.fecharModal();

  }


  /* ==================================================
     ÍCONE DA CATEGORIA
  ================================================== */

  obterIcone(categoria: string): string {

    switch (categoria) {

      case 'Bens Materiais':
        return 'computer';

      case 'Viagem':
        return 'flight';

      case 'Educação':
        return 'school';

      case 'Casa':
        return 'home';

      case 'Veículo':
        return 'directions_car';

      case 'Reserva':
        return 'savings';

      default:
        return 'flag';

    }

  }


  /* ==================================================
     PERCENTUAL DA META
  ================================================== */

  percentual(meta: Meta): number {

    if (meta.valorObjetivo <= 0) {
      return 0;
    }

    const percentual =
      (meta.valorAtual / meta.valorObjetivo) * 100;

    return Math.min(Math.round(percentual), 100);

  }


  /* ==================================================
     VALOR RESTANTE
  ================================================== */

  valorRestante(meta: Meta): number {

    return Math.max(
      meta.valorObjetivo - meta.valorAtual,
      0
    );

  }


  /* ==================================================
     FORMATAR DATA
  ================================================== */

  formatarData(data: string): string {

    if (!data) {
      return '';
    }

    const partes = data.split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

  }


  /* ==================================================
     EXCLUIR META
  ================================================== */

  confirmarExclusao(meta: Meta): void {
    this.metaParaExcluir = meta;
    this.modalExclusaoAberto = true;
  }

  cancelarExclusao(): void {
    this.modalExclusaoAberto = false;
    this.metaParaExcluir = null;
  }

  excluirMeta(): void {
    if (!this.metaParaExcluir) {
      return;
    }

    this.metas = this.metas.filter(
      meta => meta.id !== this.metaParaExcluir!.id
    );

    this.salvarMetas();

    this.modalExclusaoAberto = false;
    this.metaParaExcluir = null;
  }


  /* ==================================================
     SALVAR
  ================================================== */

  salvarMetas(): void {

    localStorage.setItem(
      'mykash-metas',
      JSON.stringify(this.metas)
    );

  }

  get totalGuardado(): number {
    return this.metas.reduce(
      (total: number, meta:Meta) => total + meta.valorAtual,
      0
    );
  }

  get totalObjetivo(): number {
    return this.metas.reduce(
      (total: number, meta:Meta) => total + meta.valorObjetivo,
      0
    );
  }

}



