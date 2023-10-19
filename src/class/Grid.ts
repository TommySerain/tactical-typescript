import { PersonnageSide } from "../enum/PersonnageSide";
import { Case } from "../interface/Case";
import { Game } from "./Game";
import { Personnage } from "./Personnage";

export class Grid{

    public gridContainer:HTMLDivElement = document.querySelector('#grid-container')!;
    public gridCases:Case[] = [];
    private occupiedCases: Map<string, Personnage> = new Map();
    private personnageList: Personnage[] = [];
    private caseSize: string = "80px"
    public constructor(
        private height:number,
        private width:number,
        private game:Game
    ){
        this.gridContainer.style.display = 'grid';
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.height}, ${this.caseSize})`;
        this.gridContainer.style.gridTemplateRows = `repeat(${this.width}, ${this.caseSize})`;
        // this.gridContainer.style.gap = '20px';
        this.gridContainer.style.justifyContent = "center";
        this.gridContainer.style.marginTop = "20px";
        this.game=game;
    }

    public getHeight():number{
        return this.height;
    }
    public setHeight(height:number){
        if(this.height<=0){
            this.height = 10;
        }
        this.height= Math.round(height);
    }

    public getWidth():number{
        return this.width;
    }
    public setWidth(width:number){
        if(this.width<=0){
            this.width = 10;
        }
        this.width= Math.round(width);
    }

    public getCaseSize(): string {
        return this.caseSize;
    }
    public setCaseSize(value: string) {
        this.caseSize = value;
    }

    public getPersonnageList(): Personnage[] {
        return this.personnageList;
    }
    public addPersonnageList(value: Personnage) {
        this.personnageList.push(value);
    }
    public removePersonnageList(value: Personnage) {
        const personnageNewList = this.personnageList.filter((personnage)=>personnage !== value);
        this.personnageList = personnageNewList;
    }
    public getGame(): Game {
        return this.game;
    }
    public setGame(value: Game) {
        this.game = value;
    }

    public displayGrid(){
        if(this.gridContainer!==null){
            for (let i = 1; i <= this.height; i++) {
                for (let j = 1; j <= this.width; j++) {
                    const div = document.createElement('div');
                    div.classList.add('grid-cell');
                    const id: string= `case_${i}_${j}`;
                    div.setAttribute('id', id);
                    const coordonnees:string = `[${i},${j}]`;
                    div.setAttribute('data-coordinates', coordonnees);
                    div.addEventListener('click',()=>{
                        console.log(coordonnees);
                    })
                    const cases:Case ={x:i, y:j};
                    this.gridCases.push(cases);
                    this.gridContainer.appendChild(div);
                }
            }
        }
        this.updateGridBackgroundColors();
        // console.log(this.gridCases)
        // console.log(this.personnageList)
    }

    public displayPersonnageOnCase(personnage: Personnage, coordinates: [number, number], img: string) {
        const [x, y] = coordinates;
        const caseElement = document.getElementById(`case_${x}_${y}`);
    
        const [i, j] = coordinates;
        const div = document.createElement('div');
        div.classList.add('grid-cell');
        const id: string = `case_${i}_${j}`;
        div.setAttribute('id', id);
        const coordonnees: string = JSON.stringify([i, j]);
        div.setAttribute('data-coordinates', coordonnees);
    
        if (caseElement) {
            const perso = document.createElement('img');
            perso.classList.add(personnage.getType());
            perso.setAttribute('src', img);
            perso.style.height = "20px";
            perso.addEventListener('click', () => {
                // Vérifiez si un personnage est déjà sélectionné
                const game = personnage.getGrid().getGame();
                const selectedCharacter = game.getSelectedCharacter();
                // console.log("perso select : ",selectedCharacter);
                if (selectedCharacter) {
                    // Personnage déjà sélectionné, vérifiez si la case d'arrivée est également sélectionnée
                    const selectedCoordinates = game.getSelectedCoordinates();
                    // console.log("selected coord : ",selectedCoordinates);
                    if (selectedCoordinates) {
                        // Déplacez le personnage vers la case sélectionnée
                        const [newX, newY] = coordinates;
                        selectedCharacter.move([newX, newY]);
                        // Réinitialisez les sélections
                        game.setSelectedCharacter(null);
                        game.setSelectedCoordinates(null);
                    }
                } else {
                    // Sélectionnez ce personnage comme personnage actuellement sélectionné
                    game.setSelectedCharacter(personnage);
                }
            });
            caseElement.appendChild(perso);
        }
        this.occupiedCases.set(`case_${x}_${y}`, personnage);
        this.updateGridBackgroundColors();
    }

    public removePersonnageFromCase(coordinates: [number, number]) {
        this.updateGridBackgroundColors();
        const [x, y] = coordinates;
        const caseId = `case_${x}_${y}`;
        
        if (this.occupiedCases.has(caseId)) {
            this.occupiedCases.delete(caseId);

            const div = document.getElementById(caseId);
            if (div) {
                div.innerHTML = '';
            }
        }
    }

    public updateGridBackgroundColors() {
        for (let i = 1; i <= this.height; i++) {
            for (let j = 1; j <= this.width; j++) {
                const div = document.getElementById(`case_${i}_${j}`);
                const caseId = `case_${i}_${j}`;
                const personnage = this.occupiedCases.get(caseId);
    
                if (div) {
                    if (personnage) {
                        div.style.backgroundColor = this.getColorForPersonnage(personnage);
                    } else {
                        div.style.backgroundColor = this.getColorForEmptyCase(); // Gérez les cases vides ici
                    }
                }
            }
        }
    }

    private getColorForEmptyCase(): string {
        return 'transparent'; // Couleur de fond pour les cases vides
    }

    public getColorForPersonnage(personnage: Personnage): string {
        switch (personnage.getSide()) {
            case "1":
                return 'blue';
            case "2":
                return 'red';
            case "neutre":
                return 'grey';
            case "mort":
                return 'white';
            default:
                return 'transparent';
        }
    }

}

