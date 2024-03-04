import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    pathMatch: 'full'
  },
  {
    path: 'departamento',
    component: DepartamentoComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
