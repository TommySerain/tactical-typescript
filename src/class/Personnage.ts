import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Grid } from "./Grid";
import { Healer } from "./Healer";
import { Recruiter } from "./Recruiter";
import { Warrior } from "./Warrior";

export abstract class Personnage{

    protected nbVie: number;
    protected nbVieMax: number;
    protected nbAction: number;
    protected nbMana: number;
    protected type: PersonnageType;
    protected number: number=0;
    protected coordonnees:[number, number];
    protected coordonneesPossible:[number, number][]=[];
    protected actions:PersonnageAction[];
    private img: string;
    protected side: PersonnageSide=PersonnageSide.neutre;
    protected active:boolean=false;
    protected grid:Grid;
    public x: number;
    public y: number;

    public constructor(
        nbVie: number,
        nbVieMax: number,
        nbAction: number,
        nbMana: number,
        type:PersonnageType,
        coordonnees:[number, number],
        actions:PersonnageAction[],
        img:string,
        side:PersonnageSide,
        grid: Grid
        )
    public constructor(
        nbVie: number,
        nbVieMax: number,
        nbAction: number,
        nbMana: number,
        type:PersonnageType,
        coordonnees:[number, number],
        actions:PersonnageAction[],
        img:string,
        side:PersonnageSide,
        grid: Grid,
        number?: number,
        ){
            this.nbVie = nbVie;
            this.nbVieMax = nbVieMax;
            this.nbAction = nbAction;
            this.nbMana = nbMana;
            this.type = type;
            this.coordonnees = coordonnees;
            this.actions = actions;
            this.img = img;
            this.side = side;
            this.grid = grid;
            this.x = this.getGrid().getHeight();
            this.y = this.getGrid().getWidth();
            
            this.coordonneesPossible = this.defineCoordonneesPossible(coordonnees)

            if (number) this.number = number;
            grid.displayPersonnageOnCase(this, this.coordonnees, img);
            this.grid.addPersonnageList(this);
    }


    public getNbVie(): number {
        return this.nbVie
    }
    public setNbVie(value: number):void {
        this.nbVie = value;
    }

    public getNbVieMax(): number {
        return this.nbVieMax
    }
    public setNbVieMax(value: number):void {
        this.nbVieMax = value;
    }
    
    public getNbAction(): number {
        return this.nbAction;
    }
    public setNbAction(value: number):void {
        this.nbAction = value;
    }

    public getNbMana(): number {
        return this.nbMana;
    }
    public setNbMana(value: number):void {
        this.nbMana = value;
    }

    public getType(): PersonnageType {
        return this.type;
    }
    public setType(value: PersonnageType):void {
        this.type = value;
    }

    protected getImg(): string {
        return this.img;
    }
    protected setImg(value: string) {
        this.img = value;
    }

    public getSide(): PersonnageSide {
        return this.side;
    }
    public setSide(value: PersonnageSide):void {
        this.side = value;
    }

    public getGrid(): Grid {
        return this.grid;
    }
    public setGrid(value: Grid):void {
        this.grid = value;
    }

    public getNumber(): number {
        return this.number;
    }
    public setNumber(value: number):void {
        this.number = value;
    }

    public getCoordonnees(): [number,number] {
        return this.coordonnees;
    }
    public setCoordonnees(value: [number,number]):void {
        this.coordonnees = value;
    }

    public getCoordonneesPossible(): [number,number][]{
        return this.coordonneesPossible
    }

    public setCoordonneesPossible(value: [number,number][]):void {
        this.coordonneesPossible = value;
    }

    public getAction(): PersonnageAction[]{
        return this.actions;
    }
    public setAction(value: PersonnageAction[]):void {
        this.actions = value;
    }

    public isActive(): boolean {
        return this.active;
    }
    public setActive(value: boolean):void {
        this.active = value;
    }

    public Nothing():string{
        this.setNbAction(0);
        if(this.getNbVie()<this.getNbVieMax()){
            this.nbVie+1;
        }
        this.setActive(false);
        return "Je vais me reposer"
    }

    public useAction(){
        this.setNbAction(this.getNbAction()-1);
        if (this.getNbAction()===0){
            this.setActive(false);
        }
    }
    private defineCoordonneesPossible(coordonnees: [number, number]): [number, number][] {
        const x = coordonnees[0];
        const y = coordonnees[1];
        const possibleCoordonnes: [number, number][] = [];
    
        if (x > 1) possibleCoordonnes.push([x - 1, y]);
        if (x < this.x) possibleCoordonnes.push([x + 1, y]);
        if (y > 1) possibleCoordonnes.push([x, y - 1]);
        if (y < this.y) possibleCoordonnes.push([x, y + 1]);
    
        return possibleCoordonnes;
    }

    public move(newCoordinates: [number, number]): void {
        console.log("Déplacement en cours...", this.coordonnees, "vers", newCoordinates);
        console.log("Coordonnées possibles : ", this.getCoordonneesPossible());
        console.log("Nouvelles coordonnées : ", newCoordinates);
    
        const possibleCoordinates = this.getCoordonneesPossible();
    
        if (this.isCoordonneesInArray(newCoordinates, possibleCoordinates)) {
            let occupant = this.grid.getOccupantAtCoordinates(newCoordinates);
    
            if (!occupant) {
                // La case est vide, procédez au déplacement
                const oldCoordinates = this.getCoordonnees();
                this.grid.removePersonnageFromCase(oldCoordinates);
                requestAnimationFrame(() => {
                    this.setCoordonnees(newCoordinates);
                    this.setCoordonneesPossible(this.defineCoordonneesPossible(this.getCoordonnees()));
                    this.grid.displayPersonnageOnCase(this, this.coordonnees, this.img);
                    this.useAction();
                    this.grid.updateGridBackgroundColors();
                });
            }else if(this.getType()===PersonnageType.warrior){
                let warriorUnknown = this as unknown ;
                let warriorThis = warriorUnknown as Warrior;
                if(this.getSide()!==occupant.getSide()){
                    warriorThis.attack(occupant);
                } else{
                    alert( "On ne tape pas les copains")
                }
            }else if (this.getType()===PersonnageType.healer){
                let healerUnknown = this as unknown ;
                let healerThis = healerUnknown as Healer;
                if(this.getSide()!==occupant.getSide()){
                    alert( "On ne soigne pas l'ennemis")
                } else{
                    healerThis.heal(occupant);
                }
            }else if(this.getType()===PersonnageType.recruiter){
                let recruiterUnknown = this as unknown ;
                let recruiterThis = recruiterUnknown as Recruiter;
                if(occupant.getSide()===PersonnageSide.neutre){
                    recruiterThis.recruite(occupant);
                }else if(occupant.getSide()!==this.getSide()){
                    alert("Il a déjà un camps, il ne viendra pas")
                }else if(occupant.getSide()===this.getSide()){
                    occupant = recruiterThis.train(occupant, PersonnageType.warrior);
                }
            }
        }
    }


    
    private isCoordonneesInArray(target: [number, number], coordonnesArray: [number, number][]): boolean {
        for (const coordonnees of coordonnesArray) {
            if (coordonnees[0] === target[0] && coordonnees[1] === target[1]) {
                return true;
            }
        }
        return false;
    }
}