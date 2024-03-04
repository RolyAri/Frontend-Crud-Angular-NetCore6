import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Empleado } from 'src/app/Interfaces/empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogAddEditComponent } from 'src/app/Dialogs/empleados-dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from 'src/app/Dialogs/empleados-dialogs/dialog-delete/dialog-delete.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['NombreCompleto', 'Departamento', 'Sueldo', 'FechaContrato', 'Acciones'];
  dataSource = new MatTableDataSource<Empleado>();

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog, private snackBar:MatSnackBar){}
  
  ngOnInit(): void {
    this.mostrarEmpleados();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEmpleados(){
    this.empleadoService.getList().subscribe({
      next:(data)=>{
        console.log(data);
        this.dataSource.data = data;
      },error:(e)=>{
        console.log(e);
      }
    })
  }

  dialogNewEmpleado() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose: true,
      width:"350px"
    }).afterClosed().subscribe(resultado => {
      if(resultado=="creado"){
        this.mostrarEmpleados();
      }
    });
  }

  dialogEditEmpleado(empleado : Empleado){
    this.dialog.open(DialogAddEditComponent,{
      disableClose: true,
      width:"350px",
      data: empleado
    }).afterClosed().subscribe(resultado => {
      if(resultado=="editado"){
        this.mostrarEmpleados();
      }
    });
  }

  mostrarAlerta(msg: string, action:string){
    this.snackBar.open(msg,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000  
    })
  }

  dialogDeleteEmpleado(empleado: Empleado){
    this.dialog.open(DialogDeleteComponent,{
      disableClose: true,
      width:"350px",
      data: empleado
    }).afterClosed().subscribe(resultado => {
      if(resultado=="eliminar"){
        this.empleadoService.delete(empleado.idEmpleado).subscribe({
          next:(data)=>{
            //this.mostrarAlerta("Empleado eliminado", "Listo");
            Swal.fire('Exito','Se eliminó el empleado exitosamente','success');
            this.mostrarEmpleados();
          },error:(e)=>{
            console.log(e);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo salió mal!, no se puedo eliminar al empleado"
            });
          }
        })
      }
    });
  }

}
