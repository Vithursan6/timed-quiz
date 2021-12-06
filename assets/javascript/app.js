const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const questionCounterText = document.getElementById('questionCount');
const timeext = document.getElementById('time');

var timeSeconds= 300
function checkTime () {
    document.getElementById("time").innerHTML
}

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

    //question 1
    {
    question: "What is the capitol city of Canada?",
    choice1: "Toronto",
    choice2: "Calgary",
    choice3: "Ottawa",
    choice4: "Vancouver",
    answer: 3
    },

    //question 2
    {
    question: "In what year did Canada gain its independence?",
    choice1: "1897",
    choice2: "1812",
    choice3: "1869",
    choice4: "1867",
    answer: 4
    },

    //question 3
    {
    question: "Who was the first Prime Minister of Canada?",
    choice1: "Sir Wilfrid Laurier",
    choice2: "Sir John A. Macdonald",
    choice3: "Sir Ronald B.McDonald",
    choice4: "Sir Jack C. McDonald",
    answer: 2
    },
    
    //question 4
    {
    question: "What is the capital city of Ontario?",
    choice1: "Toronto",
    choice2: "Brampton",
    choice3: "Ottawa",
    choice4: "Markham",
    answer: 1
    },
    
    //question 5
    {
    question: "Complete Statement: Canada is the 'XXXXXX' largest Country in the world",
    choice1: "First",
    choice2: "Second",
    choice3: "Third",
    choice4: "Fourth",
    answer: 2
    },


    //question 6
    {
    question: "The type of currency used in Canada is:",
    choice1: "Rupees",
    choice2: "Rubles",
    choice3: "Dinar",
    choice4: "Dollars",
    answer: 4
    },

    //question 7
    {
    question: "The national animal of Canada is:",
    choice1: "Loon",
    choice2: "Polar Bear",
    choice3: "Beaver",
    choice4: "Moose",
    answer: 3
    },

    //question 8
    {
    question: "The longest street in Canada is:",
    choice1: "Bay Street",
    choice2: "Long Street",
    choice3: "Yonge Street",
    choice4: "Dufferin Street",
    answer: 3
    },

    //question 9
    {
    question: "The Canadian population is:",
    choice1: "< 50 Million",
    choice2: "> 50 Million",
    choice3: "< 100 Million",
    choice4: "> 100 Million",
    answer: 1
    },

    //question 10
    {
    question: "What is the name of the Canadian National Anthem?",
    choice1: "Ode Canada",
    choice2: "O Canada",
    choice3: "Yo Canada",
    choice4: "Oh Canada",
    answer: 2

    }

];

const MAX_QUESTIONS = 10;
 
//Function to start quiz
StartGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();

};

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        
        diff = duration - (((Date.now() - start) / 1000) | 0);


        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            
            start = Date.now() + 1000;
        }
    };
    
    timer();
    setInterval(timer, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};




//Function to display questions
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
        localStorage.setItem("mostRecentScore", score);
        //ends quiz if when no more questions left
        return window.location.assign("./gameover.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice =  e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //set default value to incorrect and checks if correct
        var classToApply = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
            }
        

        
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 200);

        

        console.log(classToApply);
        

    });
});



StartGame();