
import { IPhoto } from './../interfaces/IPhoto';
import { PHOTOS } from './../../assets/data/photos';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Lieu } from '../interfaces/lieu';
import { LIEUX } from 'src/assets/data/lieux';
import { Storage } from '@capacitor/storage';

declare var google;

@Component({
  selector: 'app-carte',
  templateUrl: 'carte.page.html',
  styleUrls: ['carte.page.scss']
})
export class CartePage implements OnInit {
  @ViewChild('map') mapElement: ElementRef; 
  map: any; // réfère à #map dans le html (anchor)
  public lieuxData = LIEUX; // Lieux prédéfinis (Data)
  public lieux: Lieu[] = []; // Lieux ajoutés à partir de la recherche
  public tousLieux: Lieu[] = []; // Tous les lieux ensemble
  public LIEU_STORAGE: string = "lieux";

  public photosData = PHOTOS;
  public photos: IPhoto[] = [];
  public toutesPhotos: IPhoto[] = []; // Tous les lieux ensemble
  public PHOTO_STORAGE: string = "photos";


  private titre: string;
  private lat: number;
  private lng: number;


  constructor(public photoService:PhotoService, public activatedRoute: ActivatedRoute) {}

 async ngOnInit(){
    //Loader les photos
    this.photoService.loadSavedPict();
    await this.loadListePhotos();
    this.addPhotoMarq();
    this.addPhotoDataMarq();

    // Obtenir les valeurs des données gps et titre du lieu passés en paramètre du la page lieux
    this.activatedRoute.paramMap.subscribe(params => {
      this.lat = parseFloat(params.get('lat'));
      this.lng = parseFloat(params.get('lng'));
      this.titre = params.get('titre');
    });
    await this.loadListeLieux();
    this.addLieuMarq();
  }
  
  ngAfterViewInit() {
    this.loadMap();
  }
  // Loader la liste des photos data 
  private async loadListePhotos(){
    const listePhotos = await Storage.get({
      key: this.PHOTO_STORAGE
    });
    this.photos = JSON.parse(listePhotos.value) || [];
    //this.toutesPhotos = this.photos.concat(this.photosData);
  }

  // Loader la liste des lieux Data et la concaténer aux lieux saisis.
  private async loadListeLieux(){
    const listeLieux = await Storage.get({
      key: this.LIEU_STORAGE
    });
    this.lieux = JSON.parse(listeLieux.value) || [];
    this.tousLieux = this.lieux.concat(this.lieuxData);
  }
  
  private loadMap(){
    if(this.mapElement !== undefined){
      // Set les options de la map
      if(this.lat){
        const latLng = new google.maps.LatLng(this.lat, this.lng);
        var mapOptions = {
          center: latLng,
          zoom: 16
        }
      }else{
        const latLng = new google.maps.LatLng(46.81, -71.18);
        var mapOptions = {
          center: latLng,
          zoom: 10
        }
      }
      // Pour loader la map avec les coords du lieu centré
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }
  }

  // **********************Marqueurs LIEUX
  async addLieuMarq(){
    const iconsPath2 = "http://maps.google.com/mapfiles/kml/pushpin/";
    //console.log(this.tousLieux);
    for (let L = 0; L < this.tousLieux.length; L++) {
      const marqLieu = await new google.maps.Marker({
        position: {lat: this.tousLieux[L].coords.lat, lng: this.tousLieux[L].coords.lng},
        map: this.map,
        title: this.tousLieux[L].titre,
        content: this.tousLieux[L].titre,
        icon: iconsPath2 + 'blue-pushpin.png' 
      });
      // Info Bulles
      const infoBulle = new google.maps.InfoWindow({
        content: marqLieu.content
      });
      marqLieu.addListener('click', () => {
        infoBulle.open(this.map, marqLieu);
      });
    }
  }

  // *******************Marqueurs PHOTOS
  public addPhotoMarq(){
    const iconsPath = "http://maps.google.com/mapfiles/kml/pal4/";
    this.photoService.photos.forEach(p => {
      const marqueur = new google.maps.Marker
      ({
        position: {lat: p.coords.lat, lng: p.coords.lng},
        map: this.map,
        title: p.filePath,
        content: "<img src='" + p.webviewPath + "' width='128px' height='auto' />",
        icon: iconsPath + 'icon46.png' 
      });
      // Info Bulles
      const infoBulle = new google.maps.InfoWindow({
        content: marqueur.content
      });
      // Au clic de la bulle
      marqueur.addListener('click', () => {
        infoBulle.open(this.map, marqueur);
      });
    });
  }

  public addPhotoDataMarq(){
    const iconsPath = "http://maps.google.com/mapfiles/kml/pal4/";
    const imgPath = "/assets/img/galerie/";
    this.photosData.forEach(p => {
      const marqueur = new google.maps.Marker
      ({
        position: {lat: p.coords.lat, lng: p.coords.lng},
        map: this.map,
        title: p.titre,
        content: "<img src='" + imgPath + p.img + "' width='128px' height='auto' />",
        icon: iconsPath + 'icon46.png' 
      });
      // Info Bulles
      const infoBulle = new google.maps.InfoWindow({
        content: marqueur.content
      });
      // Au clic de la bulle
      marqueur.addListener('click', () => {
        infoBulle.open(this.map, marqueur);
      });
    });
  }
}
  