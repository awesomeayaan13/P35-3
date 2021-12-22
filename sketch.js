//Create variables here

var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
var feedPet,addFood,fedTime,lastFed,foodObj



function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happyDogImg=loadImage("dogImg.png");

}

function setup() {
	createCanvas(500, 500);
  


  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  dog=createSprite(250,250);
  dog.addImage(dogImg);

  dog.scale=0.5;

  food1=new Food(200,200,50,50)

 
}

function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function draw() {  

background(46,139,87);



food1.display()

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})





  drawSprites();
  //add styles here

  textSize(15);

  fill("white");

  stroke("black");

  text("Note:Press up arrow to feed the doggo milk", 100,500);
  text(foodS+"  food left for the doggo",150,450)
}


function feedDogs(){
  feed=createButton("feed the dog pls")
  feed.position(700,95)
  feed.mousePressed(feedDog)
}

function addFoodss(){
  addFood=createButton("add the food")
  addFood.mousePressed(addFoods)
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
 
 if(x<=0){
   x=0;
 }
 else{
   x=x-1;
 }
 
 
  database.ref('/').update({
    Food:x
  })
}

