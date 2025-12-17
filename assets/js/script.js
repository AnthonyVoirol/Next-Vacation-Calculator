construireCompteur();

let vacancesGlobales = [];

function chargerVacances(fichierJson, callback) {
  fetch(fichierJson)
    .then((response) => response.json())
    .then((data) => {
      vacancesGlobales = data.map((vac) => ({
        nom: vac.nom,
        date: new Date(vac.date),
      }));

      if (callback) callback(vacancesGlobales);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du fichier JSON :", error)
    );
}

function mettreAJourCompteur(vacances) {
  const maintenant = new Date();

  for (let vac of vacances) {
    let dateVac = new Date(vac.date);

    if (dateVac >= maintenant) {
      let diff = dateVac - maintenant;
      let jours = Math.floor(diff / (1000 * 60 * 60 * 24));
      let heures = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let secondes = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("vacance").textContent = vac.nom;

      if (jours === 0) {
        document.getElementById(
          "compteur"
        ).textContent = `C'est aujourd'hui ! 🎉`;
      } else {
        document.getElementById(
          "compteur"
        ).textContent = `Encore ${jours}j ${heures}h ${minutes}m ${secondes}s !`;
      }
      return;
    }
  }

  document.getElementById("compteur").textContent =
    "Plus de vacances prévues 😢";
}

function construireCompteur() {
  const container = document.createElement("div");
  container.classList.add("container");

  const titre = document.createElement("h1");
  titre.textContent = "Prochaines vacances";

  const box = document.createElement("div");
  box.classList.add("box");
  box.id = "countdownBox";

  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.id = "fullscreenBtn";
  fullscreenBtn.classList.add("fullscreen-button");
  fullscreenBtn.title = "Mode plein écran";
  fullscreenBtn.textContent = "⛶";

  const vacance = document.createElement("p");
  vacance.id = "vacance";
  vacance.textContent = "Calcul en cours...";

  const compteur = document.createElement("p");
  compteur.id = "compteur";

  box.appendChild(fullscreenBtn);
  box.appendChild(vacance);
  box.appendChild(compteur);

  container.appendChild(titre);
  container.appendChild(box);

  document.body.prepend(container);
}

const params = new URLSearchParams(window.location.search);
const canton = params.get("canton");

if (!canton) {
  window.location.href = "/";
}

const fichierChoisi = "assets/json/" + canton + ".json";

chargerVacances(fichierChoisi, (vacances) => {
  mettreAJourCompteur(vacances);
  setInterval(() => mettreAJourCompteur(vacances), 1000);
});
