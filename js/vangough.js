let canvasImg;
let starryNightImg;

let currentPaintingIndex = 0
let paintings = [];
let currentPainting;

const NUM_BRISTLES = 100;
const BRUSH_RADIUS = 50;
let bristles = [];

function preload(){
  canvasImg = loadImage('assets/canvas.jpg');
  starryNightImg = loadImage('assets/starryNight.jpg');
  painterOnRoadImg = loadImage('assets/painterOnRoad.jpg');
  strawHatPortraitImg = loadImage('assets/strawHatPortrait.jpg');
  wheatFieldImg = loadImage('assets/wheatField.jpg');
}

function setup(){

  createCanvas(windowWidth, windowHeight);
  background(0);

  canvasImg.resize(windowWidth, windowHeight);
  starryNightImg.resize(windowWidth, windowHeight);
  painterOnRoadImg.resize(windowWidth, windowHeight);
  strawHatPortraitImg.resize(windowWidth, windowHeight);
  wheatFieldImg.resize(windowWidth, windowHeight);

  currentPaintingIndex = 1;
  // Setup current painting based on starting index
  //                 0                1                 2                   3
  paintings = [starryNightImg, painterOnRoadImg, strawHatPortraitImg, wheatFieldImg];
  currentPainting = paintings[currentPaintingIndex];

  for(let i = 0; i < NUM_BRISTLES; i++){
      eachBristle = {
        offsetX: random(-BRUSH_RADIUS, BRUSH_RADIUS),
        offsetY: random(-BRUSH_RADIUS, BRUSH_RADIUS),
        startX: null,
        startY: null
      };

      bristles.push(eachBristle);
  }

  background(canvasImg);
}

function draw(){

  //const pixelColor = starryNightImg.get(mouseX, mouseY);
  //noStroke();
  //fill(pixelColor);
  //ellipse(mouseX, mouseY, 50, 50);

  // no outline
  noStroke();

  for(const eachBristle of bristles){

    //               center + offset
    const bristleX = mouseX + eachBristle.offsetX;
    const bristleY = mouseY + eachBristle.offsetY;

    const pixelColor = currentPainting.get(bristleX, bristleY);

    //               x2     -  x1
    const xDelta = bristleX - eachBristle.startX;
    const yDelta = bristleY - eachBristle.startY;

    //     C   =      sqrt(        A^2       +       B^2 )
    const dist = Math.sqrt((xDelta * xDelta) + (yDelta * yDelta));

    if(mouseIsPressed){
      //fill(pixelColor);
      //ellipse(bristleX, bristleY, 5, 5);

      strokeWeight(1 + (dist * 0.2));
      stroke(pixelColor);
      //               x1,                 y1,     x2,       y2
      line(eachBristle.startX, eachBristle.startY, bristleX, bristleY);
    }

    eachBristle.startX = bristleX;
    eachBristle.startY = bristleY;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {

    console.log('left arrow clicked');

    // go back to the previous (lower-index) painting
    if(currentPaintingIndex > 0){
      currentPaintingIndex -= 1;
      currentPainting = paintings[currentPaintingIndex % paintings.length];
      background(canvasImg);
    }
  }
  else if(keyCode === RIGHT_ARROW){
    // go forward to the next (higher-index) painting

    console.log('right arrow clicked');

    // indexes into painting array
    // 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3
    //
    currentPaintingIndex += 1;

    //                              4           %      4      = 1 R0 good!
    currentPainting = paintings[currentPaintingIndex % paintings.length];

    background(canvasImg);
  }
}