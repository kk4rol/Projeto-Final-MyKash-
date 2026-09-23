import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Movimentacoes } from './pages/movimentacoes/movimentacoes';
import { Metas } from './pages/metas/metas';
import { Investimentos } from './pages/investimentos/investimentos';
import { Analises } from './pages/analises/analises';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [

    { path: "index", component:Index },
    { path: "cadastro", component:Cadastro },
    { path: "login", component:Login },
    { path: "dashboard", component:Dashboard },
    { path: "movimentacoes", component:Movimentacoes },
    { path: "metas", component:Metas },
    { path: "investimentos", component:Investimentos },
    { path:"analises", component:Analises },
    { path:"", redirectTo: "index", pathMatch: "full" }
    
];
