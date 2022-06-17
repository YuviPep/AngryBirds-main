class baseClass{
  //base class is the base for handling the world and it's bodies 
    constructor(x, y, SCREEN_WIDTH, SCREEN_HEIGHT, angle) {
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':0.5
        }
        this.body = BODIES.rectangle(x, y, SCREEN_WIDTH, SCREEN_HEIGHT, options);
        
        this.SCREEN_WIDTH = SCREEN_WIDTH;
        this.SCREEN_HEIGHT = SCREEN_HEIGHT;
        
        WORLD.add(world, this.body);
      }
      display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        pop();
      }
}
