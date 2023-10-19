// import { Grid } from "./Grid";
import { Personnage } from "./Personnage";

export class Game{

    constructor(
        private neutralUnits:Personnage[] = [],
        private player1Units: Personnage[] = [],
        private player2Units: Personnage[] = [],
    ){}
    
    public getNeutralUnits():Personnage[]{
        return this.neutralUnits;
    }
    public getPlayer1Units(): Personnage[] {
        return this.player1Units;
    }
    public setPlayer1Units(value: Personnage[]) {
        this.player1Units = value;
    }

    public getPlayer2Units(): Personnage[] {
        return this.player2Units;
    }
    public setPlayer2Units(value: Personnage[]) {
        this.player2Units = value;
    }

}