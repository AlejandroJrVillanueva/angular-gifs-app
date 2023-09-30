import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearcResponse } from '../interface/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string='7b8EXIgYlRMhh2JT4SFNuZ4pDoQvYIeL';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadSaveStorage();
    // console.log('Gifs Service Ready!');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  searchTag(tag:string):void {
  if (tag.length === 0) return;
  this.organizeHistory(tag);

  // forma tradicional de Js
  // fetch('https://api.giphy.com/v1/gifs/search?api_key=7b8EXIgYlRMhh2JT4SFNuZ4pDoQvYIeL&q=flash&limit=10')
  // .then(resp => resp.json())
  // .then(data => console.log(data));

  const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit', '10')

  this.http.get<SearcResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(resp => {
      this.gifList = resp.data;
    });
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      // solo los que son diferentes al tag nuevo los voy a dejar pasar
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void
  {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadSaveStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return

    this.searchTag(this._tagsHistory[0]);
  }

}
