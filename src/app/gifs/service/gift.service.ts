import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  constructor() { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  searchTag(tag:string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    console.log(this._tagsHistory);
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      // solo los que son diferentes al tag nuevo los voy a dejar pasar
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

}
