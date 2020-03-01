// import { easyProblem, mediumProblem } from "./math.js";

function easyProblem() {
  let x = Math.floor((Math.random() * 20) + 1);
  let y = Math.floor((Math.random() * 20) + 1);

  let ops = ["+", "-"];

  let rndOp = ops[Math.floor(Math.random() * ops.length)];

  if (rndOp == "-") {
      let temp = 0
      if (y > x) {
          temp = x;
          x = y;
          y = temp;
      }
  }

  let answer = 0;
  if (rndOp == "+") {
      answer = x + y;
  } else {
      answer = x - y
  }

  let problem = (x + " " + rndOp + " " + y + " = ?");
  let answersArray = [answer];

  while (answersArray.length < 3) {
      let wrongAnswer = Math.floor((Math.random() * 20) + 1);
      if(answersArray.indexOf(wrongAnswer) == -1) {
          answersArray.push(wrongAnswer);
      }
  }

  for (let i = answersArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
  }

  let outputArray = [problem, answersArray, answersArray.indexOf(answer)];

  // console.log(problem);
  // console.log(answersArray);
  // console.log("The answer is " + answer);
  // console.log(outputArray);
  
  return outputArray;
}

function newProblem() {
  mathProblem = easyProblem();
  leftAnswer.text = mathProblem[1][0];
  middleAnswer.text = mathProblem[1][1];
  rightAnswer.text = mathProblem[1][2];
  problem.text = mathProblem[0];
  answerPosition = mathProblem[2];
}

//Create a Pixi Application
let app = new PIXI.Application({
  backgroundColor: 0x061639,
  width: 612,         // default: 800
  height: 464,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
});

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

PIXI.loader
  .add([
    "images/soccer_goal.jpg",
    "images/left_arrow.png",
    "images/right_arrow.png",
    "images/up_arrow.png"
  ])
  .load(setup);

let mathProblem = easyProblem();
console.log(mathProblem[0]);
let position = 1;
let shoot = false;
let problem, leftArrow, leftAnswer, middleArrow, middleAnswer, rightArrow, rightAnswer, answerPosition;

function setup() {
  let background = new PIXI.Sprite(
    PIXI.loader.resources["images/soccer_goal.jpg"].texture
  );

  let leftX = 100;
  let middleX = 285;
  let rightX = 465;

  let arrowY = 400;
  let arrowWidthHeight = 50;

  let problemY = 50;
  let answerY = 150;

  leftAnswer = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  middleAnswer = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  rightAnswer = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  problem = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  newProblem();

  leftArrow = new PIXI.Sprite(
    PIXI.loader.resources["images/left_arrow.png"].texture
  );
  leftArrow.width = arrowWidthHeight;
  leftArrow.height = arrowWidthHeight;
  leftArrow.x = leftX;
  leftArrow.y = arrowY;
  if (position != 0) {
    leftArrow.visible = false;
  }

  middleArrow = new PIXI.Sprite(
    PIXI.loader.resources["images/up_arrow.png"].texture
  );
  middleArrow.width = arrowWidthHeight;
  middleArrow.height = arrowWidthHeight;
  middleArrow.x = middleX;
  middleArrow.y = arrowY;
  if (position != 1) {
    middleArrow.visible = false;
  }

  rightArrow = new PIXI.Sprite(
    PIXI.loader.resources["images/right_arrow.png"].texture
  );
  rightArrow.width = arrowWidthHeight;
  rightArrow.height = arrowWidthHeight;
  rightArrow.x = rightX;
  rightArrow.y = arrowY;
  if (position != 2) {
    rightArrow.visible = false;
  }

  leftAnswer.position.x = leftX;
  leftAnswer.position.y = answerY;

  middleAnswer.position.x = middleX;
  middleAnswer.position.y = answerY;

  rightAnswer.position.x = rightX;
  rightAnswer.position.y = answerY;

  problem.position.x = middleX;
  problem.position.y = problemY;
  problem.anchor.set(0.5);

  // first added child is furthest back
  app.stage.addChild(background);
  app.stage.addChild(leftAnswer);
  app.stage.addChild(middleAnswer);
  app.stage.addChild(rightAnswer);
  app.stage.addChild(problem);
  app.stage.addChild(leftArrow);
  app.stage.addChild(middleArrow);
  app.stage.addChild(rightArrow);

  // Set the game state
  state = play;

  // Start the game loop 
  app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {
  // Update the current game state:
  state(delta);
}

function play(delta) {
  if (position == 0) {
    leftArrow.visible = true;
    middleArrow.visible = false;
    rightArrow.visible = false;
  } else if (position == 1) {
    leftArrow.visible = false;
    middleArrow.visible = true;
    rightArrow.visible = false;
  } else if (position == 2) {
    leftArrow.visible = false;
    middleArrow.visible = false;
    rightArrow.visible = true;
  }

  if (shoot) {
    if (answerPosition == position) {
      alert("correct!");
      newProblem();
    } else {
      alert("incorrect");
    }
  }
  shoot = false;
}

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') {
    if (position == 0) {
      position = 1;
    } else if (position == 1) {
      position = 2;
    } else {
      position = 0;
    }
  } else if (event.key === 'Enter') {
    shoot = true;
  }
});