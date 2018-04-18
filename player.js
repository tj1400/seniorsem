//todo: add paramaters--finished
//possibly create new enemy class
//create an attack
//add a paramater for different images/animations
function Player(x,y,w,h,stats,playerID,sprite) {
	if(stats===undefined) {
		this.stats = new Stats();
	}else {
		this.stats = stats;
	}
	this.playerId;
	this.maxHealth = this.stats.hp;
	this.health=this.maxHealth;
	this.yvel=0;
	this.xvel=0;
	this.jumps=0;
	this.grounded=false;
	if (h ===undefined){
		this.HEIGHT=40;
	}else {
		this.HEIGHT=h;
	}
	this.height=this.HEIGHT;
	if (w ===undefined){
		this.WIDTH=40;
	}else {
		this.WIDTH=w;
	}
	this.width=this.WIDTH;
	this.dir = 0;
	this.exp=0;
	this.coins=0;
	this.level=1;
	this.levelpoints=0;
	this.hit=false;
	this.interact=false;
	
	if(playerID===undefined) {
		this.playerId = 1;
	}else {
		this.playerId = playerID;
	}
	this.jumpstate=-1;
	//this.wep = Sword();
	if(x===undefined) {
		this.x = width/2;
	}else {
		this.x= x;
	}
	if (y===undefined){
		
		this.y=height-this.height;
	}else {
		this.y = y;
	}
	this.items = [];
	//gear
	this.helmet = 210; //helm1
	this.armor = 200; //armor1
	this.wep = 50;	//sword1
	this.bow = 100;	//arrow1
	//
	
	this.show = function() {
		imageMode(CENTER);
		if(this.playerId==0) {
			if(this.attack==true){
				
			}
			
			if(this.xvel==0){
				let X = width/100;
				if (this.dir ==0) {
					characterImg = characterImgStill;
					X = -width/100
				}else {
					X=width/100;
					characterImg = characterImgStillR;
				}
				image(characterImg,this.x-X,this.y-15,this.width*2.5*width/1600,this.height*2.5*800/height);
			}else if(this.dir ==0) {
				image(characterImgMoving,this.x+width/100,this.y-height/50,this.width*2.5*width/1600,this.height*2.5*800/height);
				
			} else {
				image(characterImgMovingR,this.x-width/100,this.y-height/50,this.width*2.5*width/1600,this.height*2.5*800/height);
					
			}
		}else{
			if(sprite===undefined) {
				image(slimeImg,this.x,this.y,this.width*2,this.height*2);
			}else {
				image(sprite,this.x,this.y,this.width*2,this.height*2);
			}
		}
		fill(0);//reset color
	}
	this.displayhealth = function() {
		if(this.playerId==0){
			for (var i=0; i<this.health;i++)
				ellipse(10+i*15,10,10,10);
			if (this.health <=0) {//played died
				//console.log("you have died");
				step.stop();
				alert("You have died");
				p1.health=p1.maxHealth;
				p1.xvel=0;
				p1.yvel=0;
				currentLevel=0; 
				init(currentLevel);
				level=currentLevel;
			}
			
		}else {
			fill(255,0,0);
			rectMode(CORNER);
			text(this.level,this.x-this.width,this.y-this.height-height/50)
			rect(this.x-this.width,this.y-this.height-height/50,this.WIDTH*2,10);
			fill(0,255,0);
			rect(this.x-this.width,this.y-this.height-height/50,this.WIDTH*2*this.health/5,10);
			fill(0);//reset colors
		}
	}	
	this.displayexp = function () {
		textSize(width/(1600/20));
		rectMode(CORNER);
		let baseExp = 150;
		text("Level "+this.level,width-width/(1600/250),30);
		text("Skill points available: "+this.levelpoints,width-width/(1600/600),30);
		text(""+this.exp+"/"+this.level*baseExp,width-width/(1600/130),50);
		rect(width-width/(1600/180),height/80,width/(1600/150),height/40);
		fill(0);
		if(this.exp>=this.level*baseExp) {
			this.exp=0;
			this.level++;
			this.levelpoints++;
		}
		fill(255);
		rect(width-width/(1600/180),height/80,this.exp/this.level*width/1600,height/40);

		fill(0);
	}
	this.displaygold = function() {
		text("Gold: ",width-width/(1600/350),height/(800/30));
		text(this.coins,width-width/(1600/300),height/(800/30));
	}
	this.displayInv = function() {
		var invImg = 0; 
		let j = 0;
		for(let i = 0; i< inv.length;i++) {
			if(inv[i].id ==1 ){
				invImg =potionImg;
			}else{

			}

			if (invImg!=0) {
				image(invImg,width/40+(j*width/40),height-height/15,width/40,width/40);
				j++;
			}
			invImg=0;
		}
	}
	this.inventory = function() {
		fill(255);
		rectMode(CENTER);
		rect(width/2,height/2,500,500);
		fill(0);
		text("Inventory:", width/2-240,height/2-225);
		
		let i=0;
		for(let i = 0; i< inv.length;i++) {
			if(inv[i].id ==1 ){
				invImg =potionImg;
			}else if(inv[i].id ==100){
				invImg =arrowImg;
			}else if(inv[i].id ==101){
				invImg =arrowImg;
			}
			image(invImg,width/2-225+i*width/40,height/2-200,width/40,width/40);
			if (width/2-225+i*width/40+width/40 >= mouseX
				&& width/2-225+i*width/40 <= mouseX
				&& height/2-200+width/40 >= mouseY
				&& height/2-200 <= mouseY) {
					text(itemID(inv[i].id),width/2-225+i*width/40,height/2-200)
				}
			}
	}
	this.showstats = function() {
		fill(255);
		rectMode(CENTER);
		rect(width/2+500,height/2,500,500);
		fill(0);
		text("Stats:", width/2-240+500,height/2-225);
		text("Attack: "+p1.stats.attack, width/2-240+500,height/2-225+50);
		text("Deffence: "+p1.stats.defence, width/2-240+500,height/2-225+100);
		text("Speed: "+p1.stats.speed, width/2-240+500,height/2-225+150);
		text("Special: "+p1.stats.special, width/2-240+500,height/2-225+200);
		text("HP: "+p1.stats.hp, width/2-240+500,height/2-225+250);
	}
	this.equip = function() {
		fill(255);
		rectMode(CENTER);
		rect(width/2-500,height/2,500,500);
		fill(0);
		text("Equipment:", width/2-240-500,height/2-225);
		text("Helmet: " + itemID(p1.helmet), width/2-240-500,height/2-225+50);
		text("Armor: " +itemID(p1.armor), width/2-240-500,height/2-225+100);
		text("Weapon: " + itemID(p1.wep), width/2-240-500,height/2-225+150);
		text("Arrow: " + itemID(p1.bow), width/2-240-500,height/2-225+200);
	}
	this.bounds = function() {
  		if (this.y > height-this.height) {//grounded
			this.y=height-this.height;
			if (this.yvel > 30) {
				this.health--;
			}
			this.yvel=0;
			this.grounded =true;
    		this.jumps=1;
 		}else if (this.y/sc< this.height){//ceiling
			//this.y=this.height;
			//this.yvel=0;
			//this.jumps=0;
		}
		else{
			this.jumps=0;
			this.grounded=false;
		}
		if (this.x/2>width-this.width) {//right
			this.x=width*sc-this.width-40;
			this.xvel=0;
			if (this.playerId==0){
				step.stop();
				//if(confirm("Continue to next area?")) {
					currentLevel++;
					this.x=this.width;
					this.y=height-this.height;
				//}
			}
		}else if (this.x <this.width){//left
			this.x=this.width;
			this.xvel=0;
			if (this.playerId==0){
				step.stop();
				//if(confirm("Continue to next area?")) {
					currentLevel--;
					this.x=width*sc-this.width-40;
					this.y=height-this.height;
				//}
			}
		}
		  
	}
	this.update = function() {
		if(this.grounded==true){
			this.jumps=1;
		}
		this.yvel+=grav;
		this.x+=this.xvel;
		this.y+=this.yvel;
		if (this.xvel>0) {
			this.dir=0;
		}
		else if (this.xvel<0) {
			this.dir =1;
		}
		this.bounds();
	}
	this.jump = function() {
		if(this.jumps>0) {
			this.yvel=-this.stats.jmp;
			this.jumps=0;
			this.grounded=false;
		}
	}
	this.addItem = function(Item) {
		this.item.push(Item);
	}
	this.attack = function(Sword, Player) {
		Sword.swing=true;
		Sword.collision(Player);
	}
	this.ai = function(Player,type) {
		type=this.playerId
		if (type ==1) {//(standard following and walking)
			if(dist(Player.x,Player.y,this.x,this.y) < 500 ) {//player detected
				if(Player.x==this.x){
					this.xvel=0;
				}
				else {
					this.xvel = this.stats.speed*(Player.x-this.x)/abs(Player.x-this.x);
				}
				if (this.y-Player.y > 40 && abs(this.x-Player.x) < 200) {
					this.jump();
				}
			} else {
				this.xvel=0;
			}
		} else if (type ==2) {//slime jumping
			if(dist(Player.x,Player.y,this.x,this.y) < 500 || this.jumpstate!=-1) {//player detected
				if(this.grounded==true) {
					this.xvel=0;
					if(this.height>this.HEIGHT-5 && (this.jumpstate==0 || this.jumpstate==-1)){
						this.height-=.4;
						this.jumpstate =0;
					}else if(this.height<this.HEIGHT+5){
						this.height+=1;
						this.jumpstate=1;
					}else {
						this.jumpstate=-1;
						this.height=this.HEIGHT;
						this.jump();
						if (Player.x==this.x)
							this.xvel=0;
						else {
							slime.play();
							this.xvel = this.stats.speed*(Player.x-this.x)/abs(Player.x-this.x);
						}
					}
				}else {
				}
			}else {
				if(this.grounded==true) {
					this.xvel=0;
					this.height=this.HEIGHT;
				}
			}
				
		} else if (type <=-1) {//npc
			if(dist(Player.x,Player.y,this.x,this.y) < 200 ){
				if(Player.interact) {
					gameState=3;
					NPC = type;
				}
			}
		} else {

		}	

	}
	this.collision = function(Player) {//enemy collisions
		if (Player.playerId>0) {
			if (dist(this.x,this.y,Player.x,Player.y) <this.width+Player.width) {
				if (this.hit==false) {
					this.health--;
					//Player.health--;				
					this.hit=true;
					hurt.play();
					setTimeout(function(Player) {
						Player.hit=false;
					}, 1000,this);
				}
			}
		}
	}
}
