import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departamento } from 'src/app/Interfaces/departamento';
import { DepartamentoService } from 'src/app/Services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-add-edit-dpto',
  templateUrl: './dialog-add-edit-dpto.component.html',
  styleUrls: ['./dialog-add-edit-dpto.component.css']
})
export class DialogAddEditDptoComponent implements OnInit {

  formDepartamento: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";

  constructor(
    private dialogReference: MatDialogRef<DialogAddEditDptoComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private departamentoService: DepartamentoService,
    @Inject (MAT_DIALOG_DATA) public departamento:Departamento
  ) { 
    this.formDepartamento = this.formBuilder.group({
      nombre: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.departamento){
      this.formDepartamento.patchValue({
        nombre: this.departamento.nombre
      })
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }
  }

  mostrarAlerta(msg: string, action:string){
    this.snackBar.open(msg,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000  
    })
  }

  addEditDepartamento(){
    console.log(this.formDepartamento.value);
    const modelo:Departamento={
      idDepartamento:0,
      nombre: this.formDepartamento.value.nombre,
    }
    if(this.departamento==null){
      this.departamentoService.add(modelo).subscribe({
        next:(data)=>{
          //this.mostrarAlerta("Empleado fue creado", "Listo");
          this.dialogReference.close("creado");
          Swal.fire('Exito','Se guardó el departamento exitosamente','success');
        },error:(e)=>{
          //this.mostrarAlerta("No se pudo crear", "Aceptar");
          this.dialogReference.close;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!, no se puedo guardar el departamento"
          });
        }
      });
    }else{
      this.departamentoService.update(this.departamento.idDepartamento,modelo).subscribe({
        next:(data)=>{
          //this.mostrarAlerta("Empleado fue actualizado", "Listo");
          this.dialogReference.close("editado");
          Swal.fire('Exito','Se actualizó el departamento exitosamente','success');
        },error:(e)=>{
          //this.mostrarAlerta("No se pudo actualizar", "Aceptar");
          this.dialogReference.close;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!, no se puedo editar el departamento"
          });
        }
      });
    }
    
  }

}
