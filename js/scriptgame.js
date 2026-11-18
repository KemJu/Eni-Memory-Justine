/**
 * 
Créer the board = X

Lancer une partie = X

Cliquer sur les cartes = X

Si deux cartes identiques afficher en permanence= X

Retourner face cachée les cartes différentes après 5 secondes = X

Ajouter un effet de retournement de carte à chaque clic = X

 */

//Créer the board = X
//---------------------
//Array for every Memory Deck
const tableauCorrespondanceMemoryImage = [
  {
    nom: "legumes",
    nomAffiche: "Légumes",
    img: "./ressources/memory-legume/memory_detail.png",
    chemin: "./ressources/memory-legume/",
    extension: "svg",
    nombreCartes: 6,
  },
  {
    nom: "animaux",
    nomAffiche: "Animaux",
    img: "./ressources/animaux/memory_detail_animaux.png",
    chemin: "./ressources/animaux/",
    extension: "webp",
    nombreCartes: 28,
  },
  {
    nom: "animauxAnimes",
    nomAffiche: "Animaux animés",
    img: "./ressources/animauxAnimes/memory_detail_animaux_animes.png",
    chemin: "./ressources/animauxAnimes/",
    extension: "webp",
    nombreCartes: 8,
  },
  {
    nom: "animauxDomestiques",
    nomAffiche: "Animaux Domestiques",
    img: "./ressources/animauxdomestiques/memory_detail_animaux_domestiques.png",
    chemin: "./ressources/animauxdomestiques/",
    extension: "jpg",
    nombreCartes: 10,
  },
  {
    nom: "chiens",
    nomAffiche: "Chiens",
    img: "./ressources/chiens/memory_details_chiens.png",
    chemin: "./ressources/chiens/",
    extension: "webp",
    nombreCartes: 23,
  },
  {
    nom: "dinosaures",
    nomAffiche: "Dinosaures",
    img: "./ressources/dinosaures/memory_detail_dinosaures.png",
    chemin: "./ressources/dinosaures/",
    extension: "jpg",
    nombreCartes: 10,
  },
  {
    nom: "dinosauresAvecNom",
    nomAffiche: "Dinosaures avec nom",
    img: "./ressources/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png",
    chemin: "./ressources/dinosauresAvecNom/",
    extension: "jpg",
    nombreCartes: 10,
  },
  {
    nom: "alphabetScrabble",
    nomAffiche: "Lettre Scrabble",
    img: "./ressources/alphabet-scrabble/memory_detail_scrabble.png",
    chemin: "./ressources/alphabet-scrabble/",
    extension: "png",
    nombreCartes: 26,
  },
];
let turnedCards = [];
let foundCards = [];
//lock will prevent the player from clicking on other cards while two mismatched cards are waiting to turn face down
let lock = false;
//Creating the board function
function creerPlateau(themeNom) {
  if (!themeNom) return;
  //resetting the variables because otherwise it doesn't work
  turnedCards = [];
  foundCards = [];
  lock = false;
  // find the theme in the huge array and store it in theme
  const theme = tableauCorrespondanceMemoryImage.find(
    (theme) => theme.nom === themeNom,
  );

  // loop storing as many images in the array "images" as there are numbers of cards in the selected theme
  const images = [];
  for (let i = 1; i <= theme.nombreCartes; i++) {
    //works because i is not greater than nombreCartes and they are numbered 1,2,3....extension
    images.push(`${i}.${theme.extension}`);
  }

  //Create a collection of cards containing pairs
  const double = [...images, ...images];

  // shuffle it
  melanger(double);

  // empty #board in case it's already full
  //create constant for the div whose id is board
  const board = document.querySelector("#board");

  board.innerHTML = ""; // replaces the content with nothing

  // for each path: create a card and append it to #board
  // Create and display each card
  double.forEach((file) => {
    const carte = document.createElement("div");
    carte.classList.add("card");

    const image = document.createElement("img");
    image.classList.add("front");
    image.src = `${theme.chemin}${file}`;
    image.alt = "Carte face découverte du Memory";
    carte.dataset.id = file;
    console.log(file);

    const back = document.createElement("img");
    back.classList.add("back");
    back.src = "ressources/question.svg";
    back.alt = "Carte face cachée du Memory";

    //adding div carte to the board then adding by default the back to the div carte
    board.appendChild(carte);
    carte.appendChild(back);
    carte.appendChild(image);
  });
}

