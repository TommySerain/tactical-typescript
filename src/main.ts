import './style.css';
import { Grid } from './class/Grid.ts';
import { Villagers } from './class/Villagers.ts';
import { PersonnageSide } from './enum/PersonnageSide.ts';
import { Recruiter } from './class/Recruiter.ts';
import { PersonnageType } from './enum/PersonnageType.ts';
import { Healer } from './class/Healer.ts';
import { Warrior } from './class/Warrior.ts';
import { Game } from './class/Game.ts';
import { Personnage } from './class/Personnage.ts';

const game = new Game();

const grid = new Grid(6, 6, game);
grid.displayGrid();

let perso1 = new Villagers(PersonnageSide.neutre, grid, [1, 6]);
let perso2 = new Villagers(PersonnageSide.side1, grid, [6, 6]);
let healer = new Healer(PersonnageSide.side2, grid, [6, 1]);
let recruteur = new Recruiter(PersonnageSide.side1, grid, [1, 1]);
let warrior = new Warrior(PersonnageSide.side2, grid, [2, 3]);

let allUnits = grid.getPersonnageList();
console.log("Tous les personnages : ", allUnits);

let isSelectingCharacter = false;

document.addEventListener('click', (e) => {
    const [x, y] = getCoordinatesFromEvent(e);
    console.log("Clic à la position", x, y);

    if (isSelectingCharacter) {
        // Clic pour sélectionner la case d'arrivée
        game.setSelectedCoordinates([x, y]);
        isSelectingCharacter = false;

        const selectedCharacter = game.getSelectedCharacter();
        if (selectedCharacter) {
            const selectedCoordinates = game.getSelectedCoordinates();
            selectedCharacter.move(selectedCoordinates!);
            game.setSelectedCharacter(null);
            game.setSelectedCoordinates(null);
        }
    } else {
        // Clic pour sélectionner un personnage
        const selectedCharacter = allUnits.find(personnage => {
            const [i, j] = personnage.getCoordonnees();
            return i === x && j === y;
        });
        if (selectedCharacter) {
            console.log("Personnage sélectionné :", selectedCharacter);
            game.setSelectedCharacter(selectedCharacter);
            isSelectingCharacter = true;
        }
    }
});

function getCoordinatesFromEvent(event: MouseEvent): [number, number] {
    const target = event.target as HTMLDivElement;
    const coordinates = target.getAttribute('data-coordinates');
    if (coordinates) {
        return JSON.parse(coordinates);
    } else {
        return [0, 0];
    }
}







// Test des méthodes de mes personnages :

//bloc de test 1
/*
warrior.attack(perso1);
warrior.attack(healer);
  warrior.attack(healer);
  healer.heal(healer);
  healer.heal(healer);
  healer.heal(healer);
  warrior.attack(healer);
  warrior.attack(healer);
  warrior.attack(healer);
*/

//bloc de test 2
/*
console.log('recruteur : ', recruteur);
perso1 = recruteur.recruite(perso1);
allUnits = grid.getPersonnageList();
console.log("2 : ",allUnits)
perso1Units = allUnits.filter((personnage) => personnage.getSide() === "1");
console.log("2 : ",perso1Units);

console.log('perso1, 2: ', perso1);
perso1 = recruteur.train(perso1, PersonnageType.warrior);
allUnits = grid.getPersonnageList();
console.log("3 : ",allUnits)
perso1Units = allUnits.filter((personnage) => personnage.getSide() === "1");
console.log("3 : ",perso1Units);


console.log('perso1, 3: ', perso1);
console.log('perso2, 1: ', perso2);
*/
/*
  perso2 = recruteur.train(perso2, PersonnageType.warrior);
  console.log('perso2, 2: ', perso2);
  recruteur.recruite(healer);
  console.log('healer, 1: ', healer);
*/

