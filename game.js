var p1, wep, img, gameState, level, currentLevel, z_lock;
var wall = [];
var enems = [];
var items = [];
var inv = [];
var arrows=[];
var NPC;
var buy = true;
var sc = 2; //screenscale
var song, step, shoot, heal, pickup, hurt, slime; //sounds

function preload() {
	//load images
	characterImgStill = loadGif('Images/image3.gif');
	characterImgStillR = loadGif('Images/image3R.gif');
	characterImgMoving = loadGif('Images/image4.gif');
	characterImgMovingR = loadGif('Images/image4R.gif');
	falconImg = loadImage('Images/goat.png');
	npcImg = loadImage('Images/goat.png');
	npc2Img = loadImage('Images/goat2.png');
	groundImg = loadImage('Images/ground.gif');
	skyImg = loadImage('Images/sky3.png');
	treeImg = loadImage('Images/trees.gif');
	slimeImg = loadImage('Images/slime.png');
	slime2Img = loadImage('Images/slimebunny.png');
	moneyImg = loadImage('Images/money.png');
	potionImg = loadImage('Images/healthPotion.png');
	zImg = loadImage('Images/z.png');
	blockImg = loadImage('Images/brick.jpg')
	decorImg = loadImage('Images/grass.png');
	arrowImg = loadImage('Images/arrow.png');
	forestImg = loadImage('Images/forest.png');
	finalImg = loadImage('Images/finalroom.png');
	pillarImg = loadImage('Images/pillarr.png');
	campImg = loadImage('Images/camp.png');

	bg = skyImg;
	fg = groundImg;
	characterImg = characterImgStill;

	song = loadSound('Sounds/Background.mp3');
	step = loadSound('Sounds/Footstep.mp3');
	shoot = loadSound('Sounds/Arrow.mp3');
	heal = loadSound('Sounds/HealthGain.mp3');
	pickup = loadSound('Sounds/Coin.mp3');
	hurt = loadSound('Sounds/Hurt.mp3');
	slime = loadSound('Sounds/Slime.mp3');
	
	step.playMode('restart');
	shoot.playMode('restart');
	heal.playMode('restart');
	
}
function setup() {
	//image(img,width/2,height/2);
	createCanvas(1600,800);
	arrow_lock= true;
	gameState=1;
	textState=0;
	level=-1;
	currentLevel=0;	
	grav = 2;
	wep=new Sword();
	p1 = new Player(width/2,height-40,40,60,P1_s,0);
	
	song.loop();
	song.setVolume(0.3);

	
}

