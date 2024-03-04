import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Departamento } from '../Interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint+"departamento/";

  constructor(private http: HttpClient) { }

  getList():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.apiUrl}lista`);
  }

  add(modelo: Departamento):Observable<Departamento>{
    return this.http.post<Departamento>(`${this.apiUrl}guardar`,modelo);
  }

  update(idEmpleado:number, modelo: Departamento):Observable<Departamento>{
    return this.http.put<Departamento>(`${this.apiUrl}actualizar/${idEmpleado}`,modelo);
  }

  delete(idEmpleado:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${idEmpleado}`);
  }

}
