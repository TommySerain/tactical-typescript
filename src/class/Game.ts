import { Grid } from "./Grid";
import { Personnage } from "./Personnage";

export class Game{



    constructor(
        private neutralUnits:Personnage[] = [],
        private _player1Units: Personnage[] = [],
        private _player2Units: Personnage[] = [],
        private grid: Grid,
    ){}
    
    public getNeutralUnits():Personnage[]{
        return this.neutralUnits;
    }
    public getPlayer1Units(): Personnage[] {
        return this._player1Units;
    }
    public setPlayer1Units(value: Personnage[]) {
        this._player1Units = value;
    }

    public getPlayer2Units(): Personnage[] {
        return this._player2Units;
    }
    public setPlayer2Units(value: Personnage[]) {
        this._player2Units = value;
    }
}