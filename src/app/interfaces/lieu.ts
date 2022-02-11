export interface Lieu {
    id: string;
    img: string;
    titre: string;
    description: string;
    map: string;
    coords: {
        lat: number;
        lng: number;
    }
}