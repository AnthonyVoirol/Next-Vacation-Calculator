# Compte à Rebours Vacances Scolaires Suisses

Une application web simple et élégante qui affiche un compte à rebours jusqu'aux prochaines vacances scolaires pour chaque canton suisse. Les utilisateurs peuvent sélectionner leur canton sur une carte interactive de la Suisse pour voir combien de jours, d'heures, de minutes et de secondes restent jusqu'à leurs prochaines vacances.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0-green.svg)

## Fonctionnalités

- **Carte Interactive de la Suisse** : Cliquez sur n'importe quel canton pour voir son compte à rebours spécifique
- **Compte à Rebours en Temps Réel** : Minuteur en direct affichant les jours, heures, minutes et secondes
- **Design Responsive** : Fonctionne parfaitement sur ordinateur, tablette et mobile
- **Mode Plein Écran** : Affichage immersif pour les salles de classe ou les présentations
- **Interface Moderne** : Interface sobre et élégante avec code couleur par canton
- **Vacances Multiples** : Cycle automatique à travers toutes les prochaines périodes de vacances
- **Mise à Jour Automatique** : Le compte à rebours se met à jour chaque seconde en temps réel

## Démonstration

Visitez l'application en direct : [Ajoutez votre URL de déploiement ici]

## Technologies Utilisées

- **HTML5** - Structure de balisage sémantique
- **CSS3** - Stylisation moderne avec flexbox et design responsive
- **JavaScript Vanilla** - Pas de frameworks, JS pur pour les performances
- **SVG** - Carte vectorielle interactive de la Suisse

## Structure du Projet
```
├── index.html              # Page d'accueil avec la carte suisse
├── countdown.html          # Page d'affichage du compte à rebours
├── assets/
│   ├── css/
│   │   ├── style.css      # Styles de la page compte à rebours
│   │   └── styleMap.css   # Styles de la page carte
│   ├── js/
│   │   ├── map.js         # Logique d'interaction de la carte
│   │   └── script.js      # Logique du compte à rebours
│   └── json/
│       ├── CH-AG.json     # Vacances d'Argovie
│       ├── CH-BE.json     # Vacances de Berne
│       ├── CH-ZH.json     # Vacances de Zurich
│       └── ...            # Autres fichiers cantonaux
```

## Démarrage

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (optionnel, pour le développement)

### Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votrenom/swiss-holidays-countdown.git
cd swiss-holidays-countdown
```

2. Ouvrez `index.html` dans votre navigateur, ou servez-le avec un serveur local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx http-server

# Avec PHP
php -S localhost:8000
```

3. Naviguez vers `http://localhost:8000` dans votre navigateur

### Utilisation

1. **Sélectionnez Votre Canton** : Cliquez sur n'importe quel canton sur la carte suisse
2. **Visualisez le Compte à Rebours** : Consultez le temps restant jusqu'à vos prochaines vacances scolaires
3. **Mode Plein Écran** : Cliquez sur le bouton plein écran (⛶) pour un affichage immersif
4. **Retour à la Carte** : Cliquez sur "Retour" pour sélectionner un canton différent

## Format des Données de Vacances

Les vacances de chaque canton sont stockées dans un fichier JSON avec la structure suivante :
```json
[
  {
    "nom": "Vacances de printemps",
    "date": "2024-04-15"
  },
  {
    "nom": "Vacances d'été",
    "date": "2024-07-08"
  }
]
```

### Ajout de Nouvelles Vacances

1. Naviguez vers `assets/json/`
2. Ouvrez le fichier du canton concerné (par exemple, `CH-ZH.json`)
3. Ajoutez de nouvelles entrées de vacances en suivant le format ci-dessus
4. Sauvegardez le fichier

## Codes des Cantons

| Canton | Code | Canton | Code |
|--------|------|--------|------|
| Argovie | CH-AG | Neuchâtel | CH-NE |
| Appenzell Rh.-Int. | CH-AI | Nidwald | CH-NW |
| Appenzell Rh.-Ext. | CH-AR | Obwald | CH-OW |
| Berne | CH-BE | Saint-Gall | CH-SG |
| Bâle-Campagne | CH-BL | Schaffhouse | CH-SH |
| Bâle-Ville | CH-BS | Soleure | CH-SO |
| Fribourg | CH-FR | Schwytz | CH-SZ |
| Genève | CH-GE | Thurgovie | CH-TG |
| Glaris | CH-GL | Tessin | CH-TI |
| Grisons | CH-GR | Uri | CH-UR |
| Jura | CH-JU | Vaud | CH-VD |
| Lucerne | CH-LU | Valais | CH-VS |
| Zurich | CH-ZH | Zoug | CH-ZG |

## Compatibilité Navigateurs

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Navigateurs mobiles (iOS Safari, Chrome Mobile)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request. Pour les changements majeurs, veuillez d'abord ouvrir une issue pour discuter de ce que vous souhaitez modifier.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de NouvelleFonctionnalite'`)
4. Poussez vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrez une Pull Request

## Feuille de Route

- [ ] Ajouter le support de la langue anglaise
- [ ] Ajouter les traductions allemande et italienne
- [ ] Inclure les jours fériés nationaux
- [ ] Ajouter une fonctionnalité d'export de calendrier
- [ ] Créer des versions d'application mobile
- [ ] Ajouter un système de notification pour les vacances à venir

## Problèmes Connus

- Le mode plein écran peut ne pas fonctionner sur iOS Safari en raison des limitations du navigateur
- La gestion du fuseau horaire suppose le fuseau horaire local du navigateur

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Auteur

**Ant-V**

## Remerciements

- Calendriers des vacances scolaires des cantons suisses provenant des sources officielles des départements de l'éducation
- Carte SVG de la Suisse basée sur des données cartographiques du domaine public
- Inspiré par le besoin des élèves et des enseignants de suivre leurs pauses bien méritées

## Support

Si vous rencontrez des problèmes ou avez des questions, veuillez [ouvrir une issue](https://github.com/votrenom/swiss-holidays-countdown/issues).

---

Fait avec ❤️ pour les élèves et enseignants suisses