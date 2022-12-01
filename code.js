var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["f897976a-3ae8-4374-93d6-3a116e538112"],"propsByKey":{"f897976a-3ae8-4374-93d6-3a116e538112":{"name":"ball","sourceUrl":"assets/api/v1/animation-library/gamelab/JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G/category_sports/volleyball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G/category_sports/volleyball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//crear pelota
var ball;
ball = createSprite(200,280,20,20);
ball.setAnimation("ball");
ball.scale = 0.1;
//crear paleta
var paleta=createSprite(50,350,75,10);
paleta.shapeColor="pink"
//crear variable para crear grupo de ladrillos
var bricks = createGroup()

//activar los muros
createEdgeSprites();
var Score=0;
//llamar función para crear ladrillos
createBrickRow(65,"purple")
createBrickRow(65+29,"pink")
createBrickRow(65+29+29,"red")
createBrickRow(+65+29+29+29,"orange")

//función para crear grupos de ladrillos
function createBrickRow(y,color){
for (var c = 0; c<6; c++) {
var brick=createSprite(65+54*c,y,50,25);
brick.shapeColor=color;
bricks.add(brick);
}
}
//variable para estados
var estado="serve";
//variable para vidas
var vidas = 5

function draw() {
  background("black");
  textSize (20);
  text("vidas" +vidas, 325, 30);
  text("Score:"+Score,4,25)
 //crear estado de serve 
  if (estado=="serve") {
  textSize(20);
  text("click para comenzar",110,250);
   ball.velocityX=0;
     ball.velocityY=0;
     ball.x=200;
     ball.y=200;
  }
  //crear estado de finalizado
  else if (estado=="over") {
    fill("yellow");
    text("¡Fin del Juego!",150,250);
    ball.remove;
    
  }
  
  
  else{
    gameplay();
  }
  
  
  drawSprites();
  

}
//funcion 
function mousePressed() 
{
  if(estado == "serve") {
    estado = "play";
       ball.velocityX =3;
       ball.velocityY =4;
     bricks.setVelocityYEach(0.2);
    
 

}

}
//funcion eventos
function brickHit(ball,brick)  {
  playSound( "assets/category_bell/vibrant_game_bell_twinkle_positive_touch_1.mp3")
  //console.log(Score);
brick.destroy();
  Score=Score+10;
 
if (ball.velocityY>-12&& ball.velocityY<12) {
    ball.velocityX*=1.05;
    ball.velocityY*=1.05;
  }

}

function Gameover(){
  if(vidas!=0){
    vidas=vidas-1;
  }
  if (vidas>=1) {
   estado = "serve";
  } 
  else{
    estado="over";
  }
  
}

function gameplay(){
 
  paleta.x=ball.x;
 if (paleta.x<60) {
 paleta.x=60;   
  }
  if (paleta.x>340) {
    paleta.x=340;
  }
   
  ball.bounceOff(topEdge);

  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(bricks, brickHit)
   
  if (ball.bounceOff(paleta)) {
  playSound("assets/category_bell/notification_4.mp3");
}
if (!bricks[0]) {
  ball.velocityX = 0;
  ball.velocityY = 0;
  text("Juego terminado", 120, 250);
  console.log(bricks[0])
}
if (ball.isTouching(bottomEdge)) {
  Gameover();
}
}











// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
