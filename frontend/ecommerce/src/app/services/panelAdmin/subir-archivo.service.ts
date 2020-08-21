import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  public URL: string;
  constructor(
    private http: HttpClient
  ) { 
    //this.URL = 'http://localhost:8000/api/viewset/'; /*LOCAL*/
    this.URL = 'https://phoenixstore.site/api/viewset/image/'; /*PRODUCCION*/
  }

  subirFoto(imgFile: File){
    const formData = new FormData();
    formData.append('img_route', imgFile);

    return this.http.post(this.URL+'image/', formData).pipe(
      catchError(err=>{
        return throwError('ERROR PETICION SUBIR IMAGEN')
      })
    );
  }

  actualizarFoto(imgFileUpdate: File, id:number){
    const formData = new FormData();
    formData.append('img_route', imgFileUpdate);
    
    return this.http.put(this.URL+'image/'+id+'/', formData).pipe(
      catchError(err=>{
        return throwError('ERROR PETICION ACTUALIZAR IMAGEN');
      })
    );
  }
}
