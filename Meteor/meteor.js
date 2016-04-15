var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
var ArrayOfMeteors = [];
var newX = 0;

//Class Meteor
function Meteor() {
  //Variables
	this.positionX = 0;
  this.positionY = 0;
  //Methods
  this.updateX = function(X) {
       this.positionX = X;
  }
  this.updateY = function(Y) {
       this.positionY = Y;
  }
  this.getX = function(){
       return this.positionX;
  };
  this.getY = function(){
       return this.positionY;
  };
}

//Create an array of Meteor Objects
for (var i = 0; i < 5; i++) {
  ArrayOfMeteors[i] = new Meteor();
  newX = Math.floor(Math.random()* c.width);
  if (newX < 30){
    ArrayOfMeteors[i].updateX(30);
  }
  else if (newX > c.width) {
    ArrayOfMeteors[i].updateX(c.width - 30);
  }
  else{
    ArrayOfMeteors[i].updateX(newX);
  }  
}

//Draw the Meteors on the Screen
function drawMeteors(){
    ctx.clearRect(0, 0, c.width, c.height);
  	ctx.fillStyle="#1a1a1a";
    ctx.beginPath();
    for (var i=0; i<5; i++){
      ctx.arc(ArrayOfMeteors[i].getX(), ArrayOfMeteors[i].getY(),30,0*Math.PI,2*Math.PI);
      ArrayOfMeteors[i].updateY(ArrayOfMeteors[i].getY() + 1);
    }
    ctx.closePath();
    ctx.fill();

  setTimeout(drawMeteors, 5);

}

drawMeteors();
