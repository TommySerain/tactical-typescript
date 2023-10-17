import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Personnage } from "./Personnage";

export class Healer extends Personnage{
    public constructor(side: PersonnageSide){
        super(
            5, //nbvie
            5, //nbvieMax
            2, //nbAction
            5, //nbMana
            PersonnageType.warrior, //type
            [1, 1], //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien, PersonnageAction.rechargerMana], //actions
            side, //side
        );
    }

    public heal(cible: Personnage){
        if (cible.getNbVie()===cible.getNbVieMax()) {
            this.useAction();
            return "Il ne se passe rien, la cible a tous es points de vie"
        }
        if(cible.getNbVie()>=cible.getNbVieMax()-2){
            cible.setNbVie(cible.getNbVieMax());
            this.setNbAction(this.getNbAction()-1);
            if (this.getNbAction()===0){
                this.setActive(false);
            }
            return "Bien joué, la vie de la cible est à fond"
        }
        cible.setNbVie(cible.getNbVie()+2)
        this.useAction();
        return "La cible est soigné de 2 points de vie"
    }
}