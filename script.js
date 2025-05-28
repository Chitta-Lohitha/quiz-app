const questions = {
  general: [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "What color is the sky on a clear day?",
      answers: [
        { text: "Blue", correct: true },
        { text: "Green", correct: false },
        { text: "Red", correct: false },
        { text: "Yellow", correct: false }
      ]
    },
    {
      question: "How many continents are there?",
      answers: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
        { text: "8", correct: false }
      ]
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      answers: [
        { text: "Elephant", correct: false },
        { text: "Lion", correct: true },
        { text: "Tiger", correct: false },
        { text: "Giraffe", correct: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false }
      ]
    }
  ],
  tech: [
    {
      question: "Who is the founder of Microsoft?",
      answers: [
        { text: "Bill Gates", correct: true },
        { text: "Elon Musk", correct: false },
        { text: "Steve Jobs", correct: false },
        { text: "Mark Zuckerberg", correct: false }
      ]
    },
    {
      question: "HTML stands for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Home Tool Markup Language", correct: false },
        { text: "Hyperlinks and Text Markup Language", correct: false },
        { text: "Hyper Tech Machine Learning", correct: false }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Sheets", correct: false },
        { text: "Creative Style System", correct: false },
        { text: "Computer Style Sheets", correct: false }
      ]
    },
    {
      question: "Which company developed the JavaScript language?",
      answers: [
        { text: "Netscape", correct: true },
        { text: "Microsoft", correct: false },
        { text: "Sun Microsystems", correct: false },
        { text: "Google", correct: false }
      ]
    },
    {
      question: "Which of these is NOT a JavaScript framework/library?",
      answers: [
        { text: "React", correct: false },
        { text: "Vue", correct: false },
        { text: "Angular", correct: false },
        { text: "Laravel", correct: true }
      ]
    }
  ]
};

const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category-select");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

startBtn.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function startQuiz() {
  const category = categorySelect.value;
  currentQuestions = questions[category];
  currentQuestionIndex = 0;
  score = 0;
  startBtn.parentElement.classList.add("hide");
  questionContainer.classList.remove("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = currentQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
  startTimer();
}

function resetState() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  nextButton.classList.add("hide");
  answerButtons.innerHTML = "";
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(null); // auto move on timeout
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedBtn = e ? e.target : null;
  const isCorrect = selectedBtn && selectedBtn.dataset.correct === "true";
  if (isCorrect) score++;
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });
  nextButton.classList.remove("hide");
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${currentQuestions.length}!`;
  nextButton.innerText = "Restart Quiz";
  nextButton.onclick = () => {
    location.reload();
  };
  nextButton.classList.remove("hide");
}
