var runner1 ,  path , runner1_img ,  path_img , coin_img ,  bomb_img ;
var gameStates=1;
var PLAY=1;
var Coins_Group;
var Bombs_Group;
var score=0;
var END;
var rWall;
var lWall;

function preload(){
  runner1_img = loadAnimation("Runner-1.png" , "Runner-2.png");
  path_img    = loadImage("path.png");
  coin_img    = loadImage("coin.png");
  bomb_img    = loadImage("bomb.png");
}

function setup() {
 createCanvas(800,600);

  path = createSprite(500,500,500,800);
  path.addImage("street",path_img);
  path.velocityY =1;

  runner1 = createSprite(400,500,50,50);
  runner1.addAnimation("run",runner1_img);
  runner1.scale=0.08;

  Bombs_Group = new Group();
  Coins_Group = new Group();

   

}

function draw() {

if(gameStates===PLAY)
{
  background(120);  

  runner1.x=World.mouseX;

  if(path.y>400)
  {
    path.y=300;  
  }

  spawnCoin();
  spawnBomb();

  if(Coins_Group.isTouching(runner1))
  {
    Coins_Group.destroyEach();
    score=score+10;
  }
  
  else
  {
   if(Bombs_Group.isTouching(runner1))
   {
     gameStates=End;
    
   }

  }


}

if(gameStates===END)
{
  Coins_Group.destroyEach();
     Bombs_Group.destroyEach();
     Coins_Group.setVelocityYEach(0);
     Bombs_Group.setVelocityYEach(0);
}


drawSprites();

textSize(20);
fill(225);
text("score: "+score,700,50);


}


function spawnCoin()
{
  if(World.frameCount%60==0)
  {
    var coin = createSprite(Math.round(random(400,600),40,10,10));
    coin.addImage(coin_img);
    coin.scale=0.12;
    coin.velocityY = 5;
    coin.lifetime=200;
    Coins_Group.add(coin);
  }
}

function spawnBomb()
{
  if(World.frameCount%120==0)
  {
    var bomb = createSprite(Math.round(random(400,600),40,10,10));
    bomb.addImage(bomb_img);
    bomb.scale=0.10;
    bomb.velocityY = 5;
    bomb.lifetime=200;
    Bombs_Group.add(bomb);
  }
}









