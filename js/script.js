/**
 * 
Créer the board = X

Lancer une partie =

Cliquer sur les cartes =

Si deux cartes identiques afficher en permanence= 

Retourner face cachée les cartes différentes après 5 secondes =

Ajouter un effet de retournement de carte à chaque clic =

 */

//Créer the board

board = document.getElementById("board");
console.log(board);

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

//might create path like this
/*const numero = 3;
const chemin = `${theme.chemin}${numero}.${theme.extension}`;
console.log(chemin);*/

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

function creerPlateau(themeNom) {
  // find the theme
  const theme = tableauCorrespondanceMemoryImage.find(
    (theme) => theme.nom === themeNom,
  );

  // loop pushing images in array
  const images = [];
  for (let i = 1; i <= theme.nombreCartes; i++) {
    images.push(`${i}.${theme.extension}`);
  }

  // double it
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
    image.src = `${theme.chemin}${file}`;
    image.alt = "Carte du Memory";

    carte.appendChild(image);
    board.appendChild(carte);
  });
}

creerPlateau("legumes"); /*TO REMOVE LATER, JUST FOR TESTING PURPOSES*/

//Lancer une partie = (pas sûre de comprendre ce que ça veut dire en soi, genre, un bouton "Lancer une partie"?)
//add options based on the themes in the tableauCorrespondanceMemoryImage array
const select = document.getElementById("choosegame");

tableauCorrespondanceMemoryImage.forEach((theme) => {
  const option = document.createElement("option");

  option.value = theme.nom;
  option.textContent = theme.nom;

  select.appendChild(option);
});

//add a button to start the game that has been selected in the options
btnStart = document.getElementById("btnStart");
btnStart.addEventListener("click", () => {
  const select = document.getElementById("choosegame");
  const selectedTheme = select.value;
  creerPlateau(selectedTheme);
});




//Cliquer sur les cartes =

//Si deux cartes identiques afficher en permanence=

//Retourner face cachée les cartes différentes après 5 secondes =

//Ajouter un effet de retournement de carte à chaque clic =
