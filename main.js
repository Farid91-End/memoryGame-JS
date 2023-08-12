let arr = [
    {
      id: 1,
      name: "apple",
      img:"image/apple.png"
    },
    {
      id: 2,
      name: "grape",
      img:"image/arbuz.webp"
    },
    {
      id: 3,
      name: "arbuz",
      img:"image/arbuzzz.png"
    },
    {
      id: 4,
      name: "balgar",
      img:"image/balgarskiy.webp"
    },
    {
      id: 5,
      name: "banana",
      img:"image/banana.png"
    },
    {
      id: 6,
      name: "carrot",
      img:"image/carrot.webp"
    },
    {
      id: 7,
      name: "klubnika",
      img:"image/klubnika.png"
    },
    {
      id: 8,
      name: "kukuruza",
      img:"image/kukuruza.png"
    },
    {
      id: 9,
      name: "ogurec",
      img:"image/ogurec.png"
    },
    {
      id: 10,
      name: "pomidor",
      img:"image/pomidor.png"
    },
    {
      id: 11,
      name: "apple",
      img:"image/apple.png"
    },
    {
      id: 12,
      name: "grape",
      img:"image/arbuz.webp"
    },
    {
      id: 13,
      name: "arbuz",
      img:"image/arbuzzz.png"
    },
    {
      id: 14,
      name: "balgar",
      img:"image/balgarskiy.webp"
    },
    {
      id: 15,
      name: "banana",
      img:"image/banana.png"
    },
    {
      id: 16,
      name: "carrot",
      img:"image/carrot.webp"
    },
    {
      id: 17,
      name: "klubnika",
      img:"image/klubnika.png"
    },
    {
      id: 18,
      name: "kukuruza",
      img:"image/kukuruza.png"
    },
    {
      id: 19,
      name: "ogurec",
      img:"image/ogurec.png"
    },
    {
      id: 20,
      name: "pomidor",
      img:"image/pomidor.png"
    },
  
  ];

  const memoryGameContainer = document.querySelector('.memory-game');
const timerElement = document.querySelector('.timer');
const cards = [];
let startTime = null;
let timerInterval = null;

arr.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const frontSide = document.createElement('div');
  frontSide.classList.add('front');

  const backSide = document.createElement('div');
  backSide.classList.add('back');

  const backImage = document.createElement('img');
  backImage.src = item.img;

  backSide.appendChild(backImage);

  cardInner.appendChild(frontSide);
  cardInner.appendChild(backSide);
  card.appendChild(cardInner);
  cards.push(card);
});

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!startTime) return;

  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  timerElement.textContent = `Time: ${elapsedTime} seconds`;
}

function dstopTimer() {
  clearInterval(timerInterval);
}


function checkForMatch() {
    let isMatch = firstCard.querySelector('.back img').src === secondCard.querySelector('.back img').src;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    if (allMatchesFound()) {
      stopTimer();
    }
  
    resetBoard();
  }
  
  

function allMatchesFound() {
  return cards.every(card => card.classList.contains('matched'));
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}



function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

memoryGameContainer.append(...cards);
cards.forEach(card => card.addEventListener('click', () => {
  if (startTime === null) {
    startTimer();
  }
  flipCard.call(card);
}));
