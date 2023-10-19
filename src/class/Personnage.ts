import { PersonnageAction } from "../enum/PersonnageAction";
import { PersonnageSide } from "../enum/PersonnageSide";
import { PersonnageType } from "../enum/PersonnageType";
import { Grid } from "./Grid";

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
    private defineCoordonneesPossible(coordonnees:[number, number]):[number, number][] {

        //ATTENTION CODE SMELL :
        if(this.coordonnees[0]===1){
            if(this.coordonnees[1]===1){
                return [[1,2],[2,1]]
            }else if(this.coordonnees[1]===this.y){
                return[[1,this.y-1],[2,this.y]]
            }else{
                return[[1,coordonnees[1]-1],[1,coordonnees[1]+1], [2,coordonnees[1]]];
            }
        }
        else if(this.coordonnees[1]===1){
            if(this.coordonnees[0]===1){
                return[[1,2],[2,1]];
            }else if(this.coordonnees[0]===this.x){
                return[[this.x-1,1],[this.x,2]];
            }else{
                return[[coordonnees[0]-1, 1],[coordonnees[0]+1, 1], [coordonnees[0], 2]];
            }
        }
        else if(this.coordonnees[0]===this.x){
            if(this.coordonnees[1]===this.y){
                return[[this.x-1,this.y],[this.x,this.y-1]];
            }else{
                return[[this.x,this.y-1], [this.x, this.y+1], [this.x-1, this.y]];
            }
        }
        else if(this.coordonnees[1]===this.y){
            if(this.coordonnees[0]===this.x){
                return[[this.x-1,this.y],[this.x,this.y-1]];
            }else{
                return[[this.x-1,this.y], [this.x+1, this.y], [this.x-1, this.y]];
            }
        }else{
            return[
                [this.coordonnees[0]-1, this.coordonnees[1]],
                [this.coordonnees[0]+1, this.coordonnees[1]],
                [this.coordonnees[0], this.coordonnees[1]-1],
                [this.coordonnees[0], this.coordonnees[1]+1]
            ];
        }
    }

    public move(newCoordinates: [number, number]): void {
        if (this.nbAction > 0 && this.active) {
            const possibleCoordinates = this.getCoordonneesPossible();
            if (this.isCoordinateInArray(newCoordinates, possibleCoordinates)) {
                this.grid.removePersonnageFromCase(this.coordonnees);
                this.setCoordonnees(newCoordinates);
                this.grid.displayPersonnageOnCase(this, this.coordonnees, this.img);
                this.useAction();
            }
        }
    }
    
    private isCoordinateInArray(target: [number, number], coordinatesArray: [number, number][]): boolean {
        for (const coordinates of coordinatesArray) {
            if (coordinates[0] === target[0] && coordinates[1] === target[1]) {
                return true;
            }
        }
        return false;
    }
}