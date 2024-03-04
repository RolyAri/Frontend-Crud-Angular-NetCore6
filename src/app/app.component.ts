import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Empleado } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogAddEditComponent } from './Dialogs/empleados-dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/empleados-dialogs/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'ProyectoFrontCrudAngular';


  constructor(){}
  
  ngOnInit(): void {
  }
}