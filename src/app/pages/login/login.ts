import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  senha = '';

  mensagemErro = '';

  constructor(private router:Router) {}

  entrar(): void {

    this.mensagemErro = '';

    const usuariosSalvos =
        localStorage.getItem('mykash-usuarios');

    if (!usuariosSalvos) {

        this.mensagemErro =
            'E-mail ou senha incorretos.';

        return;
    }

    const usuarios = JSON.parse(usuariosSalvos);

    const usuarioEncontrado = usuarios.find(
        (usuario: any) =>
            usuario.email === this.email &&
            usuario.senha === this.senha
    );

    if (usuarioEncontrado) {

        localStorage.setItem(
            'mykash-usuario-logado',
            usuarioEncontrado.email
        );

        localStorage.setItem(
            'mykash-usuario-atual',
            JSON.stringify({
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            })
        );

        this.router.navigate(['/dashboard']);

    } else {

        this.mensagemErro =
            'E-mail ou senha incorretos.';

    }
  }

  
  sair(): void {

      localStorage.removeItem('mykash-usuario-logado');

      this.router.navigate(['/login']);

  }

}
