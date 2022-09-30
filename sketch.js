var maze = [[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
 [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1], 
 [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0], 
 [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
 [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1], 
 [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], 
 [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

var cell_size = 40;
var rows = maze.length ;
var cols = maze[0].length ;
var grid = [];
var ai;
var ai_sz = cell_size;
var neighbour_cells;
var current_cell;
var visited;
function setup(){
	rectMode(CENTER);
	createCanvas(cell_size*cols,rows*cell_size);
	ai = new AI(ai_sz/2,ai_sz/2,ai_sz);

	

	for (let i=0;i<rows;i++){
		for (let j =0;j<cols;j++){
			grid.push(new Grid(j*cell_size+cell_size/2,
                             i*cell_size+cell_size/2,
                             cell_size,maze[i][j]));

		}
	}
	var goal_state = grid[grid.length-1];
	goal_state.col = 4;
	visited = [];

}

function draw(){

	for(var cell of grid){
		cell.show();
	}
	ai.show()
	neighbour_cells = [grid[ai.left],grid[ai.up],
                       grid[ai.right],grid[ai.down]];

	current_cell = grid[ai.location];
	current_cell.visited = true;
    visited.push(current_cell);
}

class Grid{
	constructor(x,y,sz,col){
		this.x = x;
        this.y = y;
        this.sz = sz;
        this.col = col;
        this.visited = false;

		this.show = function(){
			if (this.visited){
				fill(155,155,0);
			}
            
        else{
			if (this.col == 1){
				fill(225);

			}
            else if( this.col == 0){
				fill(0);
			}
            else{
				fill(0,255,100);
			}
		} 
        rect(this.x,this.y,this.sz,this.sz);

		}
	}
}

class AI{
	constructor(x,y,sz){
		this.x = x;
        this.y = y;
        this.sz = sz;

		this.show = function(){
			var xscl = parseInt(this.x/this.sz);
			var yscl = parseInt(this.y/this.sz);
			this.location = index(xscl,yscl);
			//adding neighbours
			this.left = index(xscl-1,yscl);
			this.right = index(xscl+1,yscl);
			this.up = index(xscl,yscl-1);
			this.down = index(xscl,yscl+1);
			fill(255,0,0);
			ellipse(this.x,this.y,this.sz,this.sz);
		}
	}
}
function index(i,j){
	if ((i < 0) || (j<0) || (i>cols-1) || (j>rows-1)){
		return -1;
	}
    return (i + j*cols);
        
}

function keyPressed(){
	if(keyCode == LEFT_ARROW){
		if(ai.x != 25 && neighbour_cells[0].col !=0){
			ai.x += -ai_sz;
		}    
	}
	if (keyCode == UP_ARROW){
		if( ai.y != 25 && neighbour_cells[1].col !=0){
			ai.y += -ai_sz;
		}    
	}

	if (keyCode == RIGHT_ARROW){
		if( ai.x != 575 && neighbour_cells[2].col !=0){
			ai.x += ai_sz;
		}    
	}
	if (keyCode == DOWN_ARROW){
		if( ai.y != 425 && neighbour_cells[3].col !=0){
			ai.y += ai_sz;
		}    
	}
}