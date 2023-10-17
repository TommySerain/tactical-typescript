import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Personnage } from "./Personnage";

export class Villagers extends Personnage {
    public constructor(side: PersonnageSide) {
        super(
            2, //nbvie
            2, //nbvieMax
            2, //nbAction
            0, //nbMana
            PersonnageType.villager, //type
            [1, 1], //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien], //actions
            side, //side
        );
    }
}
