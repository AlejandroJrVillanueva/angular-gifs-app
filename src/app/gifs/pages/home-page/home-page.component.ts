import { Component } from '@angular/core';
import { GifsService } from '../../service/gift.service';
import { Gif } from '../../interface/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private gifsService: GifsService){}

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }
}
