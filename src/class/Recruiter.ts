import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Personnage } from "./Personnage";

export class Recruiter extends Personnage{
    public constructor(side: PersonnageSide){
        super(
            4, //nbvie
            4, //nbvieMax
            2, //nbAction
            0, //nbMana
            PersonnageType.recruiter, //type
            [1, 1], //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien, PersonnageAction.recruter, PersonnageAction.entrainer], //actions
            side, //side
        );
    }

    public recruite(cible: Personnage):string{
        if(cible.getSide()!=PersonnageSide.neutre){
            this.useAction();
            return "Ce personnage a déjà un camp et il ne changera pas."
        }
        cible.setSide(this.getSide());
        this.useAction();
        return "Ce personnage est maintenant de votre côté."
    }

    public train(cible: Personnage, type: PersonnageType):string{
        if(cible.getType()!==PersonnageType.villager){
            this.useAction();
            return "Ce personnage a déjà un métier, il ne peut pas changer."
        }
        this.useAction();
        cible.setType(type);
        return `Ce personnage est maintenant un ${cible.getType()}`
    }
}