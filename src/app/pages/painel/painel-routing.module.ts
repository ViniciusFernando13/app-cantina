import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel/painel.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';

const routes: Routes = [
  { path:'', component: PainelComponent },
  { path:'usuarios', component: UsuariosListComponent },
  { path:'produtos', component: ProdutosListComponent },
  { path:'clientes', component: ClientesListComponent },
  { path:'pedidos', component: PedidosListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }
