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

function startQuiz() {
    console.log("Quiz Started!");
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

    // TODO: allow user to enter initials and store score
}
