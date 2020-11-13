var dog,dogImg,dogImg1,bg;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
   bg=loadImage("Images/doghouse.jpg");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(200,350,150,150);
  dog.addImage(dogImg);
  dog.scale=0.3;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,300,490);
  textSize(15);
  fill("purple");
  text("Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}