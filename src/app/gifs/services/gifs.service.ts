import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http:HttpClient) {
    //otra forma de hacerlo
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  //   if(localStorage.getItem('historial')) {
  //     this._historial = JSON.parse(localStorage.getItem('historial')!) // se colola la ! para que lo obvie
  //   }
  }
   
  

  private _historial: string[] = [];
  private apiKey:string = '1DG7zoC9PhT5qYkqF3Lw63QkmEP2ONix';
  private Url:string ='https://api.giphy.com/v1/gifs';
  public resultados:Gif [] = [];

  get historial() {
    return [...this._historial];
  }

 //async 
  buscarGifs(query:string = ''){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));      
    }    
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=1DG7zoC9PhT5qYkqF3Lw63QkmEP2ONix&q=cheeseburgers&limit=20');
    // const data = await resp.json();
    // console.log(this._historial);

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('q',query);
    // console.log(params.toString());


     this.http.get<SearchGifsResponse>(`${this.Url}/search`,{params})
    .subscribe((resp)=>{console.log(resp.data);
      this.resultados = resp.data;
     localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
    
    
  }
  
}
