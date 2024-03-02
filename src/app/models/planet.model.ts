export interface Planet{
  name: string;
  climate: string;
  population: string;
  terrain: string;
  residents: Resident[];
  url: string;
  diameter:string;
  gravity:string;
  orbital_period:string;
  rotation_period:string;
  surface_water:string;

}
export interface Resident {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string;
  hair_color:string;
  skin_color:string;
  eye_color:string;
  birth_year:string;
}
export interface CardData {
  imageId: string;
  state: "default" | "flipped" | "matched";
}
