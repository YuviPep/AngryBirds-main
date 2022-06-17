//matter.js variables for making the world to obey the rules of physics
const ENGINE = Matter.Engine;
const WORLD = Matter.World;
const BODIES = Matter.Bodies;

var engine, world;
var woodenBox1, woodenBox2, enemy1, woodenPlate1;
var woodenBox3, woodenBox4, enemy2, woodenPlate2;
var woodenBox5, woodenPlate3, woodenPlate4;
var BACKGROUND_IMAGE, groundObject, platForm;
var bird, slingShot;
var mode = "playing";
var points = 0;
var chances = 3;
var levelCompleted = "false";
var levelInitialized = "false";
var refresh;
var level = 1;
var secondLevelStarted = false;
var thirdLevelStarted = false;
var SCREEN_WIDTH , SCREEN_HEIGHT;
var birdHit = false;
let playMode = 'restart';
let BACKGROUND_TRACK;
let LEVEL_UP_TRACK;
let PIG_TRACK;
let BIRD_FLY_TRACK;

//function to load the required files at the starting of the program
function preload() {
  BACKGROUND_IMAGE = loadImage("data/bg.png");
  soundFormats('mp3', 'ogg');
  BACKGROUND_TRACK = loadSound('data/background_track_new.mp3');
  LEVEL_UP_TRACK = loadSound('data/level-up.mp3');
  PIG_TRACK = loadSound('data/pig-1.mp3');
  BIRD_FLY_TRACK = loadSound('data/bird-fly.mp3');
}

function setup() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  //creating the window
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  //creating the world
  engine = ENGINE.create();
  world = engine.world;
  //initialising the wooden structures for level 1
  initialize();
  //creating the ground and platform for slingshot
  groundObject = new groundClass(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 25 , SCREEN_WIDTH, 50 , false);
  platForm = new groundClass(125, SCREEN_HEIGHT - 110, 250, 105 , true);
  //creating the refresh icon
  refresh = createImg("data/menu_refresh.png");
  refresh.position(20, 12);
  refresh.size(40, 40);
  refresh.mouseClicked(() => {location.reload()});
  textAlign(CENTER);
  //assigning the modes for music tracks
  BACKGROUND_TRACK.playMode(playMode);
  LEVEL_UP_TRACK.playMode(playMode);
  PIG_TRACK.playMode(playMode);
  BIRD_FLY_TRACK.playMode(playMode);
  BACKGROUND_TRACK.play();
  BACKGROUND_TRACK.loop();
}

function draw() {
  frameRate(60);
  background(BACKGROUND_IMAGE);
  textSize(30);
  fill(150 , 40 , 60);
  text("Level : " + level , 100 , 100);
  displayWoodenStructures();
  noStroke();
  textSize(35);
  fill(150 , 40 , 60);
  text("Points: " + points, SCREEN_WIDTH - 250, 100);
  text(chances, 130, 45);
  image(bird.image, 70, 13, 40, 40);
  
  ENGINE.update(engine);
  //if chances are available display the bird images
  if (chances > 1) {
    image(bird.image, 110, SCREEN_HEIGHT - 210, 50, 50);

    if (chances > 2) {
      image(bird.image, 40, SCREEN_HEIGHT - 210, 50, 50);
    }
  }
  //if chances are available display the bird image on the sling shot
  if (!(chances <= 0 && mode === "playing")) {
    bird.display();
  }
  // display platform and sling images
  platForm.display();
  slingShot.display();
  
  
  //displaying text when the levels are completed
  if (points === 1000) {
    textSize(50);
    fill(150 , 40 , 60);
    text("CONGRATULATIONS..!!!", SCREEN_WIDTH / 2, 200);
  }
  //set bird position with respect to mouse coordinates when it is pressed
  if (mouseIsPressed && chances > 0 && mode === "playing") {
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
  }
  //based on points increase the level and reset the variables
  if (points == 200 && secondLevelStarted == false) {
    frameRate(1);
    LEVEL_UP_TRACK.play();
    fill(150 , 40 , 60);
    text("Level UP!!" , SCREEN_WIDTH / 2 , 100);
    bird.body.position.x = 200;
    bird.body.position.y = SCREEN_HEIGHT - 250;
    Matter.Body.setAngle(bird.body, 0);
    level = 2;
    chances = 3;
    levelInitialized = "false";
    levelStarted = "true";
    initialize();

  }
  
  if (points == 600 && thirdLevelStarted == false) {
    frameRate(1);
    LEVEL_UP_TRACK.play();
    fill(150 , 40 , 60);
    text("Level UP!!" , SCREEN_WIDTH / 2 , 100);
    bird.body.position.x = 200;
    bird.body.position.y = SCREEN_HEIGHT - 250;
    Matter.Body.setAngle(bird.body, 0);
    level = 3;
    chances = 3;
    levelInitialized = "false";
    levelStarted = "true";
    initialize();
  }
  //restore bird for next shot
  restoreBird();
  if (points == 1000) {
    BACKGROUND_TRACK.stop();
  }
}
function mousePressed() {
  if (mode === "pulled" && chances > 0 && points <= 800) {
    slingShot.init();
    Matter.Body.setPosition(bird.body, {x: 200, y: SCREEN_HEIGHT - 170});
    Matter.Body.setAngle(bird.body, 0);
    mode = "playing";
    bird.trajectory = [];
    birdHit = false;
  }
}

