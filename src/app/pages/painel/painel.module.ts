import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PainelRoutingModule } from './painel-routing.module';
import { PainelComponent } from './painel/painel.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { FormsModule } from '@angular/forms';
import { ProdutosListComponent } from './produtos/produtos-list/produtos-list.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ItensPedidoComponent } from './pedidos/itens-pedido/itens-pedido.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectDropDownModule,
    NgbModule,
    PainelRoutingModule,
  ],
  entryComponents: [ItensPedidoComponent],
  declarations: [PainelComponent, UsuariosListComponent, ProdutosListComponent, ClientesListComponent, PedidosListComponent, ItensPedidoComponent]
})
export class PainelModule { }
