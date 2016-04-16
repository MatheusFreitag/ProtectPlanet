var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;
var Space = false;

//Class Bullets
function Bullet(X) {
  //Variables
	this.positionX = X;
  this.positionY = 0;
  //Methods
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


//Code that deals with the movements of the character
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 32) {
      Space = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 32) {
      Space = false;
  }
}


//Create an array of Meteor Objects
if(Space == true) {
	x += 7;
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
