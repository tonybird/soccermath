export function easyProblem() {
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

export function mediumProblem() {
    let ops = ["+", "-", "*"];
    let rndOp = ops[Math.floor(Math.random() * ops.length)];
    let x = 0;
    let y = 0;

    if (rndOp == "*") {
        x = Math.floor((Math.random() * 12) + 1);
        y = Math.floor((Math.random() * 12) + 1);
    } else {
        x = Math.floor((Math.random() * 50) + 1);
        y = Math.floor((Math.random() * 50) + 1);

        if (rndOp == "-") {
            let temp = 0
            if (y > x) {
                temp = x;
                x = y;
                y = temp;
            }
        }
    }

    let answer = 0;
    if (rndOp == "+") {
        answer = x + y;
    } else if (rndOp == "-") {
        answer = x - y
    } else {
        answer = x * y;
    }

    let problem = (x + " " + rndOp + " " + y + " = ?");
    let answersArray = [answer];

    while (answersArray.length < 3) {
        let wrongAnswer = Math.floor((Math.random() * 80) + 1);
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
