import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Movimentacoes } from './pages/movimentacoes/movimentacoes';
import { Metas } from './pages/metas/metas';
import { Investimentos } from './pages/investimentos/investimentos';
import { Analises } from './pages/analises/analises';
import { Cadastro } from './pages/cadastro/cadastro';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [

    { path: "index", component:Index },
    { path: "cadastro", component:Cadastro },
    { path: "login", component:Login },
    { path: "dashboard", component:Dashboard, canActivate:[authGuard] },
    { path: "movimentacoes", component:Movimentacoes, canActivate:[authGuard] },
    { path: "metas", component:Metas, canActivate:[authGuard] },
    { path: "investimentos", component:Investimentos, canActivate:[authGuard] },
    { path:"analises", component:Analises, canActivate:[authGuard] },
    { path:"", redirectTo: "index", pathMatch: "full" }
    
];
