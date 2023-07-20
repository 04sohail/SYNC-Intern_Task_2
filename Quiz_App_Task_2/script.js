const questions = [
    {
        question:"Full Form Of CPU",
        answers:[
            { text: "Command Processing Unit", correct:false},
            { text: "Central Processing Unit", correct:true},
            { text: "Company Processing Unit", correct:false},
            { text: "Computer Processing Unit", correct:false},
        ]
    },

    {
        question:"Full Form Of ALU",
        answers:[
            { text: "Allow Login Unit", correct:false},
            { text: "Arithematic Login Unit", correct:false},
            { text: "Arithematic Logic Unit", correct:true},
            { text: "Analysis Logic Unit", correct:false},
        ]
    },

    {
        question:"What Is The Brain Of A Computer Called",
        answers:[
            { text: "CPU", correct:true},
            { text: "RAM", correct:false},
            { text: "GPU", correct:false},
            { text: "None Of The Above", correct:false},
        ]
    },

    {
        question:"RAM Stands For",
        answers:[
            { text: "Random Access Memory", correct:true},
            { text: "Reallocate Automatic Memory", correct:false},
            { text: "Remote Access Memory", correct:false},
            { text: "Read Access Memory", correct:false},
        ]
    },

    {
        question:"Which Of The Following Is Not A Input Device",
        answers:[
            { text: "Microphone", correct:false},
            { text: "Mouse", correct:false},
            { text: "keyboard", correct:false},
            { text: "Speakers", correct:true},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
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
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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
});
startQuiz();
