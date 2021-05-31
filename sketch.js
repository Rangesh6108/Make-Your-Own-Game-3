
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var basket,GoldenEgg,SilverEgg,BronzeEgg,RedEgg,BlackEgg,bg,bg_2;
 
var basketImg,GoldenEggImg,SilverEggImg,BronzeEggImg,RedEggImg,BlackEggImg,gameOver;

var invisground;

var specialegg,Se1,Se2,Se3,Se4;

var edges;

var playbutton,playbuttonImg;

var goldenG,silverG,bronzeG,redG,specialG,blackG;

var eggselling;

var gameState="serve";

var score=0;

var	ge=0;

var se=0;

var be=0;

var re=0;

var bee=0;

var see=0;

function preload(){

	basketImg=loadImage("Images/Basket.png");
	GoldenEggImg=loadImage("Images/Goldenegg.png");
	SilverEggImg=loadImage("Images/Silveregg.png");
	BronzeEggImg=loadImage("Images/Bronzeegg.png");
	RedEggImg=loadImage("Images/Redegg.png");
	playbuttonImg=loadImage("Images/Playbutton.png");
	bg=loadImage("Images/Farmimg.png");
	bg_2=loadImage("Images/Farming.png");
	gameOver=loadImage("Images/Gameoverbg.png");
	eggselling=loadImage("Images/SellingEggbg.png");
	Se1=loadImage("Images/SpecialEgg_1.png");
	Se2=loadImage("Images/SpecialEgg_2.png");
	Se3=loadImage("Images/SpecialEgg_3.png");
	Se4=loadImage("Images/SpecialEgg_4.png");
	BlackEggImg=loadImage("Images/Blackegg.png");
	
}

function setup() {
	createCanvas(1500,1000);


	engine = Engine.create();
	world = engine.world;

	playbutton=createSprite(500,500);
	playbutton.addImage(playbuttonImg);
	playbutton.scale=0.7;

	invisground=createSprite(400,600,2000,10);
	invisground.visible=false;

	edges=createEdgeSprites();

	basket=createSprite(400,600);
	basket.collide(invisground);
	basket.addImage(basketImg);
	basket.scale=0.2;
	basket.debug=false;

	Engine.run(engine);

	goldenG  = new Group();
	silverG  = new Group();
	bronzeG  = new Group();
	redG     = new Group();
	blackG   = new Group();
	specialG = new Group();

}


function draw() {
  
  Engine.update(engine);

  basket.bounceOff(edges,0);
  basket.bounceOff(edges,1);

  mousePressed();

  keyPressed();

  collision();

  gameStates();

  changeEggImage();
  
  drawSprites();

  strokeWeight(4);

  if(gameState==="play"||gameState=="end"||gameState==="finish"){
  textSize(25);
  textFont("Lucida Handwriting");
  strokeWeight(5);
  stroke("white");
  fill("purple");
  text("Score : " + score,700,50);
  strokeWeight(10);
  fill("gold");
  text("Golden Egg: " + ge,200,950);
  fill("silver");
  text("Silver Egg: " + se,700,950);
  fill("#cd7f32");
  text("Bronze Egg: " + be,1200,950);
  fill("red");
  text("Red Egg: " + re,1200,850);
  fill("#6b78fb");
  text("Special Egg: " + see,700,850);
  fill("black");
  text("Black Egg: " + bee,200,850);
  }

  if(gameState==="serve"){
	strokeWeight(6);
	textFont("Lucida Calligraphy")
	stroke("ghostwhite");
	fill("magenta");
	textSize(25);
	text("Story:",30,150);
	text("An old man is taking care of farm animals.",40,200);
	text("He use to collect the eggs and sell it, one day he saw the hens are sitting on a rope.",40,240);
	text("So help the old man to colect the eggs in a basket.",40,280);
	text("Press the PLAY button below to start the game.",300,350);
	strokeWeight(6);
	stroke("lightcyan");
	fill("darkmagenta");
	textSize(25);
	text("Rules:",30,650);
	text("Use left <- and right-> arrow keys to move the basket.",40,700);
	text("Earn 100 scores to sell the eggs.",40,740);
	text("If you collect 10 red or black eggs then you will loose.",40,780);

}

 
}

function playGame(){

 gameState="play";

 console.log(see);

}

