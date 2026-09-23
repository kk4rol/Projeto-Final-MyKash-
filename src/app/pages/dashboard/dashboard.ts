import { Component, OnInit } from '@angular/core';
import { MenuLateral } from '../../componentes/menu-lateral/menu-lateral';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MenuLateral, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {

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
