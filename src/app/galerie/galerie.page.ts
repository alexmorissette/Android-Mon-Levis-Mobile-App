import { Component, OnInit } from '@angular/core';
import { PHOTOS } from 'src/assets/data/photos';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-galerie',
  templateUrl: 'galerie.page.html',
  styleUrls: ['galerie.page.scss']
})
export class GaleriePage implements OnInit {
  public photos = PHOTOS;
  //public imgWidth: number = 6;

  constructor(public photoService:PhotoService) {}

  async ngOnInit(){
    await this.photoService.loadSavedPict();
  }

}