function createEggs(){


	var egg=Math.round(random(1,6));

	if(frameCount%50===0){

	if(egg===1){
		
		GoldenEgg=createSprite(500,192);
		GoldenEgg.addImage(GoldenEggImg);
		GoldenEgg.scale=0.1;

		GoldenEgg.x=Math.round(random(250,1320));
		GoldenEgg.velocityY=15;
		goldenG.add(GoldenEgg);
		goldenG.setLifeTime=500;
	}

	if(egg===2){
		
		SilverEgg=createSprite(500,192);
		SilverEgg.addImage(SilverEggImg);
		SilverEgg.scale=0.1;

		SilverEgg.x=Math.round(random(250,1320));
		SilverEgg.velocityY=15;
		silverG.add(SilverEgg);
		silverG.setLifeTime=500;
	}

	if(egg===3){

		BronzeEgg=createSprite(500,192);
		BronzeEgg.addImage(BronzeEggImg);
		BronzeEgg.scale=0.1;

		BronzeEgg.x=Math.round(random(250,1320));
		BronzeEgg.velocityY=15;
		bronzeG.add(BronzeEgg);
		bronzeG.setLifeTime=500;
	}

	if(egg===4){

		specialegg=createSprite(500,192);
		specialegg.velocityY=15;

		var image=Math.round(random(1,4)); 
		specialegg.x=Math.round(random(250,1320));
		specialegg.scale=0.5;
		specialG.add(specialegg);

		if(image===1){
			specialegg.addImage(Se1);
		}

		if(image===2){
			specialegg.addImage(Se2);
		}

		if(image===3){
			specialegg.addImage(Se3);
		}

		if(image===4){
			specialegg.addImage(Se4);
		}
	}

	if(egg===5){

		RedEgg=createSprite(500,192);
		RedEgg.addImage(RedEggImg);
		RedEgg.scale=0.1;

		RedEgg.x=Math.round(random(250,1320));
		RedEgg.velocityY=15;
		redG.add(RedEgg);
		redG.setLifeTime=1000;
	}

	if(egg===6){

		BlackEgg=createSprite(500,192);
		BlackEgg.addImage(BlackEggImg);
		BlackEgg.scale=0.3;

		BlackEgg.x=Math.round(random(250,1320));
		BlackEgg.velocityY=15;
		blackG.add(BlackEgg);
	}

	}
}

function collision(){

	if(basket.isTouching(specialG)){
		specialG.destroyEach();
		score+=5;
		see++;
	}

	if(basket.isTouching(goldenG)){
		goldenG.destroyEach();
		score+=3;
		ge++;
	}
  
	if(basket.isTouching(silverG)){
		silverG.destroyEach();
		score+=2;
		se++;
	}

	if(basket.isTouching(bronzeG)){
		bronzeG.destroyEach();
		score++;
		be++;
	}

	if(basket.isTouching(redG)){
		redG.destroyEach();
		score-=5;
		re++;
	}

	if(basket.isTouching(blackG)){
		blackG.destroyEach();
		score-=10;
		bee++;
	}

	if(invisground.isTouching(goldenG)){
		goldenG.destroyEach();
	}

	if(invisground.isTouching(silverG)){
		silverG.destroyEach();
	}

	if(invisground.isTouching(bronzeG)){
		bronzeG.destroyEach();
	}

	if(invisground.isTouching(redG)){
		redG.destroyEach();
	}

	if(invisground.isTouching(specialG)){
		specialG.destroyEach();
	}

	if(invisground.isTouching(blackG)){
		blackG.destroyEach();
	}

	if(re>9||bee>9){
		gameState="end";
	}

	if(score>99){
		gameState="finish";
	}

}

function gameStates(){

	if(gameState==="serve"){
		playbutton.visible=true;
		background(bg_2);
		basket.visible=false;
	  }
	
	  if(gameState=="play"){
		playbutton.visible=false;
		background(bg);
		createEggs();
		basket.visible=true;
	  }

	  if(gameState==="end"){
		background(gameOver);
		basket.visible=false;
	}

	if(gameState==="finish"){
		background(eggselling);
		basket.visible=false;
	}

}

function keyPressed(){
  
	if(keyDown("LEFT_ARROW")){
	  basket.x-=25;
	}
  
	if(keyDown("RIGHT_ARROW")){
	  basket.x+=25;
  }

}

function mousePressed(){

	if(mousePressedOver(playbutton)){
		playGame();
	}

}

function changeEggImage(){

	
}



