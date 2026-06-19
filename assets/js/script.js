// Langue de la page courante (définie via <html lang="..">)
const LANG = document.documentElement.lang || "fr";
const T = I18N[LANG] || I18N.fr;

construireCompteur();

let vacancesGlobales = [];
let vacanceActuelle = null;

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

      vacanceActuelle = vac;

      document.getElementById("vacance").textContent = vac.nom;

      if (jours === 0) {
        document.getElementById("compteur").textContent = T.today;
      } else {
        document.getElementById("compteur").textContent = T.remaining(
          jours,
          heures,
          minutes,
          secondes
        );
      }
      return;
    }
  }

  vacanceActuelle = null;
  document.getElementById("vacance").textContent = "";
  document.getElementById("compteur").textContent = T.noMore;
}

function construireCompteur() {
  const container = document.createElement("div");
  container.classList.add("container");

  const titre = document.createElement("h1");
  titre.textContent = T.countdownTitle;

  const box = document.createElement("div");
  box.classList.add("box");
  box.id = "countdownBox";

  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.id = "fullscreenBtn";
  fullscreenBtn.classList.add("fullscreen-button");
  fullscreenBtn.title = "⛶";
  fullscreenBtn.textContent = "⛶";

  const vacance = document.createElement("p");
  vacance.id = "vacance";
  vacance.textContent = T.calculating;

  const compteur = document.createElement("p");
  compteur.id = "compteur";

  box.appendChild(fullscreenBtn);
  box.appendChild(vacance);
  box.appendChild(compteur);

  // Actions: export ics, google calendar, partage, rappel
  const actions = document.createElement("div");
  actions.classList.add("actions");

  function createActionItem(svgHtml, label, onClick) {
    const wrapper = document.createElement("div");
    wrapper.className = "action-item";
    const btn = document.createElement("button");
    btn.className = "icon-button";
    btn.title = label;
    btn.innerHTML = svgHtml;
    btn.addEventListener("click", onClick);
    const span = document.createElement("span");
    span.className = "action-label";
    span.textContent = label;
    wrapper.appendChild(btn);
    wrapper.appendChild(span);
    return { wrapper, btn };
  }

  const ics = createActionItem(
    `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    T.labelCalendar || "Calendrier",
    exporterIcs
  );
  const google = createActionItem(
    `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="12" y1="14" x2="12" y2="18"></line><line x1="10" y1="16" x2="14" y2="16"></line></svg>`,
    T.labelGoogle || "Google",
    ajouterGoogleCalendar
  );
  const share = createActionItem(
    `<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
    T.labelShare || "Partager",
    partager
  );
  const remind = createActionItem(
    `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    T.labelRemind || "Rappel",
    () => toggleRappel(remind.btn)
  );

  actions.appendChild(ics.wrapper);
  actions.appendChild(google.wrapper);
  actions.appendChild(share.wrapper);
  actions.appendChild(remind.wrapper);

  container.appendChild(titre);
  container.appendChild(box);
  container.appendChild(actions);

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.id = "toast";
  container.appendChild(toast);

  document.body.prepend(container);
}

function afficherToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// --- Export .ics ---
function formatDateIcs(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function exporterIcs() {
  if (!vacanceActuelle) return;

  const debut = new Date(vacanceActuelle.date);
  const fin = new Date(debut.getTime() + 24 * 60 * 60 * 1000);

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ChoixCanton//Vacances//FR",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@choixcanton`,
    `DTSTAMP:${formatDateIcs(new Date())}`,
    `DTSTART;VALUE=DATE:${debut.toISOString().split("T")[0].replace(/-/g, "")}`,
    `DTEND;VALUE=DATE:${fin.toISOString().split("T")[0].replace(/-/g, "")}`,
    `SUMMARY:${vacanceActuelle.nom}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${vacanceActuelle.nom}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Google Calendar ---
function ajouterGoogleCalendar() {
  if (!vacanceActuelle) return;

  const debut = new Date(vacanceActuelle.date);
  const fin = new Date(debut.getTime() + 24 * 60 * 60 * 1000);

  const fmt = (d) => d.toISOString().split("T")[0].replace(/-/g, "");

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", vacanceActuelle.nom);
  url.searchParams.set("dates", `${fmt(debut)}/${fmt(fin)}`);

  window.open(url.toString(), "_blank");
}

// --- Partage ---
function partager() {
  if (!vacanceActuelle) return;

  const maintenant = new Date();
  const dateVac = new Date(vacanceActuelle.date);
  const diff = dateVac - maintenant;
  const jours = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  const shareText = T.shareText
    ? T.shareText(vacanceActuelle.nom, jours)
    : `${vacanceActuelle.nom} dans ${jours} jours ! Regarde le compte à rebours :`;

  const data = {
    title: T.shareTitle(vacanceActuelle.nom),
    text: shareText,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(data).catch(() => {});
  } else {
    const fullText = `${shareText}\n${window.location.href}`;
    navigator.clipboard.writeText(fullText).then(() => {
      afficherToast(T.shareCopied);
    });
  }
}

// --- Rappel (Notification API) ---
let rappelTimeout = null;

function toggleRappel(btn) {
  if (!("Notification" in window) || !vacanceActuelle) return;

  if (btn.classList.contains('active')) {
    // Disable notification
    if (rappelTimeout) {
      clearTimeout(rappelTimeout);
      rappelTimeout = null;
    }
    btn.classList.remove('active');
    btn.title = T.remind;
    afficherToast("Rappel désactivé"); // Optional: could localize
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission !== "granted") {
      afficherToast(T.notifPermissionDenied);
      return;
    }

    const debut = new Date(vacanceActuelle.date);
    const delai = debut.getTime() - Date.now();

    if (delai <= 0) {
      afficherToast("L'événement est déjà passé");
      return;
    }

    btn.classList.add('active');
    btn.title = T.remindOn;

    rappelTimeout = setTimeout(() => {
      new Notification(T.pageTitle, {
        body: T.notifBody(vacanceActuelle.nom),
      });
      btn.classList.remove('active');
      btn.title = T.remind;
    }, delai);
    
    afficherToast("Rappel activé"); // Optional: could localize
  });
}

const params = new URLSearchParams(window.location.search);
const canton = params.get("canton");

if (!canton) {
  window.location.href = "../index.html";
}

const fichierChoisi = "../assets/json/" + canton + ".json";

chargerVacances(fichierChoisi, (vacances) => {
  mettreAJourCompteur(vacances);
  setInterval(() => mettreAJourCompteur(vacances), 1000);
});

document.addEventListener('DOMContentLoaded', function() {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const countdownBox = document.getElementById('countdownBox');

  if (fullscreenBtn && countdownBox) {
    fullscreenBtn.addEventListener('click', function() {
      toggleFullscreen();
    });
  }

  function toggleFullscreen() {
    if (countdownBox.classList.contains('fullscreen-mode')) {
      countdownBox.classList.remove('fullscreen-mode');

      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    } else {
      countdownBox.classList.add('fullscreen-mode');

      if (countdownBox.requestFullscreen) countdownBox.requestFullscreen();
      else if (countdownBox.webkitRequestFullscreen) countdownBox.webkitRequestFullscreen();
      else if (countdownBox.mozRequestFullScreen) countdownBox.mozRequestFullScreen();
      else if (countdownBox.msRequestFullscreen) countdownBox.msRequestFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);

  function handleFullscreenChange() {
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
      countdownBox.classList.remove('fullscreen-mode');
    }
  }
});
