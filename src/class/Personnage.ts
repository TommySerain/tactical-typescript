import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";

export abstract class Personnage{

    protected nbVie: number;
    protected nbVieMax: number;
    protected nbAction: number;
    protected nbMana: number;
    protected type: PersonnageType;
    protected number: number=0;
    protected coordonees:[number, number];
    protected actions:PersonnageAction[];
    protected side: PersonnageSide=PersonnageSide.neutre;
    protected active:boolean=true;

    public constructor(
        nbVie: number,
        nbVieMax: number,
        nbAction: number,
        nbMana: number,
        type:PersonnageType,
        coordonees:[number, number],
        actions:PersonnageAction[],
        side:PersonnageSide,
        )
    public constructor(
        nbVie: number,
        nbVieMax: number,
        nbAction: number,
        nbMana: number,
        type:PersonnageType,
        coordonees:[number, number],
        actions:PersonnageAction[],
        side:PersonnageSide,
        number?: number,
        ){
            this.nbVie = nbVie;
            this.nbVieMax = nbVieMax;
            this.nbAction = nbAction;
            this.nbMana = nbMana;
            this.type = type;
            this.coordonees = coordonees;
            this.actions = actions;
            this.side = side;
            if (number) this.number = number;
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

    public getSide(): PersonnageSide {
        return this.side;
    }
    public setSide(value: PersonnageSide):void {
        this.side = value;
    }

    public getNumber(): number {
        return this.number;
    }
    public setNumber(value: number):void {
        this.number = value;
    }

    public getCoordonnes(): [number,number] {
        return this.coordonees;
    }
    public setCoordonees(value: [number,number]):void {
        this.coordonees = value;
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
    public move(): void {
        this.setNbAction(this.nbAction-1);
        if (this.getNbAction()===0) {
            this.setActive(false);
        }
        //TODO: implémenter
    }

    public useAction(){
        this.setNbAction(this.getNbAction()-1);
        if (this.getNbAction()===0){
            this.setActive(false);
        }
    }
}