//Shuffling cards
//Fisher–Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function melanger(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    // Choose a random index between 0 and i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap the values at indexes i and j
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }

  return tableau;
}

//Cliquer sur les cartes = X
//---------------------------
//Ajouter un effet de retournement de carte à chaque clic =
//-------------------------------
//Clicks behaviour
function activateClick() {
  const board = document.querySelector("#board");

  board.addEventListener("click", (event) => {
    const carte = event.target.closest(".card");

    // Ignore clicks outside cards
    if (!carte) return;

    // Ignore clicks while the board is locked
    if (lock) return;

    // Ignore cards already showing
    if (carte.classList.contains("show")) return;

    // Ignore cards already matched
    if (foundCards.includes(carte)) return;

    // Reveal the card
    carte.classList.add("show");

    // Store the revealed card
    turnedCards.push(carte);

    // Check when two cards have been revealed
    if (turnedCards.length === 2) {
      verifierCartes();
    }
  });
}

//Si deux cartes identiques afficher en permanence= X
//-------------------------
//Checking cards'states
function verifierCartes() {
  const premiereCarte = turnedCards[0];
  const deuxiemeCarte = turnedCards[1];

  const premiereID = premiereCarte.dataset.id;
  const deuxiemeID = deuxiemeCarte.dataset.id;

  //If cards match
  if (premiereID === deuxiemeID) {
    foundCards.push(premiereCarte, deuxiemeCarte);

    //Emptying the temporary array
    turnedCards = [];

    //Checking if the game is finished
    if (foundCards.length === document.querySelectorAll(".card").length) {
      setTimeout(() => {
        alert("Bravo ! Vous avez trouvé toutes les paires !");
      }, 300);
    }
  } else {
    //Locking the board
    lock = true;

    //Retourner face cachée les cartes différentes après 5 secondes =
    //---------------------------------------------
    //waiting 5 seconds before hiding the cards
    setTimeout(() => {
      premiereCarte.classList.remove("show");
      deuxiemeCarte.classList.remove("show");

      //emptying the temporary array
      turnedCards = [];

      //unlocking the board
      lock = false;
    }, 5000);
  }
}

//Resetting the game function
function resetGame() {
  creerPlateau(select.value);
}

//first doing the reset button behaviour
const btnReset = document.getElementById("btnReset");

btnReset.addEventListener("click", resetGame);

//then doing the space bar behaviour, which are the same.
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault(); // Prevents page scrolling or double-triggering a focused button
    resetGame();
  }
});

/**Keep the currently selected theme.

Empty the current board.

Reset turnedCards.

Reset foundCards.

Set lock to false.

Shuffle the cards again.

Create a new board with all cards face down. */

//Lancer une partie = X
//-----------------------
//add options based on the themes in the tableauCorrespondanceMemoryImage array
//reminder that choosegame is the liste déroulante in the HTML
const select = document.getElementById("choosegame");

tableauCorrespondanceMemoryImage.forEach((theme) => {
  const option = document.createElement("option");

  option.value = theme.nom;
  option.textContent = theme.nomAffiche;

  select.appendChild(option);
});

//add a button to start the game that has been selected in the options
//reminder that select is the liste déroulante with the options
const btnStart = document.getElementById("btnStart");

btnStart.addEventListener("click", () => {
  const selectedTheme = select.value;
  creerPlateau(selectedTheme);
});

//calling the function to have the clicks behaviour in the game
activateClick();
//initializing the arrays in which turnedCards, foundCards are stored
