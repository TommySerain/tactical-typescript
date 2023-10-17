
export class Grid{

    public gridContainer:HTMLDivElement = document.querySelector('#grid-container')!;
    public constructor(
        private height:number,
        private width:number,
    ){
        this.gridContainer.style.display = 'grid';
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.height}, 50px)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${this.width}, 50px)`;
        this.gridContainer.style.gap = '20px';
        this.gridContainer.style.justifyContent = "center";
        this.gridContainer.style.marginTop = "20px";
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
                    this.gridContainer.appendChild(div);
                }
            }
        }
    }

}