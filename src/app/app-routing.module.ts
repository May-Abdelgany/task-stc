import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from './Routes/app-routes';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: Routing.auth.module, pathMatch: 'full' },
  {
    path: Routing.auth.module,

    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: Routing.main.module,
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
