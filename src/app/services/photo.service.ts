import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IPhoto } from '../interfaces/IPhoto';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
//import { Component } from '@angular/core';
import { Coordinates, Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  // DECLARATION DES VARIABLES
  public photos: IPhoto[] = [];
  private PHOTO_STORAGE: string = "photos"; // "photos <= la liste(RAM) s'en va dans le storage(disque)"

  constructor(public router:Router) { }


  // Capturer la photo de l'appaeril photo ou d'un album présent (getPhoto)
  public async newImgToGallery(){
    const photoSnap = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      
    });
    // Sauvegarder l'image capturée dans la liste photos(IPhoto)
    // Puis la mettre dans le Local Storage définitif
    const savedImg = await this.savePict(photoSnap);
    this.photos.unshift(savedImg);
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })
  }

  // Charger la photo dans la liste
  public async loadSavedPict(){
    const photoList = await Storage.get({key: this.PHOTO_STORAGE});
    this.photos = JSON.parse(photoList.value) || [];
    
    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filePath,
        directory: Directory.Data
      });
      
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`; // Attention - back tilt ou => photo.webviewPath = "data:image/jpeg;base64," + readFile.data;
      
    }
  }
  
  // Sauvegarder la photo
  private async savePict(photoCam: Photo) {
    // Convertir en base64
    const b64Data = await this.readAsBase64(photoCam);
    const fileName = "img_" + new Date().getTime() + ".jpeg";
    const coords = await this.getCoords();
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: b64Data,
      directory: Directory.Data
    });
    // Geo

    return{
      filePath: fileName,
      webviewPath: photoCam.webPath,
      coords:{
        lat: coords.latitude,
        lng: coords.longitude
      }
      
    }
  }


  // ******************* CONVERSIONS ***********************
  private async readAsBase64(photoCam: Photo) {
    const response = await fetch(photoCam.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.readAsDataURL(blob);
  });

  
  // ********************* GEOLOCATION***********************/

  async getCoords() {

    return new Promise<Coordinates>((resolve, reject) => {
      const gpsOptions: GeolocationOptions = {
        enableHighAccuracy: true
      } 
      const watch = Geolocation.watchPosition(gpsOptions);
      watch.subscribe((data) => {
        // si data possède coords
        if ("coords" in data){
          resolve(data.coords);
        }else{
          // try catch
          reject(data);
        }
      });
      });
  }


}
