class groundClass {
    constructor(x,y,SCREEN_WIDTH,SCREEN_HEIGHT , draw) {
      var options = {
          isStatic: true
      }
      this.body = BODIES.rectangle(x,y,SCREEN_WIDTH,SCREEN_HEIGHT,options);
      this.SCREEN_WIDTH = SCREEN_WIDTH;
      this.SCREEN_HEIGHT = SCREEN_HEIGHT;
      this.draw = draw;
      WORLD.add(world, this.body);
    }
    display(){
      var position =this.body.position;
      
      fill("saddlebrown");
      rectMode(CENTER);
      if (this.draw==true){
      rect(position.x, position.y, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    }
  }
  }
