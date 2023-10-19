import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Grid } from "./Grid";
import { Personnage } from "./Personnage";

export class Healer extends Personnage{
    public constructor(side: PersonnageSide, grid: Grid, coordonnees: [number, number]) {
        const img = "src/img/Druid.png";
        super(
            5, //nbvie
            5, //nbvieMax
            2, //nbAction
            5, //nbMana
            PersonnageType.healer, //type
            coordonnees, //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien, PersonnageAction.rechargerMana], //actions
            img, //img
            side, //side
            grid, //grid
        );
    }

    public heal(cible: Personnage){
        if (cible.getNbVie()===cible.getNbVieMax()) {
            this.useAction();
            alert("Il ne se passe rien, la cible a tous ses points de vie");
            return "Il ne se passe rien, la cible a tous ses points de vie";
        }
        if(cible.getNbVie()>=cible.getNbVieMax()-2){
            cible.setNbVie(cible.getNbVieMax());
            this.setNbAction(this.getNbAction()-1);
            if (this.getNbAction()===0){
                this.setActive(false);
            }
            alert("Bien joué, la vie de la cible est à fond");
            return "Bien joué, la vie de la cible est à fond";
        }
        cible.setNbVie(cible.getNbVie()+2);
        this.useAction();
        alert("La cible est soigné de 2 points de vie, il a maintenant "+cible.getNbVie()+" points de vie sur "+cible.getNbVieMax());
        return "La cible est soigné de 2 points de vie, il a maintenant "+cible.getNbVie()+" points de vie sur "+cible.getNbVieMax();
    }
}