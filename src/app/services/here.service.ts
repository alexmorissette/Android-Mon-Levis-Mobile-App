import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class HereService {
  private platform: any;
  constructor() {
    this.platform = new H.service.Platform({
      "app_id": "jQmyV1LAhgQDgbKYSE5y",
      "apikey": "c2Uo9BGDHP2sXCqxX9UNCwENkAvtY1ONyVCpJnAbfKo"
    });
  }

  // Fait un appel au service here pour avoir des suggestions basées sur le texte saisie dans notre input
  public getLocations(query:string){
    // Garde pour régler l'erreur de chaine vide du q
    if(!query){
      return;
    }
    let searchService = this.platform.getSearchService();
    return new Promise((resolve, reject) => {
      searchService.autosuggest({
        q: query,
        at: '46.81,-71.18',
        limit: 4
      }, success, failed); // on passe les fonctions et pas le résultat, on doit donc enlever les ()
      function success(result){
        resolve(result.items);
        console.log(result.items);
      }
      function failed(error){
        reject(error);
      }
    });
  }

}
