import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
    {
      path: '',
      children: [
        { 
          path: 'painel',
          loadChildren: './pages/painel/painel.module#PainelModule'
        }
      ],
      canActivate: [AuthGuard]
    }, {
      path: 'login',
      loadChildren: './pages/login/login.module#LoginModule',
      canActivate: [GuestGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
