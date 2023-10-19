import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Grid } from "./Grid";
import { Personnage } from "./Personnage";

export class Villagers extends Personnage {
    public constructor(side: PersonnageSide, grid: Grid, coodonnées:[number, number]) {
        const img = "src/img/villager.webp";
        super(
            2, //nbvie
            2, //nbvieMax
            2, //nbAction
            0, //nbMana
            PersonnageType.villager, //type
            coodonnées, //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien], //actions
            img, //img
            side, //side
            grid //grid
        );
    }

}
