//adding an event listener for what is gonna be submitted in the form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //creating an object for the data that is gonna submitted
  const data = Object.fromEntries(new FormData(form));

  //passwords must match
  if (data.confirmermotdePasse.trim() !== data.motdePasse.trim()) {
    alert("Entrez un mot de passe identique.");
    return;
  }
  //password must contain a letter, a number and a symbol
  const mdp = data.motdePasse.trim();
  if (!/[a-zA-Z]/.test(mdp) || !/[0-9]/.test(mdp) || !/[@$!%*?&]/.test(mdp)) {
    alert(
      "Le mot de passe doit contenir une lettre, un chiffre et un symbole.",
    );
    return;
  }

  //JSON.parse turns the saved text back into an array
  //localStorage.getItem("users") gets the saved list, or null the first time. || [] then starts an empty list
  const users = JSON.parse(localStorage.getItem("users")) || [];

  //if any username on the list is taken, gives an alert and stops the script
  const nameTaken = users.some(
    (user) => user.username.toLowerCase() === data.nom.trim().toLowerCase(),
  );
  if (nameTaken) {
    alert("Ce nom d'utilisateur est déjà pris.");
    return;
  }
  //if any email on the list is taken, gives an alert and stops the script
  const emailTaken = users.some(
    (user) => user.email.toLowerCase() === data.email.trim().toLowerCase(),
  );
  if (emailTaken) {
    alert("Cet email est déjà utilisé.");
    return;
  }
  //adds the form valid entries in the users array
  users.push({
    username: data.nom.trim(),
    email: data.email.trim(),
    password: mdp,
  });

  //saves this info in localStorage
  //JSON.stringify turns the array back into text, because localStorage only stores text
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Utilisateur enregistré", users);
});
