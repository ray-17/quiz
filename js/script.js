const questions = [
    {
        question: "Who is the protector of Gotham?",
        answers: [
            {text: "Superman", correct:false},
            {text: "Wonder Woman", correct:false},
            {text: "Batman", correct:true},
            {text: "Green Lantern", correct:false},
        ]
    },
    {
        question: "Who is the last son of Krypton?",
        answers: [
            {text: "Iron man", correct:false},
            {text: "Martian Manhunter", correct:false},
            {text: "Batman", correct:false},
            {text: "Superman", correct:true},
        ]
    },
    {
        question: "What is the name of the island of Amazons?",
        answers: [
            {text: "Atlantis", correct:false},
            {text: "Themyscira", correct:true},
            {text: "Gotham", correct:false},
            {text: "Hawaii", correct:false},
        ]
    },
    {
        question: "Who is regarded as the greatest Green Lantern?",
        answers: [
            {text: "Abin Sur", correct:false},
            {text: "John Stewart", correct:false},
            {text: "Guy Gardener", correct:false},
            {text: "Hal Jordan", correct:true},
        ]
    },
    {
        question: "What is Sinestro?",
        answers: [
            {text: "A Blue lantern", correct:false},
            {text: "A Red Lantern", correct:false},
            {text: "A Yellow Lantern", correct:true},
            {text: "A Green Lantern", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();