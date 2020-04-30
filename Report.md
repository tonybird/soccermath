# Project Report
COMP 580, Spring 2020

Tony Bird, Ellie Hadden-Ford, Armando Jimenez

## Project Description
We created the web game SoccerMath, which targets elementary school number and operations skills. The game has three levels of difficulty, where easy, medium, and hard approximately correspond to Common Core math standards for 1st, 4th, and 6th grade respectively. 
First, the user selects a difficulty level from a dropdown menu, and then enters the game. A math problem is displayed above a soccer goal and moving goalie, and three answer choices are in the left, middle, and right of the goal. The user selects their answer using the left/right arrow keys, and presses enter to shoot the ball. If the user chose the correct answer, the goalie does not block the ball, and the user scores a goal. After the user shoots the soccer ball, the game announces correct or incorrect, updates the user's score, and generates a new math problem.
To make this game accessible for blind audiences, the game announces the instructions the first time the soccer goal is displayed. Each time a new problem is generated, the game reads it to the user, and each answer choice is read when it is selected. Finally, after the user chooses an answer and shoots the ball, the game announces if the user was correct or incorrect, and the user's current score.
## Intended Audience
SoccerMath is intended to be used by children in elementary school. This game is accessible for multiple audiences, particularly people with motor or visual disabilities. The game is not time-based, and uses simple controls that can be easily used by people with motor disabilities. All instructions, math problems, answer choices, and scores are spoken so that the game can be accessible for blind and visually impaired people, and background stadium noises and cheering for correct answers were implemented to help create a more immersive experience. 
## Technologies Used
SoccerMath was written in JavaScript, using the Pixi.js rendering library for graphics and animations. Howler.js was used to control the background sounds, and the spoken words are dictated by the Web Speech API. We used an HTML form to input game  options, and styled the game wrapper with CSS. 
## How to Deploy
The easiest way to play the game is to access it on Github pages, at https://tonybird.github.io/soccermath/. For development, we deployed the game locally by following these instructions:
1. Clone this repository
2. Navigate to the `soccermath` directory, and run the following commands: `npm install`, `npx http-server`
3. Access the game in your browser at http://localhost:8080/
## Problems Encountered
Overall, most of our problems were related to our decision to build SoccerMath as a Pixi app, since we had limited prior experience using Pixi. At the beginning, we had trouble displaying Pixi on the webpage at all. We also had difficulty implementing the background sounds through Pixi.js. At first, we built the sounds through HTML's audio functionality, but this did not allow us to adjust the volume levels as we wanted. Instead, we used Howler.js in the final product. We also had difficulty passing in game options from the splash page through to the Pixi app. Ultimately, we did find solutions for all of these problems. 
## Future Work
In the future, this game could be expanded to include additional math skills at more levels. It could also be made functional for mobile devices, which would only require an input mode other than the keyboard. 
