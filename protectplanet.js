var c               = document.getElementById('myCanvas');
var c2              = document.getElementById('myCanvas2');
var ctx             = c.getContext('2d');
var ctx2            = c2.getContext('2d');
var rightPressed    = false;
var leftPressed     = false;
var Space           = false;
var ArrayOfMeteors  = [];
var numberOfMeteors = 5;
var numberOfLives   = 3;
c.width             = window.innerWidth;
c.height            = window.innerHeight;
c2.width            = window.innerWidth;
c2.height           = window.innerHeight;


//Draw Character parts
var character = new Character();
function drawCharacter(){
  //draw upper body
  ctx.fillStyle="#1a1a1a";
  ctx.beginPath();
  ctx.arc(character.getX(),character.getY(),30,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()
  //draw body
  ctx.fillStyle="#1a1a1a";
  ctx.beginPath();
  ctx.fillRect(character.getX() - 30,character.getY(),60,100);
  ctx.closePath();
  ctx.stroke();
  //draw face
  ctx.fillStyle="#eebb99";
  ctx.beginPath();
  ctx.arc(character.getX() + 10,character.getY(),25,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill();

  //draw left eye
  ctx.fillStyle="#000000";
  ctx.beginPath();
  ctx.arc(character.getX() + 5,character.getY() - 5,7,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()
  ctx.lineWidth = 2;
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = '#550000';
  ctx.stroke();

  //draw right eye
  ctx.fillStyle="#000000";
  ctx.beginPath();
  ctx.arc(character.getX() + 25 ,character.getY() - 5,7,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()
  ctx.lineWidth = 2;
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = '#550000';
  ctx.stroke();

  //draw left inner eye
  ctx.fillStyle="#000";
  ctx.beginPath();
  ctx.arc(character.getX() + 8,character.getY() - 5,5,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()

  //draw right inner eye
  ctx.fillStyle="#00";
  ctx.beginPath();
  ctx.arc(character.getX() + 28,character.getY() - 5,5,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()

  //draw smile
  ctx.beginPath();
  ctx.arc(character.getX() + 20 , character.getY() + 10, 7, 0, Math.PI, false);
  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.strokeStyle = '#550000';
  ctx.stroke();

}

//Function to actually draw everything in the first Canvas
function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawCharacter();

  if(Space == true) {
    //drawBullets();
  }

  if(rightPressed == true && character.getX() < c.width - 40) {
    character.updateX(character.getX() + 17);
  }

  else if(leftPressed == true && character.getX() > 30) {
      character.updateX(character.getX() - 17);
  }

  document.getElementById("Placar").innerHTML = "Lives: " + numberOfLives;

  requestAnimationFrame(draw);
}

//Code that deals with the movements of the character
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 32) {
      Space = true;
  }

  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 32) {
      Space = false;
  }
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

draw();


//#############################################################################
//                        Second canvas starts here
//                         It deals with the stars

function smallStarCreate(starNumber, starSize) {
  for(var i=0; i<starNumber; i++) {
      ctx2.beginPath();
      var starLeft    = Math.floor(Math.random()* c2.width) + 1;
      var starTop     = Math.floor(Math.random()* c2.height) + 1;
      var colorVal01  = Math.floor(Math.random()*106) + 150;
      var colorVal02  = Math.floor(Math.random()*106) + 150;
      var opacityVal  = (Math.floor(Math.random()*11)) / 10;
      ctx2.fillStyle  = "rgba(" + colorVal01 + ", " + colorVal02 + ", " + 255 + ", " + opacityVal + ")";
      ctx2.fillRect(starLeft, starTop, starSize, starSize);
      ctx2.closePath();
      ctx2.fill();
  }
}

smallStarCreate(400, 1);
smallStarCreate(100, 2);

//Prevent the browser from scrool the screen when user press arrow keys and space bar
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//The SHooting stars are not in the second canvas, but manipulated with
//CSS Keyframes.
//This is used to generate a random position for them to appear in the sky
function defineShootingStarPosition(){
  document.querySelector('.star').style.left = Math.floor((Math.random() * 1500) + 1) + 'px';
  document.querySelector('.star').style.top = Math.floor((Math.random() * 300) + 1)+ 'px';
  setTimeout(defineShootingStarPosition, 1000);
}

defineShootingStarPosition();

function Character(){
  this.positionX = 150;
  this.positionY = c.height - 100;
  //Methods
  this.updateX = function(X) {
       this.positionX = X;
  }
  this.getX = function(){
       return this.positionX;
  };
  this.getY = function(){
       return this.positionY;
  };
}



//Here I deal with the Meteors

//Class Meteor
function Meteor() {
  //Variables
	this.positionX = 0;
  this.positionY = Math.floor(Math.random() * (c.height /2) ) - (c.height / 2);
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
for (var i = 0; i < numberOfMeteors; i++) {
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
  	ctx.fillStyle="#FFF";
    for (var i=0; i<numberOfMeteors; i++){
      ctx.beginPath();
      ctx.arc(ArrayOfMeteors[i].getX(), ArrayOfMeteors[i].getY(),30,0*Math.PI,2*Math.PI);
      ArrayOfMeteors[i].updateY(ArrayOfMeteors[i].getY() + 3);
      ctx.closePath();
      ctx.fill();
    }
    requestAnimationFrame(drawMeteors);
}

drawMeteors();


/*
function Bullet(X, Y) {
  //Variables
	this.positionX = X;
  this.positionY = Y;
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

function drawBullets(X,Y){
  var bullet = new Bullet(X,Y);
  ctx.fillStyle="#FFF";
  ctx.beginPath();
  ctx.fillRect(bullet.getX(),bullet.getY(),bullet.getX()+2,bullet.getY()+2);
  ctx.closePath();
  ctx.fill();
}
*/
//#############################################################################
//                                CREDITS
// I got a lot of inpiration from some sources on the internet
//and I think they desearve credit for the amazing results
//and the help that I got from them.
//
//The solar system idea and some of its implementation I got from:
// CodePen: http://codepen.io/ImagineAlex/pen/qZRzqJ
//
//The Shooting Stars using keyframes came from:
// CodePen: http://codepen.io/adamp33/pen/FnlmG
//
//The clouds were inpired by The Code Player:
//http://thecodeplayer.com/walkthrough/pure-css3-animated-clouds-background
//
//