function mouseReleased() {
  if (mode === "playing" && chances > 0 && points <= 800) {
    BIRD_FLY_TRACK.play();
    slingShot.clear();
    mode = "pulled";
    chances--;
  }
}
//set the bird position to beginning position
function restoreBird() {
  if ((int(bird.body.speed) == 0 && chances > 0 && chances < 3 && !isBirdPlaced()) || !isBirdInsideTheWindow()) {
    slingShot.init();
    WORLD.remove(world , bird.body);
    bird = new trajectoryClass(200, SCREEN_HEIGHT - 330);
    slingShot = new slingShotClass(bird.body, {x: 200, y: SCREEN_HEIGHT - 330});
    mode = "playing";
    bird.trajectory = [];
  }
}

function isBirdInsideTheWindow() {
  if (bird.body.position.x > SCREEN_WIDTH || bird.body.position.x < 0) {
    return false;
  }
  return true;
}

function isBirdPlaced() {
  if (bird.body.position.x > 0) {
    if (bird.body.position.x < 250) {
      if (bird.body.position.y > SCREEN_HEIGHT - 400) {
        if (bird.body.position.y < SCREEN_HEIGHT - 250) {
          return true;
        }
      }
    }
  }
  return false;
}

//based on the levels display the wooden structures
function displayWoodenStructures() {
  if (level == 1) {
    woodenBox1.display();
    woodenBox2.display();
    groundObject.display();
    enemy1.display();
    enemy1.score();

    woodenPlate1.display();
  }
  else if (level == 2) {

    woodenBox1.display();
    woodenBox2.display();
    groundObject.display();
    enemy1.display();
    enemy1.score();
    woodenPlate1.display();

    woodenBox3.display();
    woodenBox4.display();
    enemy2.display();
    enemy2.score();

    woodenPlate2.display();
  }
  else {

    woodenBox1.display();
    woodenBox2.display();
    groundObject.display();
    enemy1.display();
    enemy1.score();
    woodenPlate1.display();

    woodenBox3.display();
    woodenBox4.display();
    enemy2.display();
    enemy2.score();
    woodenPlate3.display();

    woodenBox5.display();
    woodenPlate4.display();
    woodenPlate2.display();

  }
}

// function to initialize the wooden structures based on levels
function initialize() {
  levelInitialized = "false";
  birdHit = false;
  if (levelInitialized == "false") {

    if (level > 1)
    { WORLD.remove(world , bird.body);
    }
    bird = new trajectoryClass(200, SCREEN_HEIGHT - 265);

    slingShot = new slingShotClass(bird.body, {x: 200, y: SCREEN_HEIGHT - 330});
    if (level == 1) {
      woodenBox1 = new woodenBox(SCREEN_WIDTH - 666, SCREEN_HEIGHT - 130, 70, 70);
      woodenBox2 = new woodenBox(SCREEN_WIDTH - 446, SCREEN_HEIGHT - 130, 70, 70);
      enemy1 = new enemy(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 90);

      woodenPlate1 = new woodenPlate(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 140, 300, PI / 2);
    }
    else if (level == 2) {
      woodenBox1.body.position.x = SCREEN_WIDTH + 100;
      woodenBox2.body.position.x = SCREEN_WIDTH + 500;
      woodenPlate1.body.position.x = SCREEN_WIDTH + 400;

      secondLevelStarted = true;

      woodenBox1 = new woodenBox(SCREEN_WIDTH - 666, SCREEN_HEIGHT - 130, 70, 70);
      woodenBox2 = new woodenBox(SCREEN_WIDTH - 446, SCREEN_HEIGHT - 130, 70, 70);
      enemy1 = new enemy(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 90);
      woodenPlate1 = new woodenPlate(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 140, 300, PI / 2);

      woodenBox3 = new woodenBox(SCREEN_WIDTH - 666, SCREEN_HEIGHT - 250, 70, 70);
      woodenBox4 = new woodenBox(SCREEN_WIDTH - 446, SCREEN_HEIGHT - 250, 70, 70);
      enemy2 = new enemy(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 140);
      woodenPlate2 = new woodenPlate(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 350, 300, PI / 2);
    }
    else {
      woodenBox1.body.position.x = SCREEN_WIDTH + 100;
      woodenBox2.body.position.x = SCREEN_WIDTH + 500;
      woodenBox3.body.position.x = SCREEN_WIDTH + 100;
      woodenBox4.body.position.x = SCREEN_WIDTH + 500;
      woodenPlate2.body.position.x = SCREEN_WIDTH + 400;
      woodenPlate1.body.position.x = SCREEN_WIDTH + 400;
      thirdLevelStarted = true;

      woodenBox1 = new woodenBox(SCREEN_WIDTH - 666, SCREEN_HEIGHT - 130, 70, 70);
      woodenBox2 = new woodenBox(SCREEN_WIDTH - 446, SCREEN_HEIGHT - 130, 70, 70);
      enemy1 = new enemy(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 90);
      woodenPlate1 = new woodenPlate(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 140, 300, PI / 2);

      woodenBox3 = new woodenBox(SCREEN_WIDTH - 666, SCREEN_HEIGHT - 220, 70, 70);
      woodenBox4 = new woodenBox(SCREEN_WIDTH - 446, SCREEN_HEIGHT - 220, 70, 70);
      enemy2 = new enemy(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 140);
      woodenPlate3 =  new woodenPlate(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 280 , 300, PI / 2);
      woodenPlate2 = new woodenPlate(SCREEN_WIDTH - 496, SCREEN_HEIGHT - 330 , 150, -PI / 7);
      woodenBox5 = new woodenBox(SCREEN_WIDTH - 556, SCREEN_HEIGHT - 290, 70, 70);
      woodenPlate4 = new woodenPlate(SCREEN_WIDTH - 606, SCREEN_HEIGHT - 330 , 150, PI / 7);
    }
    levelInitialized = "true";
  }

}
