// Placeholder questions
let questions = [
    {
        question: "Question 1?",
        answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer 1"
    },
    // More questions...
];

let currentQuestionIndex = 0;
let timer = null;
let timeLeft = 0;
let score = 0;

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

function startQuiz() {
    console.log("Quiz Started!");
    // Hide start button
    document.getElementById('start-quiz').style.display = 'none';
    // Load first question
    loadQuestion(currentQuestionIndex);
    // Start timer
    timeLeft = 60; // Set your quiz time
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            endQuiz();
        } else {
            timeLeft--;
            document.getElementById('timer').innerText = "Time left: " + timeLeft + "s"; // Update timer on screen
        }
    }, 1000);
}

function loadQuestion(index) {
    let question = questions[index];
    let quizContent = document.getElementById('quiz-content');

    // Clear existing content
    quizContent.innerHTML = "";

    // Show question
    let questionElement = document.createElement('p');
    questionElement.innerText = question.question;
    quizContent.appendChild(questionElement);

    // Show answers
    for(let i = 0; i < question.answers.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.innerText = question.answers[i];
        answerButton.addEventListener('click', function() {
            checkAnswer(question, question.answers[i]);
        });
        quizContent.appendChild(answerButton);
    }
}

function checkAnswer(question, answer) {
    if(question.correctAnswer === answer) {
        score += 10; // add points to the score for a correct answer
    } else {
        timeLeft -= 10; // subtract time for an incorrect answer
    }

    // Move on to the next question
    currentQuestionIndex++;
    if(currentQuestionIndex >= questions.length || timeLeft <= 0) {
        endQuiz();
    } else {
        loadQuestion(currentQuestionIndex);
    }
}

function endQuiz() {
    clearInterval(timer);
    console.log("Quiz Ended!");

    // Show final score
    let quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = "Your final score is: " + score;

    // Get user initials
    let initials = prompt("Enter your initials:");

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

displayHighscores();
