function Stats(atk,def,spd,spc,jmp,hp) {
    this.attack = atk;
    this.defence= def;
    this.speed = spd;
    this.special =spc;
    this.jmp= jmp;//jump height
    this.hp=hp;
}

function statsID(id) {
	let stat = new Stats(0,0,0,0,0,0);
	if(id==0) {
		stat =P1_s;
	}else if (id==1) {
		stat =Enemy1_s;
	}else if (id==100) {
		stat=arrow1;
	}else if (id==101) {
		stat=arrow2;
	}else if (id==210) {
		stat=helm1;
	}else if (id==50) {
		stat=sword1;
	}else if (id==200) {
		stat=armor1;
	}
	return(stat);
	//return Array(name,stats,value);
}
//define character stats
var P1_s = new Stats(5,1,10,1,30,10);   //id = 0
var Enemy1_s = new Stats(0,0,5,0,25,5); //id = 1


//define item stats
var sword1 = new Stats(2,0,0,0,0,0);    //id=50
var arrow1 = new Stats(2,0,0,0,0,0);    //id=100
var arrow2 = new Stats(4,0,0,0,0,0);    //id=101

var armor1 = new Stats(0,2,0,0,0,1);    //id=200
var helm1 = new Stats(0,2,0,0,0,0);     //id =210