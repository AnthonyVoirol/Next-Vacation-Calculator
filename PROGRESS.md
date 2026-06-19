# PROGRESS

## Structure
- /fr /en /it /de — pages par langue (SEO friendly)
- /assets/css /assets/js /assets/json — communs, partagés entre langues
- JSON vacances: assets/json/CH-XX.json (inchangé)

## À faire
- [x] index.html (map) x4 langues
- [x] countdown.html x4 langues
- [x] page racine "/" = redirect auto langue navigateur -> /fr/ par défaut
- [x] CSS commun nettoyé (style.css fusionné, suppression duplication, variables thème)
- [x] map.js (générique, garde liens vers /LANG/countdown.html)
- [x] script.js
  - [x] garde système cantons/JSON intact
  - [x] i18n: dictionnaire textes UI par langue (pas trad JS, juste strings injectées par page)
  - [x] export .ics (téléchargement fichier)
  - [x] lien "Ajouter à Google Calendar"
  - [x] notifications/rappel (Notification API + choix délai)
  - [x] partage (Web Share API + fallback copie lien)
  - [x] toggle thème clair/sombre (localStorage)
- [ ] hreflang + meta SEO sur chaque page
- [ ] sitemap.xml (bonus SEO)
- [ ] vérif liens relatifs assets depuis /fr/ /en/ /it/ /de/

## Fait
(rien encore)

## Notes
- app.html téléchargement: ignoré pour l'instant (lien gardé tel quel, pas retravaillé)
- vacances JSON restent en FR partout (pas de trad contenu)
- pas de backend pour l'instant, prévoir structure facilement migrable si BDD ajoutée plus tard
