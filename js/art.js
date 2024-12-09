let x = 0;
let y = 0;
let fillColor;

function setup(){

  const canvas = createCanvas(windowWidth, windowHeight);

  // 0 => black, 255 => white
  background(0);

  // Green-ish
  fillColor = color(128,  255,   0);
}

function draw(){

  // Remove the previous ellipse drawings
  // so there's no trail...
  background(0);

  // Shape outline color
  strokeWeight(5);
  stroke(128, 0, 255);

  // Inner shape color
  //    Red, Green, Blue
  fill(fillColor);

  //     x,    y,   width, height
  ellipse(mouseX,   mouseY,   150,    150);

  x += 5;
  y += 2;

  if(mouseIsPressed){
    fillColor = getRandomColor();
  }
}

function getRandomColor(){
  return color(random(255), random(255), random(255));
}