document.addEventListener('DOMContentLoaded', function() {
    let isClickBlocked = false;
    let firstCard;
    let secondCard;
    const cards = document.querySelectorAll(".card");
    setBoard(cards);
    
function setBoard(cards){
    for (const card of cards) {
        let newPos = Math.ceil(Math.random() * 12)
        card.style.order = newPos
        card.addEventListener("click", onCardClicked);
    }
}
function flipCard(card) {
    card.classList.toggle("flip");
}
function onCardClicked() {
    if (isClickBlocked) {
        return;
    }
    if (!firstCard) {
        firstCard = this;
        flipCard(this);
    } else {
        secondCard = this;
        flipCard(this);
        if (doCardsMatch()) {
            firstCard.removeEventListener("click", onCardClicked);
            secondCard.removeEventListener("click", onCardClicked);
            if(firstCard !== this){
                removeMatched();
            }   
        } else {
            isClickBlocked = true;
            setTimeout(() => {
                flipCard(firstCard);
                flipCard(secondCard);
                firstCard = null;
                secondCard = null;
                isClickBlocked = false;
            }, 750)
        }
    }
    gameOver();
}
function doCardsMatch() {
    if (firstCard.dataset.sushi === secondCard.dataset.sushi) {
        return true;
    }
    return false;
}
function removeMatched(){
    for(const c of [firstCard, secondCard]){
        c.classList.add("hide");
    }
    firstCard = null;
    secondCard = null;  
}
function gameOver(){
    const arr = Array.from(cards);
    const isBoardEmpty = arr.every((e) => e.classList.value.includes("hide"));
    if(isBoardEmpty){
        newGame();
    }
}
function newGame(){
    const container = document.querySelector(".container");
    container.classList.add('gameOver');
    container.innerHTML = "<input type='button' value='Play again?'>";
    const button = document.querySelector("input");
    button.addEventListener('click', function(){location.reload()});
}
});