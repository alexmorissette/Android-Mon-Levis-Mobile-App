export interface Photo {
    id: number;
    titre: string;
    img: string;
    coords: {
        lat: number; 
        lng: number; 
      }
}