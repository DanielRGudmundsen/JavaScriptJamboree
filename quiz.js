// Array containing quiz questions, answers, and correct answers
let questions = [
    {
        question: "What does the '===' operator do in JavaScript?",
        answers: ["A. Adds values", "B. Subtracts values", "C. Checks for both equal value and equal type", "D. Checks for equal value"],
        correctAnswer: "C. Checks for both equal value and equal type"
    },
    {
        question: "How can you declare a variable in JavaScript?",
        answers: ["A. variable x;", "B. let x;", "C. declare x;", "D. var x;"],
        correctAnswer: ["B. let x;","D. var x;"]
    },
    {
        question: "What is a correct way to define a JavaScript array?",
        answers: ["A. let x = [1, 2, 3];", "B. let x = 1,2,3;", "C. let x = array(1, 2, 3);", "D. let x = (1, 2, 3);"],
        correctAnswer: "A. let x = [1, 2, 3];"
    },
    {
        question: "What keyword is used to define a function in JavaScript?",
        answers: ["A. func", "B. define", "C. method", "D. function"],
        correctAnswer: "D. function"
    },
    {
        question: "How do you call a function named 'myFunction' in JavaScript?",
        answers: ["A. myFunction call;", "B. myFunction();", "C. call myFunction;", "D. Call.myFunction();"],
        correctAnswer: "B. myFunction();"
    },
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        answers: ["A. append()", "B. concat()", "C. attach()", "D. assemble()"],
        correctAnswer: "B. concat()"
    },
    {
        question: "What is the correct way to write a JavaScript object?",
        answers: ["A. let obj = [name: 'John', age: 30];", "B. let obj = {name = 'John', age = 30};", "C. let obj = {name: 'John', age = 30};", "D. let obj = (name: 'John', age = 30);"],
        correctAnswer: "C. let obj = {name: 'John', age = 30};"
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: ["A. ##", "B. /* */", "C. <!-- -->", "D. //"],
        correctAnswer: ["B. /* */", "D. //"]
    },    
    {
        question: "Which statement is used to stop and exit a loop in JavaScript?",
        answers: ["A. stop;", "B. break;", "C. halt;", "D. exit;"],
        correctAnswer: "B. break;"
    },
    {
        question: "What is a promise in JavaScript?",
        answers: ["A. A block of code that will execute later, if certain conditions are met", "B. A data type for handling values that may not be available yet", "C. An object that may produce a single value sometime in the future", "D. An error handling construct"],
        correctAnswer: "C. An object that may produce a single value sometime in the future"
    },
];

// Initialize variables
let currentQuestionIndex = 0;
let timer = null;
let timeLeft = 0;
let score = 0;

// Start quiz when the "Start Quiz" button is clicked
document.getElementById('start-quiz').addEventListener('click', startQuiz);

// Typekit font loader
(function(d) {
    var config = {
      kitId: 'luq0eik',
      scriptTimeout: 3000,
      async: false
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

// Function to start the quiz
function startQuiz() {
    console.log("Quiz Started!");
    // Hide start button
    document.getElementById('start-quiz').style.display = 'none';
    // Load first question
    loadQuestion(currentQuestionIndex);
    // Start timer
    timeLeft = 120; // Set quiz time
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            endQuiz();
        } else {
            timeLeft--;
            document.getElementById('timer').innerText = "Time left: " + timeLeft + "s"; // Update timer on screen
        }
    }, 1000);
}

// Function to load a question
function loadQuestion(index) {
    let question = questions[index];
    let quizContent = document.getElementById('quiz-content');

    // Clear existing content
    quizContent.innerHTML = "";

    // Show question
    let questionElement = document.createElement('p');
    questionElement.innerText = question.question;
    quizContent.appendChild(questionElement);

    // Create answer grid container
    let answerGrid = document.createElement('div');
    answerGrid.className = 'answer-grid';

    // Show answers
    for(let i = 0; i < question.answers.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.innerText = question.answers[i];
        answerButton.addEventListener('click', function() {
            checkAnswer(question, question.answers[i]);
        });
        answerGrid.appendChild(answerButton);
    }

    // Append answer grid to quiz content
    quizContent.appendChild(answerGrid);
}

// Function to check the selected answer
function checkAnswer(question, answer) {
    let scoreDisplay = document.getElementById('score-display');
    let resultDisplay = document.getElementById('result-display');

    if(Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(answer) : question.correctAnswer === answer) {
        score += 10; // add points to the score for a correct answer
        resultDisplay.style.color = 'green';
        resultDisplay.innerText = '+10';
    } else {
        timeLeft -= 10; // subtract time for an incorrect answer
        resultDisplay.style.color = 'red';
        resultDisplay.innerText = '-10';
    }

    // Update total score
    scoreDisplay.innerText = 'Score: ' + score;

    // Move on to the next question
    currentQuestionIndex++;
    if(currentQuestionIndex >= questions.length || timeLeft <= 0) {
        endQuiz();
    } else {
        loadQuestion(currentQuestionIndex);
    }
}


// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    console.log("Quiz Ended!");

    // Show final score
    let quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = "Your final score is: " + score;

    // Get user initials
let initials = prompt("Enter your initials (2 letters max):");

if (initials) {
    initials = initials.toUpperCase().substring(0, 2);
    
    // Save score to local storage
    let highscores = localStorage.getItem("highscores");
    if(!highscores) {
        highscores = [];
    } else {
        highscores = JSON.parse(highscores);
    }

    highscores.push({initials: initials, score: score});

    // Keep top 5 scores
    highscores.sort((a, b) => b.score - a.score);
    highscores = highscores.slice(0, 5);

    localStorage.setItem("highscores", JSON.stringify(highscores));
    
    // Displays highscores to the user
    displayHighscores();
} else {
    // The user selected cancel or didn't provide any initials, we just end the quiz without saving the score
    console.log("Quiz Ended without saving score!");
}

    // Create Try Again button
    let tryAgainButton = document.createElement('button');
    tryAgainButton.innerText = 'Try Again';
    tryAgainButton.id = 'try-again';  
    tryAgainButton.addEventListener('click', function() {
        // Reset score and time
        score = 0;
        timeLeft = 60; // or however long you want the quiz to be

        // Reset question index
        currentQuestionIndex = 0;

        // Start quiz again
        startQuiz();

        // Remove Try Again button
        tryAgainButton.style.display = 'none';
    });

    // Append Try Again button to body or to a specific container
    quizContent.appendChild(tryAgainButton);
}

// Display highscores to the user
function displayHighscores() {
    // Retrieve highscores from local storage
    let highscores = localStorage.getItem("highscores");
    if (!highscores) {
        highscores = [];
    } else {
        highscores = JSON.parse(highscores);
    }

    // Get the highscores list element
    let highscoresList = document.getElementById('highscores-list');

    // Clear the list
    highscoresList.innerHTML = "";

    // Insert high scores into the list
    for(let i = 0; i < highscores.length; i++) {
        let li = document.createElement('li');
        li.innerText = highscores[i].initials + ": " + highscores[i].score;
        highscoresList.appendChild(li);
    }
}

// Initial display of highscores
displayHighscores();
