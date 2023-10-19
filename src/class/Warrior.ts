import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Grid } from "./Grid";
import { Personnage } from "./Personnage";

export class Warrior extends Personnage{
    public constructor(side: PersonnageSide, grid: Grid, coordonnees: [number, number]){
        const img = "src/img/warrior.webp";
        super(
            4, //nbvie
            4, //nbvieMax
            2, //nbAction
            0, //nbMana
            PersonnageType.warrior, //type
            coordonnees, //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien, PersonnageAction.attaquer], //actions
            img, //img
            side, //side
            grid //grid
        );
    }

    public attack(cible:Personnage|null):string{
        cible!.setNbVie(cible!.getNbVie()-2);
        if(cible!.getNbVie()<=0){
            this.useAction();
            cible?.setSide(PersonnageSide.mort);
            this.grid.removePersonnageFromCase(cible!.getCoordonnees());
            this.grid.removePersonnageList(cible!);
            cible=null;
            console.log(this.grid.getPersonnageList());
            // alert("La cible est éliminée")
            return "La cible est éliminée";
        }
        this.useAction();
        alert("belle attaque, il lui reste "+cible!.getNbVie()+" point(s) de vie");
        return "belle attaque, il lui reste "+cible!.getNbVie()+" point(s) de vie";
    }
}