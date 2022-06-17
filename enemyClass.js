class enemy extends baseClass {
  constructor(x, y){
    super(x,y,60,60);
    this.image = loadImage("data/enemy.png");
    this.visibility = 255;
  }
  display() {
    //if the bird hits pig , due to collision speed of pig increases, we check pig speed to detect the collission
    
    console.log(this.body.speed);
    if(this.body.speed < 3){
        super.display();
        if (chances<=0 &&((int(bird.body.speed)<3)&& (bird.body.position.y <= SCREEN_HEIGHT-60 || bird.body.position.y <= SCREEN_HEIGHT-310))|| !isBirdInsideTheWindow()){
        textSize(50);
        fill("red");
        textAlign(CENTER);
        text("No more chances  ..!!",SCREEN_WIDTH/2,SCREEN_HEIGHT/2 - 200);
        BACKGROUND_TRACK.stop();
    }
    } 
    else {
        WORLD.remove(world, this.body);
        push();
        //visibility of the pig is decreased if hit
        this.visibility = this.visibility - 25;
        if(this.visibility==230){
          PIG_TRACK.play();
        }
        tint(255, this.visibility);
        imageMode(CENTER);
        image(this.image, this.body.position.x, this.body.position.y,60,60);
        pop();
    }
  }
  score(){
    //increasing the points
    if (this.visibility<0 && this.visibility> -1005){
      points += 5;
      birdHit = true;
    }
    }
}
