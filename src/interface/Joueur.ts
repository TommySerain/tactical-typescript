import { Personnage } from "./Personnage";

export interface Joueur {
    playerNumber: number;
    personnages:Personnage[];
}