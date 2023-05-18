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
        }
    }, 1000);
}

function loadQuestion(index) {
    console.log("Loading question: ", questions[index].question);
    // TODO: display question and answers on screen
}

function endQuiz() {
    clearInterval(timer);
    console.log("Quiz Ended!");
    // TODO: allow user to enter initials and store score
}
