
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LIEUX } from 'src/assets/data/lieux';

@Component({
  selector: 'app-lieux',
  templateUrl: 'lieux.page.html',
  styleUrls: ['lieux.page.scss']
})
export class LieuxPage{
public lieux = LIEUX;
//public urlLieu: string;

constructor(private toastController: ToastController) {}

async onSubmit(formData: NgForm){

    // Validation
    if(!formData.valid){
      const toastValid = await this.toastController.create({
        header: "Validation", 
        message: "Url invalide!\n",
        duration: 0,
        position: "bottom",
        buttons:[
          {
            icon: "checkmark-circle",
            handler: () => {}
          }
        ]
      });
      await toastValid.present()

    }else{
      //addLieuToList(formData);
      const toastAjout = await this.toastController.create({
        header: "Ajout", 
        message: "Lieu ajouté avec succès!\n",
        duration: 0,
        position: "bottom",
        buttons:[
          {
            icon: "checkmark-circle",
            handler: () => {}
          }
        ]
      });
      await toastAjout.present()
    }

  } // onSubmit()
  
} // Class



//********************** FUNCTIONS*********************** */
// function addLieuToList(formData:NgForm) {
//   throw new Error('Function not implemented.');
// }

