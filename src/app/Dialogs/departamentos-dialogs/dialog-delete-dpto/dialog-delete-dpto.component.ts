import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Departamento } from 'src/app/Interfaces/departamento';

@Component({
  selector: 'app-dialog-delete-dpto',
  templateUrl: './dialog-delete-dpto.component.html',
  styleUrls: ['./dialog-delete-dpto.component.css']
})
export class DialogDeleteDptoComponent implements OnInit {

  constructor(private dialogReference: MatDialogRef<DialogDeleteDptoComponent>,
    @Inject(MAT_DIALOG_DATA) public departamento: Departamento) { }

  ngOnInit(): void {
  }

  confirmarEliminacion(){
    if(this.departamento){
      this.dialogReference.close("eliminar")
    }
  }

}
