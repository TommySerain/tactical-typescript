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

    public recruite(cible: Personnage):Personnage{
        if(cible.getSide()!=PersonnageSide.neutre){
            this.useAction();
            alert("Ce personnage a déjà un camp et il ne changera pas.")
            return cible
        }
        cible.getGrid().removePersonnageFromCase(cible.getCoordonnees());
        this.grid.removePersonnageList(cible);
        let villageois = new Villagers(this.getSide(), cible.getGrid(), cible.getCoordonnees());
        villageois.setNumber(cible.getNumber());
        villageois.setCoordonnees(cible.getCoordonnees());
        cible = villageois;
        this.useAction();
        // alert("Ce personnage est maintenant de votre côté.")
        return cible
    }

    public train(cible: Personnage, type: PersonnageType):Personnage{
        if(cible.getType()!==PersonnageType.villager){
            this.useAction();
            return cible
        }
        cible.getGrid().removePersonnageFromCase(cible.getCoordonnees());
        this.grid.removePersonnageList(cible);
        if (type===PersonnageType.warrior){
            let warrior=new Warrior(cible.getSide(), cible.getGrid(), cible.getCoordonnees());
            if(cible.getNbVie()!==cible.getNbVieMax()){
                warrior.setNbVie(cible.getNbVie());
            }
            warrior.setCoordonnees(cible.getCoordonnees());
            warrior.setNumber(cible.getNumber());
            cible=warrior;
            return cible;
        }
        if (type===PersonnageType.healer){
            let healer=new Healer(cible.getSide(), cible.getGrid(), cible.getCoordonnees());
            if(cible.getNbVie()!==cible.getNbVieMax()){
                healer.setNbVie(cible.getNbVie());
            }
            healer.setCoordonnees(cible.getCoordonnees());
            healer.setNumber(cible.getNumber());
            cible=healer;
            return cible;
        }
        if (type===PersonnageType.recruiter){
            let recruiter=new Recruiter(cible.getSide(), cible.getGrid(), cible.getCoordonnees());
            if(cible.getNbVie()!==cible.getNbVieMax()){
                recruiter.setNbVie(cible.getNbVie());
            }
            recruiter.setCoordonnees(cible.getCoordonnees());
            recruiter.setNumber(cible.getNumber());
            cible=recruiter;
            return cible;
        }
        return cible;
        // this.useAction();
        // cible.setType(type);
        // return `Ce personnage est maintenant un ${cible.getType()}`
    }
}