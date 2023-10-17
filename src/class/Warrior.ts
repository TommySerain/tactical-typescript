import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Personnage } from "./Personnage";

export class Warrior extends Personnage{
    public constructor(side: PersonnageSide){
        super(
            4, //nbvie
            4, //nbvieMax
            2, //nbAction
            0, //nbMana
            PersonnageType.warrior, //type
            [1, 1], //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien, PersonnageAction.attaquer], //actions
            side, //side
        );
    }

    public attack(cible:Personnage|null):string{
        cible!.setNbVie(cible!.getNbVie()-2);
        if(cible!.getNbVie()<=0){
            cible=null;
            this.useAction();
            return "La cible est éliminée";
        }
        this.useAction();
        return "belle attaque";
    }
}