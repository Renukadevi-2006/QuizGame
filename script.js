let questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Transfer Markup Level", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "Which is not a JavaScript Framework?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Django", correct: true },
      { text: "Vue", correct: false }
    ]
  },
  {
    question: "What does API stand for?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Application Programming Interaction", correct: false },
      { text: "Applied Programming Interface", correct: false },
      { text: "Advanced Program Integration", correct: false }
    ]
  },
  {
    question: "Which one is a backend language?",
    answers: [
      { text: "Python", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "Figma", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  shuffledQuestions = shuffle([...questions]); // Create shuffled copy
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = shuffledQuestions[currentQuestionIndex];
  questionEl.textContent = current.question;

  current.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answersEl.appendChild(button);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) {
    score++;
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  nextBtn.classList.remove("hidden");
}

function showScore() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${shuffledQuestions.length}.`;
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function restartQuiz() {
  startQuiz();
}

nextBtn.addEventListener("click", handleNext);

// Start quiz initially
startQuiz();
