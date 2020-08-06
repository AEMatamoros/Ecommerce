import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  public URL: string;
  constructor(
    private http: HttpClient
  ) { 
    this.URL = 'http://localhost:8000/api/viewset/image/'; /*LOCAL*/
    /*this.URL = 'http://52.201.212.27/api/viewset/image/'; PRODUCCION*/
  }

  subirFoto(imgFile: File){
    const formData = new FormData();
    formData.append('img_route', imgFile);

    return this.http.post(this.URL, formData);
  }
}
