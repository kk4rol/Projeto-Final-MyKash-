import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  imports: [CommonModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho implements OnInit {

  menuPerfilAberto = false;
  temaClaro = false;

  ngOnInit(): void {

    const temaSalvo = localStorage.getItem('mykash-tema');

    if (temaSalvo === 'claro') {
      this.temaClaro = true;
      document.body.classList.add('tema-claro');
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

}
