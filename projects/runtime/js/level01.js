var level01 = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = {
      name: "Robot Romp",
      number: 1,
      speed: -3,
      gameItems: [
        { type: "sawblade", x: 2400, y: 300 },
        { type: "sawblade", x: 2200, y: 200 },
        { type: "sawblade", x: 2000, y: 200 },
        { type: "sawblade", x: 1800, y: 300 },
        { type: "sawblade", x: 1600, y: 300 },
        { type: "sawblade", x: 1400, y: 200 },
        { type: "sawblade", x: 1200, y: 300 },
        { type: "sawblade", x: 1000, y: 300 },
        { type: "sawblade", x: 800, y: 200 },
        { type: "sawblade", x: 600, y: 300 },
        { type: "cyberPunk", x: 3800, y: 320 },
        { type: "cyberPunk", x: 3600, y: 320 },
        { type: "cyberPunk", x: 3400, y: 180 },
        { type: "cyberPunk", x: 3200, y: 180 },
        { type: "cyberPunk", x: 3000, y: 320 },
        { type: "cyberPunk", x: 2700, y: 180 },
        { type: "enemy", x: 400, y: groundY - 250 },
        { type: "enemy", x: 1800, y: groundY - 250 },
        { type: "enemy", x: 3200, y: groundY - 250 },
        { type: "reward", x: 900, y: groundY - 250 },
        { type: "reward", x: 3000, y: groundY - 250 },
        { type: "reward", x: 2600, y: groundY - 250 },
      ],
    };
    window.levelData = levelData;
    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODO 6 and on go here
    // BEGIN EDITING YOUR CODE HERE

    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 25;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );

      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);

      var obstacleImage = draw.bitmap("img/sawblade.png");
      obstacleImage.x = -25;
      obstacleImage.y = -25;
      sawBladeHitZone.addChild(obstacleImage);
    }

    function sandevistated(x, y) {
      var hitZoneSize = 40;
      var damageFromObstacle = 110;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );

      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);

      var obstacleImage = draw.bitmap(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzGFEqtFOG-_SY-XsafLVyQaiWXKlZ8_p5PtijFp43fVU4SBm9hEooJS_1tsD4kXhCyc&usqp=CAU"
      );
      obstacleImage.scaleX = 0.4;
      obstacleImage.scaleY = 0.4;
      obstacleImage.x = -50;
      obstacleImage.y = -50;
      sawBladeHitZone.addChild(obstacleImage);
    }

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);

      enemy.x = x;
      enemy.y = groundY - y;
      game.addGameItem(enemy);

      enemy.velocityX = -2;
      enemy.rotationalVelocity = 10;

      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };

      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.flyTo(1000, 200);
      };
    }

    function createReward(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "blue");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);

      enemy.x = x;
      enemy.y = groundY - y;
      game.addGameItem(enemy);

      enemy.velocityX = -1;
      enemy.rotationalVelocity = 10;

      enemy.onPlayerCollision = function () {};

      enemy.onProjectileCollision = function () {
        game.increaseScore(250);
        enemy.fadeOut();
        game.changeIntegrity(50);
      };
    }

    for (var i = 0; i < levelData.gameItems.length; i++) {
      if (levelData.gameItems[i].type === "sawblade") {
        createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
      } 
      else if (levelData.gameItems[i].type === "cyberPunk") {
        sandevistated(levelData.gameItems[i].x, levelData.gameItems[i].y);
      } 
      else if (levelData.gameItems[i].type === "enemy") {
        createEnemy(levelData.gameItems[i].x, levelData.gameItems[i].y);
      } 
      else if (levelData.gameItems[i].type === "reward") {
        createReward(levelData.gameItems[i].x, levelData.gameItems[i].y);
      }
    }

    // DO NOT EDIT CODE BELOW HERE
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = level01;
}
