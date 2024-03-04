import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';
//Peticiones http
import { HttpClientModule } from '@angular/common/http';
//Tablas
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
//Controles de formularios
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
//Mensajes de alertas
import {MatSnackBarModule} from '@angular/material/snack-bar';
//Iconos
import {MatIconModule} from '@angular/material/icon';
//Modales
import {MatDialogModule} from '@angular/material/dialog';
//card
import {MatCardModule} from '@angular/material/card';
//list
import {MatListModule} from '@angular/material/list';
//grids
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogAddEditComponent } from './Dialogs/empleados-dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/empleados-dialogs/dialog-delete/dialog-delete.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { DialogAddEditDptoComponent } from './Dialogs/departamentos-dialogs/dialog-add-edit-dpto/dialog-add-edit-dpto.component';
import { DialogDeleteDptoComponent } from './Dialogs/departamentos-dialogs/dialog-delete-dpto/dialog-delete-dpto.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogDeleteComponent,
    SidebarComponent,
    EmpleadoComponent,
    DepartamentoComponent,
    DialogAddEditDptoComponent,
    DialogDeleteDptoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
