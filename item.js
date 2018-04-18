function generateItem(x,y,playerId) {
	items.push(new item(x,y,0));
	//items.push(new item(x,y,0));
	if(playerId == 2	) {
		items.push(new item(x,y,1));
		items.push(new item(x,y,100));
	}
	if(playerId == 3) {
		items.push(new item(x,y,1));
	}
}
/*Item ID's
	0=coin
	1=potion
	50 = sword1
	100 = arrow1
	101 = arrow2
	200 = armor1
	210 = helm1
*/
function itemID(id) {
	let name =0;
	if(id==0) {
		name="coin";
	}else if (id==1) {
		name="potion";
	}else if (id==100) {
		name="arrow1";
	}else if (id==101) {
		name="arrow2";
	}else if (id==210) {
		name="helm1";
	}else if (id==50) {
		name="sword1";
	}else if (id==200) {
		name="armor1";
	}
	return(name);
	//return Array(name,stats,value);
}
function item(x,y,id,vel,stats,value) {
	if(id===undefined){
		this.id=0;
	}else {
		this.id = id;
	}
	this.value;
	if (stats===undefined) {
		if(id===100) {
			this.stats=arrow1;
		}else if(id===101) {
			this.stats=arrow2;
		}
	}else {
		this.stats = stats;
	}
	if(x===undefined){
		this.x = width/2;
	}else {
		this.x=x+Math.floor((Math.random() * 5) + 1);
	}
	if(y===undefined){
		this.y=height/2;
	}else{
		this.y=y;
	}
	this.width=width/50;
	this.height=this.width;
	if(vel===undefined || vel <0){
		this.xvel = Math.floor((Math.random() * 5));
		this.yvel = -20;
	}else {
		this.xvel=0;
		this.yvel=0;
	}
	this.collected = false;
	
	if(this.id==0){
		if(value===undefined) {
			this.value=1;
		}else {
			this.value=value;
		}
	}
    this.effect= function(index){
		//console.log(this.id);
        if(this.id == 0) {//coin
			//define function
		}else if(this.id ==1) {//health potion
			if(p1.health < p1.maxHealth) {
				p1.health+=2;
				heal.play();
				if(p1.health > p1.maxHealth) {
					p1.health = p1.maxHealth;
				}
				inv.splice(index,1);
			}
		}else {

		}
		
    }
	this.update = function() {
		if(this.grounded) {
			this.xvel=0;
		}
		this.yvel+=grav;
		this.x+=this.xvel;
		this.y+=this.yvel;
		this.bounds();
	}
	this.bounds = function() {
		if (this.y > height-this.height) {//grounded
		  this.y=height-this.height;
		  this.yvel=0;
		  this.grounded =true;	
		}else if (this.y< this.height){//ceiling
		  this.y=this.height;
		  this.yvel=0;
		}
	  	if ( this.x/sc>width-this.width) {//right
		  this.x=width*sc-this.width;
		  this.xvel=0;
	  	}else if (this.x <this.width){//left
		  this.x=this.width;
		  this.xvel=0;
	  	}
		
  }
	this.show = function() {
		if(this.collected == false){
			if(this.id ==0) {
				imageMode(CENTER);
				image(moneyImg,this.x,this.y,this.width*2,this.height*2);
				/*fill(255,223,0);
				ellipse(this.x,this.y,this.width,this.height);
				fill(0);*/
			}else if (this.id==1) {
				image(potionImg,this.x,this.y,this.width*2,this.height*2);
			}else if (this.id==100 || this.id ==101) {
				image(arrowImg,this.x,this.y,this.width*2,this.height*2);
			}
		}
	}
	this.collision = function(Player,index) {
		if(this.collected==false){
			if (dist(this.x,this.y,Player.x,Player.y) <(this.width+Player.width)) {
				pickup.play();
				if(this.id==0) {
					Player.coins+=this.value;
				}else {
					//insert sort
					inv.push(this);
					let j=inv.length-1;
					let k = j-1;
					inv.forEach(function () {
						if(k>=0){
							if(inv[j].id<inv[k].id) {
								let tmp = inv[j];
								inv[j]=inv[k];
								inv[k]=tmp;					
							}else {
								k=0;
							}
							j--;
							k--;
						}
					});
					//
					//quick sort inventory
					/*
					let j =0;
					inv.forEach(function () {
						j=0;
						inv.forEach(function() {
							if(j<inv.length-1) {
								console.log(inv[j].id + " " + inv[j+1].id);
								if(inv[j].id > inv[j+1].id) {
									let tmp = inv[j];
									inv[j]=inv[j+1];
									inv[j+1]=tmp;
								}
							}
							j++;
						});
					});
					*/
					//
				}
				this.collected = true;
				items.splice(index,1);
			}
		}
	}
}