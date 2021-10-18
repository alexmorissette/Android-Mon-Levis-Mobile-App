
import { compileDeclarePipeFromMetadata, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LIEUX } from 'src/assets/data/lieux';

@Component({
  selector: 'app-lieux',
  templateUrl: 'lieux.page.html',
  styleUrls: ['lieux.page.scss']
})
export class LieuxPage implements OnInit{
public lieux = LIEUX;
public urlLieu: string;

constructor(private activatedRoute: ActivatedRoute, public toastController: ToastController ) {}

ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.urlLieu = params.get('urlLieu');
    });

    //this.activatedRoute.snapshot.paramMap.get("urlLieu");
  }
  
  async onSubmit(formData: NgForm) {

    // Validation
    if(!formData.valid){
      const toastValid = await this.toastController.create({
        header: "Validation", 
        message: "Url invalide!\n" + this.urlLieu,
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
        message: "Lieu ajouté avec succès!\n" + this.urlLieu,
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

