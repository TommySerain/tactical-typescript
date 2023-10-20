import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Grid } from "./Grid";
import { Healer } from "./Healer";
import { Personnage } from "./Personnage";
import { Villagers } from "./Villagers";
import { Warrior } from "./Warrior";

export class Recruiter extends Personnage{
    public constructor(side: PersonnageSide, grid: Grid, coordonnees: [number, number]){
        const img = "src/img/recruiter.png";
        super(
            4, //nbvie
            4, //nbvieMax
            2, //nbAction
            0, //nbMana
            PersonnageType.recruiter, //type
            coordonnees, //coordonees
            [PersonnageAction.deplacer, PersonnageAction.rien, PersonnageAction.recruter, PersonnageAction.entrainer], //actions
            img, //img
            side, //side
            grid, //grid
        );
    }

    public recruite(cible: Personnage) {
        if (cible.getSide() != PersonnageSide.neutre) {
            this.useAction();
            alert("Ce personnage a déjà un camp et ne changera pas.");
        }
        cible.setSide(this.getSide());
        cible.getGrid().updateGridBackgroundColors();
        this.useAction();
    
    }
    
    public train(cible: Personnage, type: PersonnageType): Personnage{
        if (cible.getType() !== PersonnageType.villager) {
            return cible;
        }
    
        cible.getGrid().removePersonnageFromCase(cible.getCoordonnees());
    
        let nouveauPersonnage: Personnage;
        nouveauPersonnage = new Warrior(cible.getSide(), cible.getGrid(), cible.getCoordonnees());

        nouveauPersonnage.setNbVie(cible.getNbVie());
        nouveauPersonnage.setNumber(cible.getNumber());

        this.grid.removePersonnageFromCase(cible.getCoordonnees());
        this.grid.removePersonnageList(cible);
        this.getGrid().addPersonnageList(nouveauPersonnage);
        this.getGrid().displayPersonnageOnCase(nouveauPersonnage, cible.getCoordonnees(), nouveauPersonnage.getImg());
        return nouveauPersonnage;
    }
}