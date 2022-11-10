var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 2400, "y":groundY - 300 },
                { "type": "sawblade", "x": 2200, "y":groundY - 200 },
                { "type": "sawblade", "x": 2000, "y":groundY - 200 },
                { "type": "sawblade", "x": 1800, "y":groundY - 300 },
                { "type": "sawblade", "x": 1600, "y":groundY - 300 },
                { "type": "sawblade", "x": 1400, "y":groundY - 200 },
                { "type": "sawblade", "x": 1200, "y":groundY - 300 },
                { "type": "sawblade", "x": 1000, "y":groundY - 300 },
                { "type": "sawblade", "x": 800, "y":groundY - 200 },
                { "type": "sawblade", "x": 600, "y":groundY - 300 },
                { "type": "cyberPunk", "x": 3800, "y": groundY - 320},
                { "type": "cyberPunk", "x": 3600, "y": groundY - 320},
                { "type": "cyberPunk", "x": 3400, "y": groundY - 180},
                { "type": "cyberPunk", "x": 3200, "y": groundY - 180},
                { "type": "cyberPunk", "x": 3000, "y": groundY - 320},
                { "type": "cyberPunk", "x": 2700, "y": groundY - 180},
                { "type": "enemy", "x": 400, "y": groundY - 250},
                { "type": "enemy", "x": 1800, "y": groundY - 250},
                { "type": "enemy", "x": 3200, "y": groundY - 250},
                { "type": "reward", "x": 900, "y": groundY - 250},
                { "type": "reward", "x": 3000, "y": groundY - 250},
                { "type": "reward", "x": 2600, "y": groundY - 250},

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade (x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 25;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        
        var obstacleImage = draw.bitmap("img/sawblade.png");
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
        }
        
        createSawBlade(2000, 200)
        createSawBlade(1800, 300)
        createSawBlade(1600, 300)
        createSawBlade(1400, 200)
        createSawBlade(1200, 300)
        createSawBlade(1000, 300)
        createSawBlade(800, 200)
        createSawBlade(600, 300)
        createSawBlade(2200, 200)
        createSawBlade(2400, 300)

        function sandevistated (x, y){
            var hitZoneSize = 40;
            var damageFromObstacle = 110;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            
            var obstacleImage = draw.bitmap("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzGFEqtFOG-_SY-XsafLVyQaiWXKlZ8_p5PtijFp43fVU4SBm9hEooJS_1tsD4kXhCyc&usqp=CAU");
            obstacleImage.scaleX = 0.4;
            obstacleImage.scaleY = 0.4;
            obstacleImage.x = -50;
            obstacleImage.y = -50;
            sawBladeHitZone.addChild(obstacleImage);
            }
            sandevistated(2700, 320)
            sandevistated(3000, 320)
            sandevistated(3200, 180)
            sandevistated(3400, 180)
            sandevistated(3600, 320)
            sandevistated(3800, 180)

               function createEnemy (x, y){
                var enemy = game.createGameItem("enemy", 25);
                var redSquare = draw.rect(50, 50, "red");
                redSquare.x = -25;
                redSquare.y = -25;
                enemy.addChild(redSquare);

                enemy.x = x;
                enemy.y = groundY - y;
                game.addGameItem(enemy);

                enemy.velocityX = -2
                enemy.rotationalVelocity = 10

                enemy.onPlayerCollision = function () {
                    game.changeIntegrity(-10)
                };

                enemy.onProjectileCollision = function () {
                    game.increaseScore(100);
                    enemy.flyTo(1000, 200);
                }
               
                
               }
                
                createEnemy(400, groundY - 250);
                createEnemy(1800, groundY - 250);
                createEnemy(3200, groundY - 250);


            function createReward (x, y){
                
                var enemy = game.createGameItem("enemy", 25);
                var redSquare = draw.rect(50, 50, "blue");
                redSquare.x = -25;
                redSquare.y = -25;
                enemy.addChild(redSquare);

                enemy.x = x;
                enemy.y = groundY - y;
                game.addGameItem(enemy);

                enemy.velocityX = -1
                enemy.rotationalVelocity = 10

                enemy.onPlayerCollision = function () {
                    
                };

                enemy.onProjectileCollision = function () {
                    game.increaseScore(250);
                    enemy.fadeOut();
                    game.changeIntegrity(50);
                }
                }

                createReward(900, groundY - 250);
                createReward(3000, groundY - 250);
                createReward(2600, groundY - 250);

                for (var i = 0; i < levelData.gameItems.length; i++){
                    if (levelData.gameItems[i] == "sawblade") {
                        
                    }
                }
                
                // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
