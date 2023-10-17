import './style.css'
import { setupCounter } from './counter.ts'
import { Grid } from './class/Grid.ts';

let grid:Grid = new Grid(10,10);
grid.displayGrid();
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
