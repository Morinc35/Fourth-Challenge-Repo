const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-txt'));
const progressTxt = document.querySelector('#progressTxt');
const scoreText = document.querySelector('#score');
const progressCounterFull = document.querySelector('#progressCounterFull');
var sec = 60;
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'what is a switch in JavaScript?',
        choice1: 'evaluates an expression. The value of the expression is then compared with the values of each case in the structure. If there is a match, the associated block of code is executed.',
        choice2: 'most commonly used to operate electric lights, permanently connected equipment, or electrical outlets.',
        choice3: 'a 180° bend in a road or path, especially one leading up the side of a mountain.',
        choice4: 'an act of adopting one policy or way of life, or choosing one type of item, in place of another; a change, especially a radical one.',
        answer: 1,
    },
    {
        question: 'what is an array in JavaScript',
        choice1: 'used to repeat a specific block of code a known number of times.',
        choice2: 'a type of global object that is used to store data.',
        choice3: 'an impressive display or range of a particular type of thing.',
        choice4: 'system of hydrophones towed behind a submarine or a surface ship on a cable.',
        answer: 2,
    },
    {
        question: 'What are the three types of variables??',
        choice1: 'car,set, and sconst',
        choice2: 'var, let, and const',
        choice3: 'tar, pet, and tonst',
        choice4: 'jar, rhett, ronst',
        answer: 2,
    },
    {
        question: 'Method of displaying data that is used for debugging purposes.',
        choice1: 'console.log()',
        choice2: 'tonsole.log()',
        choice3: 'console.log()12',
        choice4: '$console.log()',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer();
}

function startTimer() {
    console.log('timer suppose to go')
    var timer = setInterval(function () {
        sec--;
        document.getElementById('timerDisplay').innerHTML = '00:' + sec;
        if (sec < 0) {
            clearInterval(timer);
            alert("Time is up!")
        }
    }, 1000);
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressTxt.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressCounterFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            "incorrect"

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            
        }
        else sec -= 5;

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()