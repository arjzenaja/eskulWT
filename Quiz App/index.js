const questions = [
    {
      question: "Siapa presiden pertama Indonesia?",
      answers: [
        { text: "Soekarno", correct: true },
        { text: "Suharto", correct: false },
        { text: "B.J. Habibie", correct: false },
        { text: "Gus Dur", correct: false },
      ],
    },
    {
      question: "Apa ibukota Indonesia?",
      answers: [
        { text: "Jakarta", correct: true },
        { text: "Bandung", correct: false },
        { text: "Yogyakarta", correct: false },
        { text: "Surabaya", correct: false },
      ],
    },
    {
      question: "Gunung apa yang tertinggi di Indonesia?",
      answers: [
        { text: "Gunung Everest", correct: false },
        { text: "Gunung Rinjani", correct: false },
        { text: "Gunung Semeru", correct: false },
        { text: "Gunung Puncak Jaya", correct: true },
      ],
    },
    {
      question: "Apa bahasa resmi Indonesia?",
      answers: [
        { text: "Bahasa Indonesia", correct: true },
        { text: "Bahasa Inggris", correct: false },
        { text: "Bahasa Jawa", correct: false },
        { text: "Bahasa Sunda", correct: false },
      ],
    },
    {
      question: "Kapan Indonesia merdeka?",
      answers: [
        { text: "17 Agustus 1945", correct: true },
        { text: "17 September 1945", correct: false },
        { text: "17 Oktober 1945", correct: false },
        { text: "17 November 1945", correct: false },
      ],
    },
  ];


  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn")

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
  }

  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
  }

  function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }

  function handleNextButton() {
      currentQuestionIndex++;
      if(currentQuestionIndex < questions.length){
        showQuestion();
      }else{
        showScore();
      }
  }

  nextButton.addEventListener("click", () => {
      if(currentQuestionIndex < questions.length){
        handleNextButton();
      }else{
        startQuiz();
      }
  })

  startQuiz();