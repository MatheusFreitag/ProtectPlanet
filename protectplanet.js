var c             = document.getElementById('myCanvas');
var c2            = document.getElementById('myCanvas2');
var ctx           = c.getContext('2d');
var ctx2          = c2.getContext('2d');
var x             = 0;
var rightPressed  = false;
var leftPressed   = false;

c.width           = window.innerWidth;
c.height          = window.innerHeight;
c2.width          = window.innerWidth;
c2.height         = window.innerHeight;


//Draw Character parts
function drawCharacter(){
  //draw upper body
  ctx.fillStyle="#1a1a1a";
  ctx.beginPath();
  ctx.arc(150+x,c.height - 100,30,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()
  //draw body
  ctx.fillStyle="#1a1a1a";
  ctx.beginPath();
  ctx.fillRect(120+x,c.height - 100,60,100);
  ctx.closePath();
  ctx.stroke();
  //draw face
  ctx.fillStyle="#eebb99";
  ctx.beginPath();
  ctx.arc(160+x,c.height - 100,25,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill();

  //draw left eye
  ctx.fillStyle="#000000";
  ctx.beginPath();
  ctx.arc(155+x,c.height - 105,7,0*Math.PI,2*Math.PI);
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
  ctx.arc(175+x,c.height - 105,7,0*Math.PI,2*Math.PI);
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
  ctx.arc(158+x,c.height - 105,5,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()

  //draw right inner eye
  ctx.fillStyle="#00";
  ctx.beginPath();
  ctx.arc(178+x,c.height - 105,5,0*Math.PI,2*Math.PI);
  ctx.closePath();
  ctx.fill()

  //draw smile
  ctx.beginPath();
  ctx.arc(170+x, c.height - 90, 7, 0, Math.PI, false);
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
  if(rightPressed == true && x < c.width - 190) {
    x += 7;
  }
  else if(leftPressed == true && x > -120) {
      x -= 7;
  }
  requestAnimationFrame(draw);
}

//Code that deals with the movements of the character
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
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
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
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
