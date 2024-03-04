import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Empleado } from 'src/app/Interfaces/empleado';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private dialogReference: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public empleado: Empleado) { }

  ngOnInit(): void {
  }

  confirmarEliminacion(){
    if(this.empleado){
      this.dialogReference.close("eliminar")
    }
  }

}
