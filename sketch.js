var bg, bgImg
var bird, birdImg,featherImg
var obstacles,obsGroup
var play = 1;
var end = 0;
var gamestate = play 
var score = 0;
var plane,planeImg
var parrotImg
var gameOver, gameOverImg
var restart,restartImg
var thud,flap


function preload(){
  bgImg = loadImage("./Images/background.jpg")
  birdImg = loadAnimation("./Images/birds/bird1.png", "./Images/birds/bird2.png", "./Images/birds/bird3.png",  "./Images/birds/bird4.png", "./Images/birds/bird5.png", "./Images/birds/bird6.png", "./Images/birds/bird7.png", "./Images/birds/bird8.png",)
  featherImg = loadAnimation("./Images/birds/boom.png")
  planeImg = loadImage("./Images/plane1.png")
  parrotImg = loadAnimation("./Images/b/badBird1.png", "./Images/b/badBird2.png", "./Images/b/badBird3.png","./Images/b/badBird4.png", "./Images/b/badBird5.png", "./Images/b/badBird6.png", 
  "./Images/b/badBird7.png", "./Images/b/badBird8.png",)
  gameOverImg = loadImage("./Images/Game_Over_Logo.png")
  restartImg = loadImage("./Images/restart.png")
  thud = loadSound("./Sounds/uh oh.mp3")
  flap = loadSound("./Sounds/bird.mp3")



}



function setup(){
  createCanvas(windowWidth,windowHeight)

  bg = createSprite(width/2,height/2)
  bg.addImage(bgImg)
  bg.scale = 1.5
  bg.velocityX = -2

  bird = createSprite(350,height/2-150)
  bird.addAnimation("flying",birdImg)
  bird.addAnimation("collided", featherImg)
  bird.scale = 0.7  

  gameOver = createSprite(width/2,height/2-100)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.6  
  gameOver.visible = false;


  restart = createSprite(width/2,height/2+100)
  restart.addImage(restartImg)
  restart.scale = 0.20 
  restart.visible = false;

  obsGroup = new Group()

  bird.setCollider("circle",0,0,100)
  //bird.debug = true
}



function draw() {
  background(200)


  if(bg.x<=500){
    bg.x = width/2 + 230
  }

  if(gamestate === play){
    bg.velocityX = -(4 + score/100)
    score = score + Math.round(getFrameRate()/10);
    //console.log(score)

    checkCollision()

    spawnPlanes()

    spawnObstacles()
  }


  if (gamestate === end){
    bg.velocityX = 0
    bird.scale = 0.6
    bird.changeAnimation("collided",featherImg)
    obsGroup.setVelocityXEach(0)
    obsGroup.destroyEach()
    
    gameOver.visible = true;
    restart.visible = true;

    

    if(mousePressedOver(restart)){

      reset()

    }

  }

  controlBird()



  drawSprites()

  textSize(25)
  fill("black")
  text("Score: "+ score, width/2+550,80);
  

 
}


function controlBird(){
  if(keyDown(UP_ARROW) && bird.y>50 && gamestate === play){
    bird.y = bird.y-5
    if(!flap.isPlaying()){
      flap.play()
    }
  }
  if(keyDown(DOWN_ARROW) && bird.y<height-300 && gamestate === play){
    bird.y = bird.y+5
    if(!flap.isPlaying()){
      flap.play()
    }
  }
}



function spawnObstacles(){
  if(frameCount%80===0){
    var ranY = Math.round(random(50,height-300))
    var obstacle = createSprite(width+200,ranY,50,30)
    obstacle.velocityX = -5
    obstacle.addAnimation("badBird", parrotImg)
    obstacle.scale = 0.5
    obstacle.lifetime = 400
    obstacle.setCollider("circle",0,0,100)
    //obstacle.debug = true
    obsGroup.add(obstacle)
    gameOver.depth = obstacle.depth + 1
    restart.depth = obstacle.depth + 1
  }
}


function spawnPlanes(){
  if(frameCount%100===0){
    var ranY = Math.round(random(50,height-300))
    var plane = createSprite(width+200,ranY,50,30)
    plane.velocityX = -10
    plane.addImage(planeImg)
    plane.scale = 0.5
    plane.lifetime = 300
    plane.setCollider("rectangle", 0,0,450,150)
    //plane.debug = true
    obsGroup.add(plane)
    gameOver.depth = plane.depth + 1
    restart.depth = plane.depth + 1
  }
}


function checkCollision(){
  if(bird.isTouching(obsGroup)){
    
    gamestate = end
    console.log("gameOver")

    thud.play()
    }
  }


  function reset(){
    score = 0
    gamestate = play
    obsGroup.destroyEach()
    bird.changeAnimation("flying",birdImg)
    gameOver.visible = false;
    restart.visible = false;
  }
