// import { easyProblem, mediumProblem } from "./math.js";

function generateProblem(x, y, op, answerRange) {
  let correctAnswer = 0;
  switch(op) {
    case "+":
      correctAnswer = x + y;
      break;
    case "-":
      correctAnswer = x - y;
      break;
    case "*":
      correctAnswer = x * y;
      break;
  }

  let answers = [correctAnswer];
  while (answers.length < 3) {
      let wrongAnswer = Math.floor((Math.random() * answerRange) + 1);
      if(!answers.includes(wrongAnswer)) {
          answers.push(wrongAnswer);
      }
  }

  // Shuffle order of answers
  for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  let problemString = `${x} ${op} ${y} = ?`;
  let correctIndex = answers.indexOf(correctAnswer);
  return {problemString, answers, correctIndex};
}

function easyProblem() {
  let ops = ["+", "-"];
  let op = ops[Math.floor(Math.random() * ops.length)];
  let x = Math.floor((Math.random() * 20) + 1);
  let y = Math.floor((Math.random() * 20) + 1);

  // Avoid negative results
  if (op == "-" && x < y) {
      [x,y] = [y,x];
  }

  return generateProblem(x, y, op, 20);
}

function mediumProblem() {
  let ops = ["+", "-", "*"];
  let op = ops[Math.floor(Math.random() * ops.length)];

  let x, y;
  if (op == "*") {
    x = Math.floor((Math.random() * 12) + 1);
    y = Math.floor((Math.random() * 12) + 1);
  } else {
    x = Math.floor((Math.random() * 50) + 1);
    y = Math.floor((Math.random() * 50) + 1);
  }

  // Avoid negative results
  if (op == "-" && x < y) {
    [x,y] = [y,x];
  }

  return generateProblem(x, y, op, 80);
}

