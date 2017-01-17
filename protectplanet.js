var c               = document.getElementById('myCanvas');
var c2              = document.getElementById('myCanvas2');
var ctx             = c.getContext('2d');
var ctx2            = c2.getContext('2d');
var rightPressed    = false;
var leftPressed     = false;
var Space           = false;
var ArrayOfMeteors  = [];
var numberOfMeteors = 5;
var numOfShotMeteor = 0;
var numberOfLives   = 3;
var numberOfBullet  = 0;
var thereIsBullet   = 0;
var Level           = 1;
var aboveLine       = 0;
var underLine       = 0;

c.width             = window.innerWidth;
c.height            = window.innerHeight;
c2.width            = window.innerWidth;
c2.height           = window.innerHeight;
var lowestY         = c.height;

//Draw Character parts
//alert("PROTECT PLANET \nKill the asteroids with SPACE. Move the character with ARROW KEYS");
createMeteors();
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

function updateBulletsPosition(){
  BulletPosY = character.getY();
  BulletPosX = character.getX();
}

updateBulletsPosition();

//Function to actually draw everything in the first Canvas
function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  if(Space == true) {
    drawBullets(BulletPosX, BulletPosY);
    BulletPosY -= 50;
  }
drawCharacter();


  if(rightPressed == true && character.getX() < c.width - 5) {
    character.updateX(character.getX() + 7);
  }

  else if(leftPressed == true && character.getX() > 5) {
      character.updateX(character.getX() - 7);
  }

  document.getElementById("Placar").innerHTML = "Lives: " + numberOfLives;
  document.getElementById("Level").innerHTML = "Level: " + Level;
  document.getElementById("Instruction").innerHTML = "ARROW KEYS to move <br> ENTER to shoot";

  requestAnimationFrame(draw);
}

//Code that deals with the movements of the character
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 32) {
    if (thereIsBullet == 0){
      updateBulletsPosition();
      Space = true;
    }
  }

  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {

  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

draw();



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

window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
};

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
  this.DangerZone = 0;
  this.isShot = 0
  //Methods
  this.updateX = function(X) {
       this.positionX = X;
  }
  this.updateY = function(Y) {
       this.positionY = Y;
  }
  this.updateDangerZone = function(Z) {
       this.DangerZone = Z;
  }
  this.updateShot = function(Z) {
       this.isShot = Z;
  }
  this.getX = function(){
       return this.positionX;
  };
  this.getY = function(){
       return this.positionY;
  };
  this.getDangerZone = function(){
       return this.DangerZone;
  };
  this.getShot = function(){
       return this.isShot;
  };
}

//Create an array of Meteor Objects
function createMeteors(){
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
}

//Draw the Meteors on the Screen
function drawMeteors(){
    for (var i=0; i<numberOfMeteors; i++){
      if (ArrayOfMeteors[i].getShot() == 0){
        ctx.fillStyle="#E15B37";
        ctx.beginPath();
        ctx.arc(ArrayOfMeteors[i].getX(), ArrayOfMeteors[i].getY(),30,0*Math.PI,2*Math.PI);
        ArrayOfMeteors[i].updateY(ArrayOfMeteors[i].getY() + 1);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#550000';
        ctx.stroke();
      }
    }
    if (numOfShotMeteor == numberOfMeteors && numberOfLives >= 0){
      nextLevel();
    }

    for(var i = 0; i<numberOfMeteors; i++){
      if(ArrayOfMeteors[i].getShot() == 0){
          if(ArrayOfMeteors[i].getY() > c.height - 100){
            underLine++;
          }

        if(ArrayOfMeteors[i].getY() < c.height - 100){
          aboveLine++;
        }
      }
    }

    if (underLine > 0 && aboveLine==0 && numberOfLives>=0){
      nextLevel();
    }

    underLine = 0;
    aboveLine = 0;
    requestAnimationFrame(drawMeteors);
}



drawMeteors();

function nextLevel(){
  var Level2 = Level;
  numberOfMeteors = numberOfMeteors + 5;
  createMeteors();
  for (var i=0; i < numberOfMeteors; i++){
    ArrayOfMeteors[i].updateDangerZone(0)
    ArrayOfMeteors[i].updateY(Math.floor(Math.random() * (c.height /2) ) - (c.height / 2));
  }
  numberOfLives = 3;
  character.updateX(150);
  leftPressed = false;
  rightPressed = false;
  Space = false;
  numOfShotMeteor = 0;
  numberOfBullet  = 0;
  thereIsBullet   = 0;
  Level = Level2 + 1;
  needToRefresh   = false;
}

function alive(){
  if (numberOfLives < 0){
    document.getElementById("Placar").innerHTML = "DEAD";
    document.getElementById("Level").innerHTML = "Restarting...";
    document.getElementById("Instruction").innerHTML = ":(";
    setTimeout(()=> {
      reload();
    }, 2000)

  }
  else{
    for (var i=0; i<numberOfMeteors; i++){
      if((ArrayOfMeteors[i].getY() > c.height - 100) && (ArrayOfMeteors[i].getDangerZone() != 1)){
        ArrayOfMeteors[i].updateDangerZone(1);
        numberOfLives -= 1;
      }
    }
  }




  requestAnimationFrame(alive);
}

function reload() {
  location.reload(true);
}

alive();


function Bullet(X, Y) {
  //Variables
	this.positionX = X;
  this.positionY = Y;
  this.exist = 0;
  //Methods
  this.updateY = function(Y) {
       this.positionY = Y;
  }
  this.getX = function(){
       return this.positionX;
  };
  this.getExist = function(){
       return this.exist;
  };
  this.getY = function(){
       return this.positionY;
  };
}

function drawBullets(X,Y){
  var bullet = new Bullet(X,Y);
  ctx.fillStyle="#FFF";
  ctx.beginPath();
  ctx.fillRect(bullet.getX(),bullet.getY()-40,7,7);
  ctx.closePath();
  ctx.fill();
  thereIsBullet = 1;


  for (var i = 0; i < numberOfMeteors; i++){
    if((bullet.getY() <= ArrayOfMeteors[i].getY()) && (bullet.getX() <= (ArrayOfMeteors[i].getX()+30)) && (bullet.getX() >= (ArrayOfMeteors[i].getX()-30)) && ArrayOfMeteors[i].getShot() != 1){
      ArrayOfMeteors[i].updateShot(1);
      numOfShotMeteor +=1;
    }
  }

  if (bullet.getY() < 0){
    updateBulletsPosition();
    thereIsBullet = 0;
    Space = false;
  }
}

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
// This project is free and Open Source. You may use it however you want it
//but please give the proper credit to me and all the others that helped
//me with this.
//Thanks!

/*

⊂_ヽ
　 ＼＼
　　 ＼( ͡ ° ͜ʖ ͡°)
　　　 >　⌒ヽ
　　　/ 　 へ＼
　　 /　　/　＼＼
　　 ﾚ　ノ　　 ヽ_つ
　　/　/
　 /　/|            #####################################
　(　(ヽ            #  Made with <3 by Matheus Freitag  #
　|　|、＼          # https://matheusfreitag.github.io #
　| 丿 ＼ ⌒)       #####################################
　| |　　) /
`ノ )　　Lﾉ

*/
