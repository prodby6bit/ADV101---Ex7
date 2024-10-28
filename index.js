const quizData = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correct: "c"
    },
    {
        question: "Which is the largest planet in our solar system?",
        answers: {
            a: "Earth",
            b: "Jupiter",
            c: "Mars",
            d: "Saturn"
        },
        correct: "b"
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: {
            a: "J.K. Rowling",
            b: "William Shakespeare",
            c: "Mark Twain",
            d: "Jane Austen"
        },
        correct: "b"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');

function buildQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        output.push(
            `<div class="question">${currentQuestion.question}</div>
             <div class="answers">${answers.join('')}</div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let score = 0;

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correct) {
            score++;
            answerContainer.style.color = 'green';
        } else {
            answerContainer.style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
    retryButton.style.display = 'inline';
}

function resetQuiz() {
    buildQuiz();
    resultsContainer.innerHTML = '';
    retryButton.style.display = 'none';
}

submitButton.addEventListener('click', showResults);
retryButton.addEventListener('click', resetQuiz);

buildQuiz();
