function init(level) {
	//refreshes the screen
	
    if (wall.length>0||enems.length>0||items.length>0) {
        enems.splice(0,enems.length);
		wall.splice(0,wall.length);
		items.splice(0,items.length);
    }

    //levels
    //enems.push adds enemies to the level
    //wall.push adds walls to the level
	//can define the x and y coordinates using first 2 paramaters 
	//can define width and height in next 2 paramater
    //can define stats for enemies in fith paramater
	//can define ai type in 6th (1 = basic, 2 = slime, (-) = npc)
	//can define sprite in 7th
	// item(x,y,id,vel,stats,value)
	if (level== -1) {
		sc=2;
		bg = skyImg;
		fg = treeImg;
		for(let i = 0;i < 5;i++) {
			wall.push(new Structure(width/2-i*80,height-200-i*80));
			wall.push(new Structure(width/2-i*80+80,height-200-i*80));
		}
		for(let i = 0;i < 12;i++) {
			wall.push(new Structure(0,height-i*80));
		}
	}
    else if (level==0) {
		bg = skyImg;
		fg = groundImg;
        wall.push(new Structure(width/2,height/2+300,40,40));
        enems.push(new Player(width-250,height-40,40,60,Enemy1_s,-1,falconImg));
		
	}else if (level==1) {
		bg = skyImg;
		fg = groundImg;
		for(let i = 0;i < 5;i++) {
			wall.push(new Structure(width/2+i*80,height-200-i*80));
			wall.push(new Structure(width/2+i*80+80,height-200-i*80));
		}
		wall.push(new Structure(width/2+10*70,height-200-9*50))
		items.push(new item(width/2+700,height-200-500,0,0,0,5));
        enems.push(new Player(width/2,height-40,40,40,Enemy1_s,2,slime2Img));
		enems.push(new Player(width,height-40,40,40,Enemy1_s,2));
		enems.push(new Player(width*1.5,height-40,40,40,Enemy1_s,2));
		
    }else if (level==2) {
		bg = skyImg;
		fg = groundImg;
		wall.push(new Structure(width/2,height/2+200,40,40));
        enems.push(new Player(width,height-40,40,60,Enemy1_s,-5,falconImg));
    } else if(level==3){
		bg = skyImg;
		fg = forestImg;
        wall.push(new Structure());
        enems.push(new Player(width,height-40,40,40,Enemy1_s,1));
    }else if (level==4) {
		bg = skyImg;
		fg = campImg;
		wall.push(new Structure(width/2,height/2+200,40,40));
        enems.push(new Player(width,height-40,40,60,Enemy1_s,-5,falconImg));
    }else if (level==5) {
		bg = skyImg;
		fg = pillarImg;
		wall.push(new Structure(width/2,height/2+200,40,40));
        enems.push(new Player(width,height-40,40,60,Enemy1_s,-5,falconImg));
    }else {
		bg = skyImg;
		fg = finalImg;
        wall.push(new Structure());
        enems.push(new Player(width,height-40,40,40,Enemy1_s,1));
    }
       
    
}
function transition() {
	
}
function Structure(x,y,w,h) {
	this.xvel=0;
	this.yvel=0;
	if (h===undefined) {
		this.height=40;
	}else {
		this.height = h;
	}
	if(w===undefined) {
		this.width=40;
	}else {
		this.width=w;
	}
	if (x===undefined)  {
		this.x=width/2+100;
	} else {
		this.x=x;
	}
	if (y===undefined) {
		this.y=height-this.height*2;
	}else {
		this.y=y;
	}

	this.show = function() {
		//rect(this.x,this.y,this.width*2,this.height*2);
		imageMode(CORNER);
		image(blockImg,this.x,this.y,this.width*2*width/1600,this.height*2*800/height);
		image(decorImg,this.x,this.y-this.height,this.width*2*width/1600,this.height*800/height);
	}
	this.collision= function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
		 && this.x <= Player.x+Player.width
		 && this.y+this.height*2 >= Player.y-Player.height
 		 && this.y <= Player.y+Player.height) {//touches wall
			if(Player.playerId ==0) {
				//console.log(abs(abs(this.x-Player.x)-this.width));
				//console.log(abs(this.y+this.height-Player.y));
			}
			var xdis;
			var ydis;
			//console.log("This.x="+this.x+ " Player.x="+Player.x+" Player.width=" +Player.width);
			//console.log(""+abs(this.x+this.width*2 - Player.x+Player.width)+" "+ abs(this.x -Player.x-Player.width)+ " "+abs(this.y+this.height*2 - Player.y+Player.height) +" "+ abs(this.y - Player.y-Player.height));
			if(abs(this.x+this.width*2 - Player.x+Player.width) < abs(this.x -Player.x-Player.width)) {
				xdis = abs(this.x+this.width*2 - Player.x+Player.width);
			}else {
				xdis = abs(this.x -Player.x-Player.width);
			}
			if(abs(this.y+this.height*2 - Player.y+Player.height)< abs(this.y - Player.y-Player.height)) {
				ydis = abs(this.y+this.height*2 - Player.y+Player.height);
			} else {
				ydis = abs(this.y - Player.y-Player.height);
			}
			if (xdis < ydis) {
				if(this.x+this.width-Player.x>0) {//left
					Player.x=this.x-Player.width;
				}
				else if(this.x+this.width-Player.x<0) {//right
					Player.x=this.x+this.width*2+Player.width;
				}
			} else if(xdis>ydis){
				if(this.y+this.height-Player.y>0 && Player.yvel>0) {//top
					Player.y=this.y-Player.height;
					Player.yvel=0;
					Player.grounded=true;
					Player.jumps = 1;
				}else if(this.y+this.height-Player.y<0 && Player.yvel<0){//bottom
					Player.y=this.y+this.height*2+Player.height;
					Player.yvel=0;
				}
			}else {
				//console.log(xdis-ydis);
			}
		}
	}
}