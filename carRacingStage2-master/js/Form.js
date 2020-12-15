class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton("Reset")
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html(" Multiplayer Car Racing Game");
    this.title.position(displayWidth/2 - 300, 0);
    this.title.style('font-size', '50px')

    this.reset.position(displayWidth-200, displayHeight-1000)

    this.input.position(displayWidth/2 - 110 , displayHeight/2 - 100);
    this.input.style('width','250px')
    this.input.style('height','25px')
    this.input.style('font-size','20px')
    this.button.position(displayWidth/2 - 30, displayHeight/2-40);
    this.button.style('width', '100px')
    this.button.style('height','25px')
    this.button.style('font-size','15px')
    this.button.mousePressed(()=>{
      if(playerCount<4){
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Welcome " + player.name + ", please wait for other players to join")
      this.greeting.position(displayWidth/2 - 370, displayHeight/4);
      this.greeting.style('font-size', '40px')
      }
      else{
        this.greeting.html("Game is full!")
        this.greeting.position(displayWidth / 2 - 50, displayHeight / 4)
      }
    });
    this.reset.mousePressed(()=>{
      database.ref('/').child('players').remove();
      game.update(0);
      player.updateCount(0);
      var x = 0
      database.ref('/').update({
        rank:x
      })
    })
  }
  

}
