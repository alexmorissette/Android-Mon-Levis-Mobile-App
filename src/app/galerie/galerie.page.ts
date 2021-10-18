import { Component } from '@angular/core';
import { PHOTOS } from 'src/assets/data/photos';

@Component({
  selector: 'app-galerie',
  templateUrl: 'galerie.page.html',
  styleUrls: ['galerie.page.scss']
})
export class GaleriePage {
  public photos = PHOTOS;
  //public imgWidth: number = 6;

  constructor() {}

}
