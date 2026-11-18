/**
 * input (each change), change (on commit), submit, focus, blur
 */
/**
 * Le Nom d'utilisateur doit vérifier 3 caractères minimum.

    L'email doit être un email valide.

    Le mot de passe doit correspondre à la vérification du mot de passe et il doit faire au moins 6 caractères. Il doit posséder un symbole,un chiffre et des lettres.
 */

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stops the page from reloading

  let data = Object.fromEntries(new FormData(form));
  data = { username: "...", email: "...", password: "..." };

  console.log(data);
});
