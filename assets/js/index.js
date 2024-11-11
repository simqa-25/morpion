let currentPlayer = "X"; // Le joueur qui commence
let gameOver = false; // Indicateur pour savoir si le jeu est terminé
let gameMode = ""; // Le mode de jeu sélectionné ("humanVsHuman" ou "humanVsComputer")
const cells = document.querySelectorAll(".cell");
const messageElement = document.querySelector("#message");
const replayButton = document.querySelector("#replayButton");

// Fonction pour générer un nombre aléatoire
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Onglets de sélection de mode de jeu
const humanVsHumanTab = document.querySelector("#humanVsHuman");
const humanVsComputerTab = document.querySelector("#humanVsComputer");

// Sélection du mode de jeu
humanVsHumanTab.addEventListener("click", () => selectGameMode("humanVsHuman"));
humanVsComputerTab.addEventListener("click", () =>
  selectGameMode("humanVsComputer")
);

function selectGameMode(mode) {
  // Désactive l'onglet actuellement actif
  document.querySelector(".tabButton.active")?.classList.remove("active");

  // Active l'onglet sélectionné
  if (mode === "humanVsHuman") {
    humanVsHumanTab.classList.add("active");
  } else {
    humanVsComputerTab.classList.add("active");
  }

  // Initialise le mode de jeu
  gameMode = mode;
  resetGame();
}

// Ajout des événements de clic sur les cellules
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Pour veerifier les combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Lignes
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Colonnes
  [0, 4, 8],
  [2, 4, 6], // Diagonales
];

// Fonction pour gérer les clics sur les cellules
function handleCellClick(event) {
  const cell = event.target;

  // Si la cellule est déjà occupée ou si le jeu est terminé, on ne fait rien
  if (
    cell.textContent !== "" ||
    gameOver ||
    (gameMode === "humanVsComputer" && currentPlayer === "O")
  )
    return;

  // Marque la cellule avec le symbole du joueur courant
  cell.textContent = currentPlayer;

  // Vérifie si un joueur a gagné
  if (checkWinner(currentPlayer)) {
    gameOver = true;
    messageElement.textContent = `Le joueur ${currentPlayer} a gagné !`;
    replayButton.style.display = "inline-block";
  } else if (isBoardFull()) {
    gameOver = true;
    messageElement.textContent = "Match nul !";
    replayButton.style.display = "inline-block";
  } else {
    // Change de joueur
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = `C'est au tour du joueur ${currentPlayer}`;

    // Si c'est le tour de l'ordinateur, il joue automatiquement
    if (gameMode === "humanVsComputer" && currentPlayer === "O" && !gameOver) {
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  }
}

// Pour verifier les combinaisons gagnantes
function checkWinner(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => cells[index].textContent === player);
  });
}

// Pour verifier si le plateau est plein
function isBoardFull() {
  return [...cells].every((cell) => cell.textContent !== "");
}

// Fonction pour l'ordinateur de jouer
function computerMove() {
  const emptyCells = [...cells].filter((cell) => cell.textContent === "");
  const randomCell = emptyCells[randomize(0, emptyCells.length - 1)];
  randomCell.textContent = "O";

  if (checkWinner("O")) {
    gameOver = true;
    messageElement.textContent = "L'ordinateur a gagné !";
    replayButton.style.display = "inline-block";
  } else if (isBoardFull()) {
    gameOver = true;
    messageElement.textContent = "Match nul !";
    replayButton.style.display = "inline-block";
  } else {
    currentPlayer = "X";
    messageElement.textContent = `C'est au tour du joueur ${currentPlayer}`;
  }
}

// Réinitialisation du jeu
replayButton.addEventListener("click", resetGame);

// Fonction pour réinitialiser le jeu
function resetGame() {
  gameOver = false;
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
  messageElement.textContent = `C'est au tour du joueur ${currentPlayer}`;
  replayButton.style.display = "none";
}
