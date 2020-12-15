class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1", car1_img);
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2_img);
    car3 = createSprite(500, 200);
    car3.addImage("car3", car3_img);
    car4 = createSprite(700, 200);
    car4.addImage("car4", car4_img);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    form.display();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      var index = 0;

      var x = displayWidth / 4 - displayWidth / 8.6;
      var y;

      for (var plr in allPlayers) {
        index = index + 1;

        x = x + displayWidth / 6 - 25;
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          // cars[index - 1].shapeColor = "red";
          fill('white')
          ellipse(x, y, 60, 80)
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }

      }
    }



    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();
    }

    if (player.distance > 5200) {
      gameState = 2;
      rank += 1;
      database.ref('/').update({
        rank: rank
      })
      var i = 0;
      for (var plr in allPlayers) {
        i += 1
        if (i == player.index) {
          database.ref('players').child('player' + i).update({
            rank: rank
          })
        }
      }
      rank_text = createElement("h1")
      rank_text.position(displayWidth/2-100, 0)
      rank_text.html("Your rank is:" + rank)
    }

    drawSprites();
  }

  end() {
    endGame_text = createElement("h1")
    endGame_text.html("Game Ended")
    endGame_text.position(displayWidth / 2, displayHeight / 2)
    endGame_text.style('font-size', '50px')

  }
}
