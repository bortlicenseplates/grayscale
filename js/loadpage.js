//fonts
var theFont;
var greyFont;

// jumble chars
var sChars = "ab";
var vChars = "cdefghijkl";
var hChars = "mnopqr";

//words to cycle through
var words = [
              "grayscale",
              "clu",
              "mr. mitch",
              "rachel  nobel",
              "11 mar 17"
            ];
//current word in array
var wnum;
//the word being read
var word;
//font stuff
var pad;
var fontSize;
var lNum;

// check stuff
var count;
var clicked;
var timeout, timedOut, fade;
var scrollCheck;
var fadeSpeed;
var wordSwitch;

//colour stuff
var bgA, bgAM, bgAm;
var fontColor;
var bgColor;


//load fonts here
function preload(){
  
  theFont = loadFont("destroyed.ttf");
  greyFont = loadFont("Grayscale.ttf");

}
//setup stuff
function initialise(){
  wnum = 0;
  word = words[wnum];
  wordSwitch = false;

  scrollCheck = false;
  timeout = 0;
  timedOut = false;
  count = 0;
  bgAM = 255;
  bgAm = 10;
  bgA = bgAm;
  clicked = false;
  //colour stuff
  fontColor = color(35,35,35);
  bgColor = 255;

  //transition stuff
  fadeSpeed = 0.5;
  fade = 1;
}

function setup() {
  //standard setup stuff
  initialise();
  //end

  //FONT STUFF
  fontSize = 72;
  
  if (15 * fontSize > windowWidth){ //15 is largest string in words[] + 2
    fontSize = windowWidth / 15;
  }
  
  padFinder();
  lNum = word.length + (pad*2);
  fontSize = (windowWidth/lNum);
  textFont(theFont);
  textSize(fontSize);
  //END FONT STUFF

  //canvas start -- DONT TOUCH
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("#grayscale-container");
  cnv.id("grayscale-thing");
  background(0); 
  noSmooth();
  frameRate(30);
  //canvas end
  $('#menu').css({ 'font-size' : fontSize/2 });
} 

//calculates number of pad letters and total length of string
function padFinder(){
  var ww = (word.length) * fontSize;
  pad = Math.floor((windowWidth - ww) / fontSize) / 2;


}


function draw() {
  noStroke();
  textFont(theFont);
  
  fill(fontColor);
  translate(fontSize * 0.03,(windowHeight/2) + (fontSize/2));
  background(bgColor,bgA);
  
  push();
  sentence();
  counter();
  pop();
  
  
  transition();
  timer(60*8);
  if(!clicked && timeout == 60*4){
    if (wordSwitch){
      changeWord();
    }
    
    print("Step 1");
    clicked = true;
    timeout = 0;
  }
  else if(clicked && timeout >= 60*4){
    print("step 2");
    timeout = 0;
    timedOut = true;
  } else if (timedOut){
    timeout --;
    if (timeout <= 0){
      print("step 3");
      clicked = false;
      timedOut = false;
      timeout = 0;
      wordSwitch = true;
    }
  }
}

function changeWord(){
  wnum ++;
  word = words[wnum%(words.length)];
  
  padFinder();
  wordSwitch = false;
}


function timer(maxTime){
  if(!timedOut){
    timeout++;
  }
}

function transition(){
  if (clicked){
    if (bgA < bgAM){
      bgA++;
    }
    return true;
  } else { 
    if (bgA > bgAm){
      bgA--;
    }
    return false;
  }
}

function counter(){
  if(count < 255 && (clicked)){
    count++;
  } else if (!timedOut && !clicked && count > 0) {
    count --;
  }
  if (timedOut && clicked && count > 0){
    count --;
  } else if (timedOut && !clicked && count < 255){
    count ++;
  }

}
function sentence(){
  push();
  for(var i = 0; i < lNum+1; i++){
    if(i >= pad && i < lNum-pad){
      push();
      gScale(pad,i-pad,count);
      pop();
    } else if (bgA < bgAM){
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
    rnum = random(fade, 255);
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
  var p;
  var swtch = Math.round(random(bgAm,bgA));
  if(swtch <=  bgAm+15){
    var c = Math.round(random(0,chance));
    if (c == chance){
      for(var i = 0; i < lnum; i++){
        p = Math.round(random(0,hChars.length+3));
        if(!(p > hChars.length-1)){
          text(hChars.charAt(p),0,0);
        }
      }
    } else if (c >= chance*0.75){
      p = Math.round(random(0,sChars.length+4));
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