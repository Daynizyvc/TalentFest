import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent} from './components/pages/container-app/container-app.component'

const routes: Routes = [
  {
    path:'', component:ContainerAppComponent,
    children:[
      
      { path: '', redirectTo:'/login', pathMatch:'full'},
      { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'clients', loadChildren: () => import('./components/pages/clients/clients.module').then(m => m.ClientsModule) },
      { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) }, 
    ]
  },
  
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