function draw() {
	if(gameState==1) {
		if(currentLevel != level) {
			//init level
			init(currentLevel);
			level=currentLevel;
		}
		//update functions
		p1.update(); 
		for(let i = 0; i < arrows.length;i++) {//update arrows
			arrows[i].update();
			if(arrows[i].bounds()) {
				arrows.splice(i,1);
			}
		}
		for (let i=0; i<wall.length;i++) {//wall collision
			wall[i].collision(p1);
			for (let j=0; j < enems.length;j++) {
				wall[i].collision(enems[j]);
			}
			for(let j =0; j< items.length;j++) {
				wall[i].collision(items[j]);
			}
			for(let j =0; j< arrows.length;j++) {
				if(arrows[j].walls(wall[i])) {
				arrows.splice(j,1);
				}
			}
		} 
		
		for (let i=0; i<enems.length;i++) {//enemy collision
			if(frameCount % 2 == 0) {//activate enemy ai every 2 frames
				enems[i].ai(p1);
			}
			enems[i].update();
			if(enems[i].playerId >=0) {
				p1.collision(enems[i]); //check for player
				for(let j = 0; j < arrows.length; j++){
					arrows[j].collision(enems[i]);//check for arrows
				}
				wep.collision(enems[i]);//check for weapon
				if(enems[i].health<=0){//enemy died
					p1.exp+=100;
					generateItem(enems[i].x,enems[i].y-enems[i].height,enems[i].playerId);
					enems.splice(i,1);
				}
			}
		} 
		for(let i=0; i<items.length;i++) {
			items[i].update();
			items[i].collision(p1,i);
			
		}
	}
	///start draw
		//background
		imageMode(CORNER);
		background(bg);	
		push();
		if(width/2-p1.x < 0){
			//console.log("a");
		}
		if (p1.x-(width*sc-width/2)<0) {
			//console.log("b");
		}
		//console.log((width*sc-width/2));
		//console.log(width/2-p1.x);
		if(width/2-p1.x < 0 && p1.x-(width*sc-width/2)<0) {
			translate((width/2-p1.x)/10,0);//height-p1.y-p1.height);
		}else if (p1.x-(width*sc-width/2)>=0) {
			translate((width/2-width*sc+width/2)/10,0);
		}
		//Midground
		imageMode(CENTER);
		image(fg,width/2,height/2,width*1.2,height);
		
		pop();
		push();
		if(width/2-p1.x < 0 && p1.x-(width*sc-width/2)<0) {
			translate(width/2-p1.x,0);//height-p1.y-p1.height);
		}else if (p1.x-(width*sc-width/2)>=0) {
			translate(-width,0);
		}

		
		for (let i=0; i<wall.length;i++) {//display walls
			wall[i].show();	
		}
		//foreground
		p1.show();
		//wep.show(p1);
		for(let i=0; i<items.length;i++) {//display items
			items[i].show();
		}
		for(let i = 0; i < arrows.length;i++) {//display arrows
			arrows[i].show();
		}
		for (let i=0; i<enems.length;i++) {//display enemies
			enems[i].show();
			if(enems[i].playerId >0) {
				enems[i].displayhealth();
			}else {
				imageMode(CENTER);
				image(zImg,enems[i].x,enems[i].y-enems[i].height*1.5,enems[i].width,enems[i].width);
			}
		}
		pop();
		//previously where UI was
	if (gameState==2) {
		textSize(width/(1600/30));
		text("Paused",width/2,height/2-250);
		p1.inventory();
		p1.showstats();
		p1.equip();
		//create menu: draw, update, and init functions
	}else if(gameState==3) {
		npc();
	}
	//ui
		displayarea();
		p1.displayhealth();
		p1.displayexp();
		p1.displaygold();
		p1.displayInv();
}
function displayarea() {
	
	textSize(width/(1600/20));
	text("Area: " + (currentLevel+1),width/2,30);
}
function npc() {
	p1.xvel=0;
	p1.yvel=0;
	if (NPC == -1) {//intro npc
		if(textState==0){
			textbox("Welcome to Antem");
			textState++;
		}
		else if(textState==1){
			textbox("Welcome to Antem");
			if(p1.interact==true) {
				textState++;
			}
		}else if(textState==2){
			textbox("Continue to the right");
			if(p1.interact==true) {
				textState++;
			}
		}else {
			textState=0;
			gameState=1	;
		}

	}else if (NPC == -5) {//shop
		if(textState==0) {
			shop(Array(1,1,1,1,1));
			textState++;
		}else if(textState==1) {
			shop(Array(1,1,1,1,1));
			if(p1.interact==true) {
				textState++;
			}
		} else 	{
			textState=0;
			gameState=1	;
		}
	}
	p1.interact=false;
}
function shop(items) {
	//menu
	fill(192,192,192);
	rectMode(CENTER);
	rect(width/2,height/2,width/2,height/2);
	rectMode(CORNER);
	fill(0);
	textSize(width/(1600/20));
	text("Shop",width/2,height/2-height/4+30);
	text("Gold: "+p1.coins,width/2-width/4,height/2-height/4+30);
	
	for(let i = 0; i<items.length;i++) {
		fill(0);
		text(itemID(items[i]),width/2-width/4+5,height/2+i*30);//list of items
		fill(255);
		rect(width/2-width/4+100,height/2+i*30-15,40,25);//buy buttons
		fill(0);
		text("Buy",width/2-width/4+28+75,height/2+i*30+3);
		if(mouseIsPressed ) {
			if (width/2-width/4+100+40 >= mouseX
				&& width/2-width/4+100 <= mouseX
				&& height/2+i*30-15+25 >= mouseY
				&& height/2+i*30-15 <= mouseY) {//mouse is in buy box
					if(buy == true) {
						if(p1.coins>0) {//check if player has gold
							p1.coins--;
							inv.push(new item(0,0,items[i],0,0,0));
							//insert sort
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
							//add an item
							buy=false;
							setTimeout(function () {buy=true;},500);
						}else {
							console.log("Not enough gold");
						}
					}
				}
		}
	}
}
function textbox(buffer) {
	fill(0);
	rectMode(CORNER);
	rect(0,height-height/5,width,height/5);
	fill(255);
	textSize(width/(1600/30));
	
	text(buffer,width/2,height-height/10);
	fill(0);
}
function mousePressed(){
	if(gameState==1 && arrow_lock) {	
		generateArrow(mouseX,mouseY);
		shoot.play();
		setTimeout(function() {arrow_lock = true;}, 500);
		arrow_lock=false;
	}
	return false;
}
function keyPressed(){
	if(gameState==1) {
		if (keyCode== 68) {//d
			p1.xvel=p1.stats.speed *3;
			step.loop();
		}
		else if (keyCode == 65) {//a
			p1.xvel=-p1.stats.speed *3;
			step.loop();
		}
		else if (keyCode ==83) {//s
			//p1.yvel=p1.stats.speed;
		}
		else if (keyCode ==87) {//w
			p1.jump();
		}else if (keyCode ==32) {//space
			//p1.attack(wep,enems[0]);
		
		}else if (keyCode == 49) {//1
			if(inv.length > 0 ) {
				inv[0].effect(0);
				//heal.play();
			}
		}else if (keyCode == 50) {//2
			if(inv.length > 1 ) {
				inv[1].effect(1);
				//heal.play();
			}
		}else if (keyCode == 51) {//3
			if(inv.length > 2 ) {
				inv[2].effect(2);
				//heal.play();
			}
		}else if (keyCode == 52) {//4
			if(inv.length > 3 ) {
				inv[3].effect(3);
				//heal.play();
			}
		}else if (keyCode == 53) {//5
			if(inv.length > 4 ) {
				inv[4].effect(4);
				//heal.play();
			}
		}
	}
	if(gameState==2) {
		if (keyCode == 49) {//1
			if(p1.levelpoints > 0 ) {
				p1.stats.attack++;
				p1.levelpoints--;
			}
		}else if (keyCode == 50) {//2
			if(p1.levelpoints > 0 ) {
				p1.stats.attack++;
				p1.levelpoints--;
			}
		}else if (keyCode == 51) {//3
			if(p1.levelpoints > 0 ) {
				p1.stats.attack++;
				p1.levelpoints--;
			}
		}else if (keyCode == 52) {//4
			if(p1.levelpoints > 0 ) {
				p1.stats.attack++;
				p1.levelpoints--;
			}
		}else if (keyCode == 53) {//5
			if(p1.levelpoints > 0 ) {
				p1.stats.attack++;
				p1.levelpoints--;
			}
		}
	}
	if(keyCode == 90) {//z
			p1.interact =true;
	}else if(keyCode == 27){//escape
		if(gameState==2)
			gameState=1;
		else if(gameState==3) {
			gameState=1;
			textState=0;
		}else 
			gameState=2;
	}	
	
}
function keyReleased(){
	if (keyCode== 68 &&p1.xvel>0) {//d
		p1.xvel=0;
		step.stop();
	}
	else if (keyCode == 65 &&p1.xvel<0) {//a
		p1.xvel=0;
		step.stop();
	}
	else if (keyCode ==83 &&p1.yvel>0) {//s
		//p1.yvel=0;
	}
	else if (keyCode ==87 &&p1.yvel<0) {//w
		//p1.yvel=0;
	}else if(keyCode == 27){//escape
		
	}else if(keyCode == 90) {//z
		p1.interact =false;
	}
	return false;
}