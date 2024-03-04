import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Departamento } from 'src/app/Interfaces/departamento';
import { DepartamentoService } from 'src/app/Services/departamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAddEditDptoComponent } from 'src/app/Dialogs/departamentos-dialogs/dialog-add-edit-dpto/dialog-add-edit-dpto.component';
import { DialogDeleteDptoComponent } from 'src/app/Dialogs/departamentos-dialogs/dialog-delete-dpto/dialog-delete-dpto.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  displayedColumns: string[] = ['NombreDepartamento', 'Acciones'];
  dataSource = new MatTableDataSource<Departamento>();

  constructor(private departamentoService:DepartamentoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.mostrarDepartamentos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarDepartamentos(){
    this.departamentoService.getList().subscribe({
      next:(data)=>{
        console.log(data);
        this.dataSource.data = data;
      },error:(e)=>{
        console.log(e);
      }
    })
  }

  dialogNewEmpleado() {
    this.dialog.open(DialogAddEditDptoComponent,{
      disableClose: true,
      width:"350px"
    }).afterClosed().subscribe(resultado => {
      if(resultado=="creado"){
        this.mostrarDepartamentos();
      }
    });
  }

  dialogEditDepartamento(empleado : Departamento){
    this.dialog.open(DialogAddEditDptoComponent,{
      disableClose: true,
      width:"350px",
      data: empleado
    }).afterClosed().subscribe(resultado => {
      if(resultado=="editado"){
        this.mostrarDepartamentos();
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

  dialogDeleteEmpleado(departamento: Departamento){
    this.dialog.open(DialogDeleteDptoComponent,{
      disableClose: true,
      width:"350px",
      data: departamento
    }).afterClosed().subscribe(resultado => {
      if(resultado=="eliminar"){
        this.departamentoService.delete(departamento.idDepartamento).subscribe({
          next:(data)=>{
            //this.mostrarAlerta("Departamento eliminado", "Listo");
            Swal.fire('Eliminado!','Se eliminó el departamento exitosamente','success');
            this.mostrarDepartamentos();
          },error:(e)=>{
            console.log(e);
            if(e.status==500){
              //this.mostrarAlerta("No se puede eliminar porque hay empleados en este departamento", "Ok")
              Swal.fire({
                icon: "error",
                title: "No se puede eliminar el departamento!",
                text: "Hay empleados asociados a este departamento"
              });
            }else{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!"
              });
            }
          }
        })
      }
    });
  }

}
