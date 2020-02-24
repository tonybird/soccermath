PIXI.utils.sayHello();

// create a canvas for all game elements
const renderer = PIXI.autoDetectRenderer(512, 512, {
  transparent: true,
  resolution: 1
});
const displayDiv = document.querySelector('#display')
displayDiv.appendChild(renderer.view);
const stage = new PIXI.Container();

// load the spritesheet, first arg could name anything you want
// second arg will be the path of the png file
PIXI.loader
  .add("images/ball.png")
  .load(setup);

let ball;
function setup() {
  stage.interactive = true;

  ball = new PIXI.Sprite(PIXI.loader.resources["images/ball.png"].texture);

//   const texture = PIXI.loader.resources["spritesheet"].texture;
  
  // highly recommend to use scale to change frame size
  ball.scale.set(0.1, 0.1); 
  ball.vx = 10;
  ball.vy = 10;
  stage.addChild(ball); // add sprite to stage area
  animationLoop();
}
// helper function 
function animationLoop() {
  // a function from Pixi
  requestAnimationFrame(animationLoop);
  renderer.render(stage);
};

window.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && ball.x < 650) {
        ball.x += ball.vx
    } else if (event.key === 'ArrowLeft' && ball.x > 0) {
        ball.x -= ball.vx
    } else if (event.key === 'ArrowDown' && ball.y < 450) {
        ball.y += ball.vy
    } else if (event.key === 'ArrowUp' && ball.y > 0) {
        ball.y -= ball.vy
    }
  })