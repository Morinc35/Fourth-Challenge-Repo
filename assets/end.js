const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
 const mostRecentScore = localStorage.getItem('mostRecentScore')
 const saveHighscore = document.getElementById('#save-score-btn')
 finalScore.innerText = mostRecentScore   



username.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !username.value
})