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
        nouveauPersonnage = new Warrior(this.getSide(), cible.getGrid(), cible.getCoordonnees());

    
        // Transférez les données pertinentes de l'ancien personnage au nouveau (par exemple, les points de vie, etc.)
        nouveauPersonnage.setNbVie(cible.getNbVie());
        nouveauPersonnage.setNumber(cible.getNumber());
        nouveauPersonnage.setCoordonnees(cible.getCoordonnees());

        // Retirez l'ancien personnage de la liste des personnages actifs
        cible.getGrid().removePersonnageList(cible);

        // Ajoutez le nouveau personnage à la liste
        cible.getGrid().addPersonnageList(nouveauPersonnage);

        // Utilisez la méthode de la grille pour afficher le nouveau personnage sur la case
        cible.getGrid().displayPersonnageOnCase(nouveauPersonnage, cible.getCoordonnees(), this.getImg());
    
        return nouveauPersonnage; // Renvoyez la nouvelle instance créée ou null si la formation n'a pas abouti
    }
}