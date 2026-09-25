import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

    nome = '';
    email = '';
    senha = '';
    confirmarSenha = '';
    aceitouTermos = false;

    mensagemErro = '';

    constructor(private router: Router) {}

    cadastrar(): void {

      this.mensagemErro = '';

      // Verifica se os campos foram preenchidos
      if (
        !this.nome ||
        !this.email ||
        !this.senha ||
        !this.confirmarSenha
      ) {
        this.mensagemErro = 'Preencha todos os campos.';
        return;
      }

      // Verifica se as senhas são iguais
      if (this.senha !== this.confirmarSenha) {
        this.mensagemErro = 'As senhas não coincidem.';
        return;
      }

      // Verifica os termos
      if (!this.aceitouTermos) {
        this.mensagemErro = 'Você precisa aceitar os termos de uso.';
        return;
      }

      // Recupera os usuários já cadastrados
      const usuariosSalvos =
        localStorage.getItem('mykash-usuarios');

      const usuarios = usuariosSalvos
        ? JSON.parse(usuariosSalvos)
        : [];

      // Verifica se o e-mail já existe
      const usuarioExiste = usuarios.some(
        (usuario: any) => usuario.email === this.email
      );

      if (usuarioExiste) {
        this.mensagemErro = 'Este e-mail já está cadastrado.';
        return;
      }

      // Cria o novo usuário
      usuarios.push({
        nome: this.nome,
        email: this.email,
        senha: this.senha
      });

      // Salva no navegador
      localStorage.setItem(
        'mykash-usuarios',
        JSON.stringify(usuarios)
      );

      localStorage.setItem(
        'mykash-usuario-atual',
        JSON.stringify({
            nome: this.nome,
            email: this.email
        })
    );

      // Vai para a tela de login
      this.router.navigate(['/login']);
  
    }

}
