const username = document.getElementById('username');
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");



const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
console.log(JSON.parse(localStorage.getItem("highScores")));
finScore.innertext = mostRecentScore


//enable/disable saveScoreBtn 
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
});

//prevent saving without input
saveScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    
    };
    
    //save high score
    highScores.push(score);
    console.log(highScores);

    //sort scores high to low
    highScores.sort((a,b) => b.score - a.score);

    //splice out any more than 10 highscores
    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("./index.html")

    console.log(highScores);
    

};


