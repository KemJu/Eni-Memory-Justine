Fichier pour expliquer le projet Memory

Lien pour jouer : https://kemju.github.io/Eni-Memory-Justine/

Jeu du Memory ENI

Jeu de Memory en ligne réalisé en HTML, CSS et JavaScript, dans le cadre de la formation ENI. Le joueur choisit un thème, retourne les cartes deux par deux et doit retrouver toutes les paires.

Règles du jeu
Retournez deux cartes. Si les images sont identiques, elles restent visibles.
Si les images sont différentes, les cartes se retournent face cachée au bout de 5 secondes.
La partie est terminée lorsque toutes les paires ont été trouvées.

Pendant les 5 secondes d'une erreur, les autres cartes ne réagissent pas.

Fonctionnalités
[x] Choix du thème parmi 8 thèmes (légumes, animaux, chiens, dinosaures...)
[x] Plateau généré en JavaScript et mélangé à chaque partie (algorithme de Fisher-Yates)
[x] Effet de retournement de carte en 3D (CSS)
[x] Détection des paires, verrouillage pendant 5 secondes, message de fin de partie
[x] Mise en page adaptée aux ordinateurs, tablettes et mobiles
[ ] Relancer la même partie avec la barre d'espace
[ ] Sauvegarde des 5 meilleurs scores (localStorage)
[ ] Pages d'inscription, de connexion et de profil
[ ] Menu hamburger sur mobile
Technologies
HTML5 : structure sémantique de la page
CSS3 : Flexbox, Grid, media queries, transformations 3D (rotate, backface-visibility) et transitions
JavaScript (sans bibliothèque) : manipulation du DOM, événements, setTimeout, tableaux et objets

.
├── index.html Accueil et règles du jeu
├── jouer.html Page du jeu
├── inscription.html Formulaire d'inscription (en cours)
├── connexion.html (à venir)
├── profil.html (à venir)
├── css/
│ ├── style.css Styles généraux
│ ├── tablet.css Adaptation tablette
│ ├── mobile.css Adaptation mobile
│ └── animationcard.css Retournement des cartes
├── js/
│ └── scriptgame.js Logique du jeu
│ └── scriptsubscribe.js Comportement formulaire d'inscription
└── ressources/ Images des thèmes et dos des cartes

Fonctionnement du code
Les thèmes sont décrits dans le tableau tableauCorrespondanceMemoryImage : nom, nom affiché, dossier, extension des images et nombre d'images.
creerPlateau(theme) trouve le thème choisi, construit la liste des images (1.ext à N.ext), la double pour former les paires, la mélange avec melanger(), vide le plateau puis crée les cartes. Chaque carte contient une face cachée et une face visible.
activateClick() place un seul écouteur sur le plateau (délégation d'événements). Il ignore les clics en dehors d'une carte, sur une carte déjà visible ou déjà trouvée, et pendant le verrouillage.
verifierCartes() compare les deux cartes retournées grâce à leur attribut data-id. Si elles sont identiques, elles sont ajoutées aux cartes trouvées. Sinon, le plateau est verrouillé et les cartes se retournent après 5 secondes.
L'état du jeu est conservé dans trois variables partagées : turnedCards, foundCards et lock.
Le retournement est géré uniquement en CSS : JavaScript ajoute ou retire la classe show, et la transition fait le reste.
Ajouter un thème
Créer un dossier dans ressources/ contenant des images numérotées 1.ext, 2.ext... jusqu'à N.ext.
Ajouter un objet dans tableauCorrespondanceMemoryImage :
js
{
nom: "monTheme",
nomAffiche: "Mon thème",
img: "./ressources/mon-theme/apercu.png",
chemin: "./ressources/mon-theme/",
extension: "png",
nombreCartes: 10,
}
Recharger la page : le thème apparaît dans la liste.

Les noms de dossiers sont sensibles à la casse sur un serveur : ils doivent correspondre exactement à chemin.

Crédits
Images des thèmes : ressources fournies par la formation ENI.
Mélange des cartes : algorithme de Fisher-Yates.
Auteur

## Projet réalisé par [Votre nom] dans le cadre de la formation [intitulé de la formation] à l'ENI.

echo "# Eni-Memory-Justine" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/KemJu/Eni-Memory-Justine.git
git push -u origin main
git remote add origin https://github.com/KemJu/Eni-Memory-Justine.git
git branch -M main
git push -u origin main
