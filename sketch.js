var database;
var dbPosition;

var bg;

var balloon, balloonAnime1, balloonAnime2, balloonAnime3;

function preload(){
  bg = loadImage("pro-C35 images/bg.png")
  balloonAnime1 = loadImage("pro-C35 images/brrbrr1.png");
  balloonAnime2 = loadImage("pro-C35 images/brrbrr2.png");
  balloonAnime3 = loadImage("pro-C35 images/brrbrr3.png");
}

function setup(){
    createCanvas(1250,833.5);
    balloon = createSprite(width/2, height/2+100);
    balloon.addImage(balloonAnime1);

    database = firebase.database();
    // location for reading or writing --------.ref()
    // reads data from the database--------------.on()
    //writes data into the database------------   .set()

    dbPositionRef = database.ref("car/position");
    dbPositionRef.on("value", readPosition, showError)

}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
    
}

function writePosition(x,y){
    database.ref("car/position").set({
        x:balloon.x+x, y:balloon.y+y
    })
}

function showError(){
    console.log("Sorry nothing went wrong...............");
  }


function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
        balloon.addImage(balloonAnime2)
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
        balloon.addImage(balloonAnime3)
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        balloon.addImage(balloonAnime1)
        balloon.scale = balloon.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
        balloon.addImage(balloonAnime1)
        balloon.scale = balloon.scale+0.01;
    }
    drawSprites();
}

function changePosition(x,y){
    balloon.x = balloon.x + x;
    balloon.y = balloon.y + y;
}
