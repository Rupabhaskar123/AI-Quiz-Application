// ===============================
// AI QUIZ APPLICATION
// ===============================


// Questions

const questions = [

    {
        question: "What does AI stand for?",
        options: [
            "Artificial Intelligence",
            "Automated Internet",
            "Advanced Information",
            "Artificial Internet"
        ],
        answer: 0
    },

    {
        question: "Which of the following is a branch of AI?",
        options: [
            "Machine Learning",
            "Web Designing",
            "Networking",
            "Database"
        ],
        answer: 0
    },

    {
        question: "What does ML stand for?",
        options: [
            "Machine Learning",
            "Modern Language",
            "Machine Logic",
            "Multiple Learning"
        ],
        answer: 0
    },

    {
        question: "Which language is commonly used in AI?",
        options: [
            "Python",
            "HTML",
            "CSS",
            "XML"
        ],
        answer: 0
    },

    {
        question: "Which library is commonly used for Machine Learning in Python?",
        options: [
            "Scikit-learn",
            "Bootstrap",
            "React",
            "jQuery"
        ],
        answer: 0
    },

    {
        question: "What is the full form of NLP?",
        options: [
            "Natural Language Processing",
            "Network Language Program",
            "Natural Learning Process",
            "Neural Language Programming"
        ],
        answer: 0
    },

    {
        question: "Which technology allows computers to understand images?",
        options: [
            "Computer Vision",
            "Cloud Computing",
            "Blockchain",
            "Networking"
        ],
        answer: 0
    },

    {
        question: "What is ChatGPT an example of?",
        options: [
            "Generative AI",
            "Database",
            "Operating System",
            "Compiler"
        ],
        answer: 0
    },

    {
        question: "What is used to train a Machine Learning model?",
        options: [
            "Data",
            "Keyboard",
            "Monitor",
            "Printer"
        ],
        answer: 0
    },

    {
        question: "Which one is an AI application?",
        options: [
            "Face Recognition",
            "Calculator only",
            "Text Editor",
            "File Explorer"
        ],
        answer: 0
    }

];


// Variables

let currentQuestion = 0;

let score = 0;

let timeLeft = 15;

let timer;


// Elements

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const startBtn =
    document.getElementById("start-btn");

const nextBtn =
    document.getElementById("next-btn");

const restartBtn =
    document.getElementById("restart-btn");

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const questionNumber =
    document.getElementById("question-number");

const timerElement =
    document.getElementById("timer");

const progressBar =
    document.getElementById("progress-bar");

const scoreElement =
    document.getElementById("score");

const finalScore =
    document.getElementById("final-score");

const resultMessage =
    document.getElementById("result-message");


// Start Quiz

startBtn.addEventListener("click", startQuiz);


function startQuiz() {

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent = score;

    startScreen.classList.remove("active");

    resultScreen.classList.remove("active");

    quizScreen.classList.add("active");

    showQuestion();
}


// Display Question

function showQuestion() {

    clearInterval(timer);

    timeLeft = 15;

    timerElement.textContent = timeLeft;

    nextBtn.disabled = true;

    const current = questions[currentQuestion];

    questionElement.textContent =
        current.question;

    questionNumber.textContent =
        currentQuestion + 1;

    optionsElement.innerHTML = "";


    // Progress

    const progress =
        ((currentQuestion) / questions.length) * 100;

    progressBar.style.width =
        progress + "%";


    // Create options

    current.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.classList.add("option");

        button.textContent =
            option;

        button.addEventListener(
            "click",
            () => selectAnswer(button, index)
        );

        optionsElement.appendChild(button);

    });


    startTimer();
}


// Timer

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent =
            timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            disableOptions();

            nextBtn.disabled = false;

        }

    }, 1000);

}


// Select Answer

function selectAnswer(button, selectedIndex) {

    clearInterval(timer);

    const correctAnswer =
        questions[currentQuestion].answer;

    const options =
        document.querySelectorAll(".option");


    options.forEach((option, index) => {

        option.classList.add("disabled");

        if (index === correctAnswer) {

            option.classList.add("correct");

        }

    });


    if (selectedIndex === correctAnswer) {

        button.classList.add("correct");

        score++;

        scoreElement.textContent =
            score;

    }
    else {

        button.classList.add("wrong");

    }


    nextBtn.disabled = false;
}


// Disable options

function disableOptions() {

    const options =
        document.querySelectorAll(".option");

    options.forEach((option, index) => {

        option.classList.add("disabled");

        if (
            index ===
            questions[currentQuestion].answer
        ) {

            option.classList.add("correct");

        }

    });

}


// Next Question

nextBtn.addEventListener(
    "click",
    nextQuestion
);


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    }
    else {

        showResult();

    }

}


// Show Result

function showResult() {

    clearInterval(timer);

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    finalScore.textContent =
        score;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "🔥 Perfect! You are an AI Master!";

    }
    else if (percentage >= 70) {

        resultMessage.textContent =
            "🚀 Excellent! You have strong AI knowledge.";

    }
    else if (percentage >= 50) {

        resultMessage.textContent =
            "👍 Good job! Keep learning AI.";

    }
    else {

        resultMessage.textContent =
            "💡 Keep practicing. You will become an AI expert!";

    }

}


// Restart Quiz

restartBtn.addEventListener(
    "click",
    startQuiz
);