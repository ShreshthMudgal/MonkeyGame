
  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;
  var ground;
  var score = 0;
  var gameState = 1;
  var PLAY = 1;
  var END = 0;

function preload(){
  
  
 monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","   sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)  ;
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background(255)
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time :" + score,100,50)
  
  if(gameState === PLAY){
    
   bananas();
  obstacles();  
    
  ground.velocityX = -4;
    
  score = score + Math.round(frameRate()/60)  

  if(keyDown("space") && monkey.y >= 295){
     monkey.velocityY = -17;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
    
  if(monkey.isTouching(obstacleGroup)){
     gameState = END;
    
  }  
}
  else if (gameState === END){
  
      obstacleGroup.setLifetimeEach = -1;
      FoodGroup.setLifetimeEach = -1;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      monkey.velocityY = 0;
  }
        
      
   if (ground.x < 0){
        ground.x = ground.width/2;
   }
  
  
  monkey.collide(ground);
   
  drawSprites();
}

function bananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,Math.round(random(120,200)),20,20);
    banana.addImage("banana",bananaImage)
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifeTime = 15;  
    FoodGroup.add(banana);
  
}
}

function obstacles () {
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,315,20,20);    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifeTime = 15; 
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,200);
  }
  
  
}


