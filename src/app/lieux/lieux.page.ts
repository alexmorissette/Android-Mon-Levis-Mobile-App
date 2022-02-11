import { Lieu } from 'src/app/interfaces/lieu';
import { HereService } from './../services/here.service';

import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LIEUX } from 'src/assets/data/lieux';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lieux',
  templateUrl: 'lieux.page.html',
  styleUrls: ['lieux.page.scss']
})
export class LieuxPage implements OnInit{

public lieux: Lieu[] = [];
public tousLieux: Lieu[] = [];
public lieuxData = LIEUX;
private places: any;
private placesSearch: any;
public LIEU_STORAGE: string = "lieux"; //"lieux <= la liste(RAM) s'en va dans le storage(disque) avec set"
  //static LIEU_STORAGE: any;

constructor(private toastController: ToastController, private here: HereService, public activatedRoute: ActivatedRoute) {}
async ngOnInit() {

  await this.loadListeLieux();
}


private async loadListeLieux(){
  const listeLieux = await Storage.get({
    key: this.LIEU_STORAGE
  });
  this.lieux = JSON.parse(listeLieux.value) || [];
  this.tousLieux = this.lieux.concat(this.lieuxData);
}

// Affichage des lieux à la saisie dans l'input
async updateSearch(query: string){
  this.places = await this.here.getLocations(query);
}

private InListLieux():boolean {
  let ok: boolean;
  this.tousLieux.every(lieu => {
    if(this.places[0]["title"] == lieu.titre){
      // le lieu existe dans la liste
      ok = true;
    }else{
      ok = false;
    }
  });
  return ok;
}


// Lors du clique du bouton Enregistrer
async onSubmitPlace(){
  if(!this.InListLieux()){
    await this.addLieuToList();
    // Confirmation de l'ajout
    const toastAjout = await this.toastController.create({
      header: "Ajout", 
      message: "Lieu ajouté avec succès!\n",
      duration: 2000,
      position: "bottom",
      buttons:[
        {
          icon: "checkmark-circle",
          handler: () => {}
        }
      ]
    });
    await toastAjout.present()
    // Erreur
  }else{
    const toastErreur = await this.toastController.create({
      header: "Erreur", 
      message: "Impossible d'ajouter ce lieu ou il exsite déjà dans la liste!\n",
      duration: 3000,
      position: "bottom",
      buttons:[
        {
          icon: "checkmark-circle",
          handler: () => {}
        }
      ]
    });
    await toastErreur.present()
  }  // end if
} // onSubmit()

// Sauvegarder les données du lieu dans le modèle
private async saveLieu(lieu: Lieu) {
  const id = this.places[0].id;
  const img = "place-placeholder.png";
  const titre = this.places[0].title;
  const description = this.places[0].address.label;
  const map = "";
  const coords = this.places[0].position;
  return{
        id: id, // ajouter les coords
        img: img,
        titre: titre,
        description: description,
        map: map,
        coords:{
          lat: coords.lat,
          lng: coords.lng
        }
      }
  }

  // Ajouter le lieu à la liste du storage
  public async addLieuToList(){
    const lieuCatch = await this.placesSearch;
    const savedLieu = await this.saveLieu(lieuCatch);
    this.lieux.unshift(savedLieu);
    Storage.set({
      key: this.LIEU_STORAGE,
      value: JSON.stringify(this.lieux)
    });
  }

} // Class


