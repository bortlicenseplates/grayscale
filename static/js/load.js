var theFont;
var greyFont;
var sChars = "ab";
var vChars = "cdefghijkl";
var hChars = "mnopqr";
var word = "grayscale";
var pad;
var fontSize;
var lNum;
var count;
var bgA, bgAM, bgAm;
var clicked;
var timeout, timedOut, fade;
var scrollCheck;
var fontColor;
var bgColor;
var fadeSpeed;

function preload(){
  
  theFont = loadFont("fonts/destroyed.ttf");
  greyFont = loadFont("fonts/Grayscale.ttf");

}

function setup() {

  scrollCheck = false;
  timeout = 0;
  
  fontColor = color(35,35,35);
  bgColor = color(220,220,220);
  fadeSpeed = 0.5;
  fade = 1;

  timedOut = false;
  pad = 5;
  count = 0;
  lNum = word.length + (pad*2);
  fontSize = Math.ceil(windowWidth/lNum);
  bgAM = 255;
  bgAm = 10;
  bgA = bgAm;
  clicked = false;
  textFont(theFont);
  textSize(fontSize);

  var cnv = createCanvas(windowWidth, fontSize);
  cnv.parent("grayscale-container");
  cnv.id("grayscale-thing");

  background(bgColor); 
  noSmooth();
  frameRate(60);
} 


function draw() {
  noStroke();
  textFont(theFont);
  
  fill(fontColor);
  translate(0,fontSize);
  background(bgColor,bgA);
  
  push();
  sentence();
  counter();
  pop();
  
  
  transition();
  timer(60*4);
  if(!clicked && timeout == 60*4){
    clicked = true;
    timeout = 0;
  }
  if(clicked && timeout >= 60*4){
    print("yes");
    timedOut = true;
  } if (timedOut){
    timeout --;
    clicked = false;
    if (timeout <= 0){
      timedOut = false;
    }
  }
}

function fadeout(){
  fade -= 0.01;
  if(fade > 0){
    $(function(){
      $('#grayscale-container').css({ 'opacity' : fade })
    });
  } else {
    $('#grayscale-container').css({ 'display' : 'none' })
  }
  
}

function fadBG(){
  if(bgColor > fontColor){
    bgColor -= fadeSpeed;
  }
}


function timer(maxTime){
  if(!drawWord() && !clicked){
    timeout++;
  } else if (clicked && !timedOut) { 
    timeout ++;
  } else {
    timeout = 0;
  }
}

function transition(){
  if (clicked){
    if (bgA < bgAM){
      bgA++;
    }
    return true;
  } else { 
    alphaSet();
    return false;
  }
}
function alphaSet(){
  if(drawWord() && bgA < bgAM){
    bgA++;
  } else if(bgA > bgAm) {
    bgA-=3;
  }
  
}

function counter(){
  if(count < 255 && (drawWord() || clicked)){
    count++;
  } else if (count > 0 && !drawWord() && !clicked) {
    count --;
  }
  if (timedOut && count > 0){
    count --;
  }
}
function sentence(){
  push();
  var n = (random(5,24));
  for(var i = 0; i < lNum; i++){
    
    if(i >= pad && i < lNum-pad){
      push();
      gScale(pad,i-pad,count);
      pop();
    } else if (!clicked){
      hLetter(6,5);
      vLetter(10,6);
    }
    translate(fontSize,0);
  }
  pop();
}

function gScale(skip, n, fade){
  push();
  var rnum;
  if(!timedOut){
    rnum = random(fade,255);
  } else {
    rnum = random(count, 255);
  }
  if(fade >= rnum/2){
    textFont(greyFont);
    text(word.charAt(n),0,0);
  } else if (!timedOut) {
    textFont(theFont);
    hLetter(6,2);
    vLetter(10,4);
  }
    
  pop();
}

function hLetter(lnum, chance){
  var swtch = Math.round(random(bgAm,bgA));
  if(swtch <=  bgAm+15){
    var c = Math.round(random(0,chance));
    if (c == chance){
      for(var i = 0; i < lnum; i++){
        var p = Math.round(random(0,hChars.length+3));
        if(!(p > hChars.length-1)){
          text(hChars.charAt(p),0,0);
        }
      }
    } else if (c >= chance*0.75){
      var p = Math.round(random(0,sChars.length+4));
      if(!(p > sChars.length-1)){
        text(sChars.charAt(p),0,0);
      }
    }
  }
}

function vLetter(lnum, chance){
  var swtch = Math.round(random(bgAm,bgA));
  if(swtch <=  bgAm + 15){
    var c = Math.round(random(0,chance));
    if (c == chance){
      for(var i = 0; i < lnum; i++){
        var p = Math.round(random(0,vChars.length + 4));
        if(!(p > vChars.length-1)){
          text(vChars.charAt(p),0,0);
        }
      }
    }
  }
}

function drawWord(){
  
  var t = -fontSize;
  var b = 0;
  // if(mouseY > height/2 + t && mouseY < height/2 +fontSize * 0.25){
  //   return true;
  // } else {
    return false;
  // }
}

function mousePressed(){
  if(!clicked){
    clicked = true;
  }
}
