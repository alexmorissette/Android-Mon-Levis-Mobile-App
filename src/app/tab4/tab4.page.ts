import { Component } from '@angular/core';
import { PHOTOS } from 'src/assets/data/photos';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  public photos = PHOTOS;
  //public imgWidth: number = 6;

  constructor() {}

}