function getNewProblem(difficulty) {
  switch(difficulty) {
    case "easy":
      mathProblem = easyProblem();
      break;
    case "medium":
      mathProblem = mediumProblem();
      break;
  }
  leftAnswer.text = mathProblem.answers[0];
  middleAnswer.text = mathProblem.answers[1];
  rightAnswer.text = mathProblem.answers[2];
  problem.text = mathProblem.problemString;
  answerPosition = mathProblem.correctIndex;
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

let display = document.getElementById("display");
display.appendChild(app.view);

PIXI.loader
  .add([
    "images/soccer_goal.jpg",
    "images/left_arrow.png",
    "images/right_arrow.png",
    "images/up_arrow.png",
    "images/ball.png",
    "images/goalie.png",
    "images/diving_goalie_noball.png"
  ])
  .load(setup);

let shoot = false;
let shotBall = false;
let inactiveArrowAlpha = 0.3;
let leftArrow, leftAnswer, middleArrow, middleAnswer, rightArrow, rightAnswer;
let problem, answerPosition, score = 0, streak = 0, position = 0;
let difficulties = ["easy", "medium", "hard"];
let difficulty = "easy";
let ball, goalie;
let leftX, middleX, rightX, answerY, ballY;
let missSound;
let goalSound;
let crowdNoise;

function setup() {
  let background = new PIXI.Sprite(
    PIXI.loader.resources["images/soccer_goal.jpg"].texture
  );

  difficulty = document.getElementById("difficulty").value;

  leftX = 110;
  middleX = 306;
  rightX = 495;

  let arrowY = 430;
  let arrowSize = 50;

  let problemY = 50;
  answerY = 150;

  ballY = 380;
  let ballSize = 50;

  let scoreX = 480;
  let scoreY = 15;

  let goalieY = 270;
  let goalieSize = 250;

  ball = new PIXI.Sprite(
    PIXI.loader.resources["images/ball.png"].texture
  );
  ball.anchor.set(0.5);
  ball.width = ballSize;
  ball.height = ballSize;
  ball.x = middleX;
  ball.y = ballY;
  ball.vx = 0;
  ball.vy = 0;

  goalie = new PIXI.Sprite(
    PIXI.loader.resources["images/goalie.png"].texture
  );
  goalie.anchor.set(0.5);
  goalie.width = goalieSize;
  goalie.height = goalieSize;
  goalie.x = 312;
  goalie.y = goalieY;
  goalie.vx = 1;

  let divingGoalie = new PIXI.Sprite(
    PIXI.loader.resources["images/diving_goalie_noball.png"].texture
  );
  divingGoalie.anchor.set(0.5);
  divingGoalie.width = goalieSize;
  divingGoalie.height = goalieSize;
  divingGoalie.x = 312;
  divingGoalie.y = goalieY;

  scoreDisplay = new PIXI.Text("Score: 0", { font: 'bold 80px Arial', fill: 'yellow', align: 'center' });
  scoreDisplay.x = scoreX;
  scoreDisplay.y = scoreY;

  leftAnswer = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  middleAnswer = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  rightAnswer = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  problem = new PIXI.Text("", { font: 'bold 80px Arial', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });
  getNewProblem(difficulty);

  leftArrow = new PIXI.Sprite(
    PIXI.loader.resources["images/left_arrow.png"].texture
  );
  leftArrow.width = arrowSize;
  leftArrow.height = arrowSize;
  leftArrow.anchor.set(0.5);
  leftArrow.x = leftX;
  leftArrow.y = arrowY;
  if (position != 0) {
    leftArrow.alpha = inactiveArrowAlpha;
  }

  middleArrow = new PIXI.Sprite(
    PIXI.loader.resources["images/up_arrow.png"].texture
  );
  middleArrow.width = arrowSize;
  middleArrow.height = arrowSize;
  middleArrow.anchor.set(0.5);
  middleArrow.x = middleX;
  middleArrow.y = arrowY;
  if (position != 1) {
    middleArrow.alpha = inactiveArrowAlpha;
  }

  rightArrow = new PIXI.Sprite(
    PIXI.loader.resources["images/right_arrow.png"].texture
  );
  rightArrow.width = arrowSize;
  rightArrow.height = arrowSize;
  rightArrow.anchor.set(0.5);
  rightArrow.x = rightX;
  rightArrow.y = arrowY;
  rightArrow.alpha = 0.5;
  if (position != 2) {
    rightArrow.alpha = inactiveArrowAlpha;
  }

  leftAnswer.position.x = leftX;
  leftAnswer.position.y = answerY;
  leftAnswer.anchor.set(0.5);

  middleAnswer.position.x = middleX;
  middleAnswer.position.y = answerY;
  middleAnswer.accessible = true;
  middleAnswer.anchor.set(0.5);

  rightAnswer.position.x = rightX;
  rightAnswer.position.y = answerY;
  rightAnswer.anchor.set(0.5);

  problem.position.x = middleX;
  problem.position.y = problemY;
  problem.anchor.set(0.5);

  // leftArrow.buttonMode = true;
  // leftArrow.interactive = true;
  // leftArrow.accessible = true;

  // middleArrow.buttonMode = true;
  // middleArrow.interactive = true;
  // middleArrow.accessible = true;

  // rightArrow.buttonMode = true;
  // rightArrow.interactive = true;
  // rightArrow.accessible = true;

  // first added child is furthest back
  app.stage.addChild(background);
  app.stage.addChild(leftAnswer);
  app.stage.addChild(middleAnswer);
  app.stage.addChild(rightAnswer);
  app.stage.addChild(problem);
  app.stage.addChild(leftArrow);
  app.stage.addChild(middleArrow);
  app.stage.addChild(rightArrow);
  app.stage.addChild(scoreDisplay);
  app.stage.addChild(ball);
  app.stage.addChild(goalie);
  // app.stage.addChild(divingGoalie);

  // Set the game state
  state = play;

  // Start the game loop 
  app.ticker.add(delta => gameLoop(delta));

  // Stadium ambiance plays on a loop
  crowdNoise = new sound("sounds/crowdSoundEffect.mp3", "crowdSound");
  document.getElementById("crowdSound").loop = true;

  missSound = new sound("sounds/missSound.wav", "missSound")
  goalSound = new sound("sounds/goalSound.wav", "goalSound")
}

function sound(src, id) {
  this.sound = document.createElement("audio");
  this.sound.id = id;
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function gameLoop(delta) {
  // Update the current game state:
  state(delta);
}

function play(delta) {

  // Arrow behavior
  if (position == 0) {
    leftArrow.alpha = 1;
    middleArrow.alpha = inactiveArrowAlpha;
    rightArrow.alpha = inactiveArrowAlpha;
  } else if (position == 1) {
    leftArrow.alpha = inactiveArrowAlpha;
    middleArrow.alpha = 1;
    rightArrow.alpha = inactiveArrowAlpha;
  } else if (position == 2) {
    leftArrow.alpha = inactiveArrowAlpha;
    middleArrow.alpha = inactiveArrowAlpha;
    rightArrow.alpha = 1;
  }

  // Goalie movement
  goalie.x += goalie.vx;
  if (goalie.x < leftX || goalie.x > rightX) {
    goalie.vx = 0 - goalie.vx;
  }

  // Handle animations after shot
  if (shoot && shotBall == false) {
    // Move goalie to block if answer is incorrect
    if (answerPosition !== position) {
      // Plays crowd jeers when shot is blocked.
      missSound.play();
      if (position === 0) {
        goalie.x = leftX;
      } else if (position === 1) {
        goalie.x = middleX;
      } else {
        goalie.x = rightX;
      }
    }
    // Render ball animation
    if (position == 0) {
      if (ball.x <= leftX) {
        ball.vx = 0;
        ball.vy = 0;
        ball.x = middleX;
        ball.y = ballY;
        shotBall = true;
      } else {
        ball.vx = -6;
        ball.x += ball.vx;
        ball.vy = -6;
        ball.y += ball.vy;
      }
    }
    if (position == 1) {
      if (ball.y <= answerY) {
        ball.vx = 0;
        ball.vy = 0;
        ball.x = middleX;
        ball.y = ballY;
        shotBall = true;
      } else {
        ball.vy = -8;
        ball.y += ball.vy;
      }
    }
    if (position == 2) {
      if (ball.x >= rightX) {
        ball.vx = 0;
        ball.vy = 0;
        ball.x = middleX;
        ball.y = ballY;
        shotBall = true;
      } else {
        ball.vx = 6;
        ball.x += ball.vx;
        ball.vy = -6;
        ball.y += ball.vy;
      }
    }
  }
  // Checks if right or wrong and updates score accordingly, resets for next round
  if (shoot && shotBall) {
    if (answerPosition == position) {
      // Plays cheers when goal is scored
      goalSound.play();
      score++; 
      streak++;
      scoreDisplay.text = "Score: " + score;
      if (streak % 10 == 0) alert("Streak: " + streak);
      getNewProblem(difficulty);
    } else {
      // Incorrect
      streak = 0;
      getNewProblem(difficulty);
    }
    shoot = false;
    // reset arrow to middle after shot
    position = 1;
  }
}

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'Tab') {
    position++;
    if (position == 3) position = 0;
  } else if (event.key === 'ArrowLeft') {
    position--;
    if (position == -1) position = 2;
  } else if (event.key === 'Enter') {
    shoot = true;
    shotBall = false;
    // Plays sound when first shot is taken... might move when
    // we have a START button implemented on our splash page
    crowdNoise.play();
  }
});