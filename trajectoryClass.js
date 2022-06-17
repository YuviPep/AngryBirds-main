class trajectoryClass extends baseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("data/bird.png");
    this.fumesImage = loadImage("data/smoke.png");
    this.trajectory = [];
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;
    if (this.body.velocity.x>10){
      this.body.velocity.x = 6;
    }
    if (this.body.velocity.x > 5 && this.body.position.x > 200 && mode==="pulled"){
      var position = [this.body.position.x,this.body.position.y];
      this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++){
      image(this.fumesImage, this.trajectory[i][0], this.trajectory[i][1]);
    }
    super.display();
  }
}
