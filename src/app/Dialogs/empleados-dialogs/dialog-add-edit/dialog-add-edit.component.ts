import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS} from '@angular/material/core';
import * as moment from 'moment';

import { Departamento } from 'src/app/Interfaces/departamento';
import { Empleado } from 'src/app/Interfaces/empleado';
import { DepartamentoService } from 'src/app/Services/departamento.service';
import { EmpleadoService } from 'src/app/Services/empleado.service';

import Swal from 'sweetalert2';

export const MY_DATE_FORMATS={
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}


@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit {

  formEmpleado: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaDepartamentos: Departamento[]=[];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private departamentoService: DepartamentoService,
    private empleadoService: EmpleadoService,
    @Inject (MAT_DIALOG_DATA) public empleado: Empleado
    ) 
    {
      this.formEmpleado=this.formBuilder.group({
        nombreCompleto: ['',Validators.required],
        idDepartamento: ['',Validators.required],
        sueldo: ['',Validators.required],
        fechaContrato: ['',Validators.required]
      })
      this.departamentoService.getList().subscribe({
        next:(data)=>{
          this.listaDepartamentos=data;
        },error:(e)=>{
          
        }
      })
    }
  
  mostrarAlerta(msg: string, action:string){
    this.snackBar.open(msg,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000  
    })
  }

  addEditEmpleado(){
    console.log(this.formEmpleado.value);
    const modelo:Empleado={
      idEmpleado:0,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      idDepartamento: this.formEmpleado.value.idDepartamento,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: moment(this.formEmpleado.value.fechaContrato).format("DD/MM/YYYY")
    }
    if(this.empleado==null){
      this.empleadoService.add(modelo).subscribe({
        next:(data)=>{
          //this.mostrarAlerta("Departamento fue creado", "Listo");        
          this.dialogoReferencia.close("creado");
          Swal.fire('Exito','Se guardó el empleado exitosamente','success');
        },error:(e)=>{
          this.dialogoReferencia.close;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!, no se pudo guardar al empleado"
          });
        }
      });
    }else{
      this.empleadoService.update(this.empleado.idEmpleado,modelo).subscribe({
        next:(data)=>{
          //this.mostrarAlerta("Departamento fue actualizado", "Listo");
          this.dialogoReferencia.close("editado");
          Swal.fire('Exito','Se actualizó el empleado exitosamente','success');
        },error:(e)=>{
          this.dialogoReferencia.close
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!, no se pudo editar los datos del empleado"
          });
        }
      });
    }
    
  }

  ngOnInit(): void {
    if(this.empleado){
      this.formEmpleado.patchValue({
        nombreCompleto: this.empleado.nombreCompleto,
        idDepartamento: this.empleado.idDepartamento,
        sueldo: this.empleado.sueldo,
        fechaContrato: moment(this.empleado.fechaContrato,'DD/MM/YYYY')
      })
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }
  }

}
