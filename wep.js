function Sword(Stats) {
	this.stats = Stats;
	this.height = 80;
	this.width = 20
	this.x;
	this.y;
	this.rotation = 0;
	this.swing=false;
	this.show = function(Player) {
		if(Player.xvel>0) {
			this.x=Player.x+40;
			this.y=Player.y-70;
		}else {
			this.x=Player.x-this.width-40;
			this.y=Player.y-70;
		}

		fill(192,192,192);
		noStroke();
		push();
		translate(this.x,this.y);
		this.rotate();
		rect(0,0, this.width, this.height);
		pop();
		fill(0)
	}
	this.rotate= function() {
		if(this.swing==true) {
			if (this.rotation > 90) {
				this.rotation = 0;
				this.swing=false;
			} else {
				
				
				//rotate(radians(this.rotation));
				this.rotation+=5
			}
		}
		//rotate(radians(180));
		
	}
	this.collision = function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
			&& this.x <= Player.x+Player.width
			&& this.y+this.height*2 >= Player.y-Player.height
			&& this.y <= Player.y+Player.height
			&& Player.hit==false){
				Player.hit=true;
				Player.health--;
				setTimeout(function(p1) {
					Player.hit=false;
				}, 1000,this);
		}	
	}
}
function generateArrow(mx,my) {//mouse coordinates
	let ax = width/2;
	let ay = 4*height/5;
    let mag = Math.sqrt((mx-ax)*(mx-ax) + (my-ay)*(my-ay));//magnitude
    let xvel = (mx-ax)/mag;
    let yvel = (my-ay)/mag;//get unit vectors 
    arrows.push(new arrow(xvel,yvel,statsID(p1.bow)));//apply force
}
function arrow(xvel,yvel,Stats) {
    this.stats = Stats;
	this.height = 20;
	this.width = 20
	this.x = p1.x;
    this.y = p1.y;
    this.xvel = xvel*(this.stats.attack+p1.stats.attack)*5;
    this.yvel = yvel*(this.stats.attack+p1.stats.attack)*5;
    this.show = function() {
		//image(arrowImg,this.x,this.y,this.width,this.height);
        rectMode(CENTER);
        rect(this.x,this.y,this.width,this.height);
    }
    this.update = function() {
        this.yvel +=grav;
        this.x+=this.xvel;
        this.y+=this.yvel;

    }
   this.collision = function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
			&& this.x <= Player.x+Player.width
			&& this.y+this.height*2 >= Player.y-Player.height
			&& this.y <= Player.y+Player.height
			&& Player.hit==false && Player.playerId>0){
				Player.hit=true;
				Player.health-=this.stats.attack;
				setTimeout(function(p1) {
					Player.hit=false;
                }, 500,this);
                
		}	
	}
    this.walls = function(wall) {
		if (wall.x+wall.width*2 >= this.x-this.width
			&& wall.x <= this.x+this.width
			&& wall.y+wall.height*2 >= this.y-this.height
			&& wall.y <= this.y+this.height){
				return true;
			}
			else {
				return false;
			}
    }
    this.bounds = function() {
        if (this.y > height-this.height) {//grounded
			return true;
 		}else if (this.y< this.height){//ceiling
			return true;
		}
		if ( this.x/sc>width-this.width) {//right
			return true;
		}else if (this.x <this.width){//left
			return true;
        }
        return false;
    }
}