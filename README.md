# LED PRO - Site Web Professionnel

Site web vitrine pour LEDPRO, distributeur de solutions d'éclairage LED professionnelles de la marque V-TAC.

## Technologies Utilisées

- HTML5
- Tailwind CSS pour le style
- Alpine.js pour l'interactivité
- GSAP pour les animations avancées
- PostCSS pour le traitement CSS

## Structure du Projet

```
led-pro2/
├── css/
│   ├── animations.css
│   ├── footer.css
│   ├── header.css
│   ├── input.css
│   ├── style.css
│   └── style.min.css
├── js/
│   ├── app.js
│   ├── components.js
│   ├── slider.js
│   └── ...
├── images/
├── index.html
└── autres pages...
```

## Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```

## Scripts Disponibles

- `npm run dev` : Lance le serveur de développement avec hot-reload
- `npm run build` : Compile les assets pour la production
- `npm run serve` : Lance un serveur local
- `npm run css:combine` : Combine les fichiers CSS complémentaires

## Fonctionnalités

- Menu de navigation responsive
- Slider héro avec contrôles tactiles et clavier
- Catalogue de produits avec filtres
- Formulaire de contact
- Optimisations SEO
- Design responsive
- Animations fluides

## Roadmap / Future Improvements

### Complété
- [x] Configuration initiale du projet
- [x] Mise en place de Tailwind CSS
- [x] Intégration d'Alpine.js
- [x] Création du slider héro
- [x] Optimisation SEO de base

### En Cours
- [ ] Optimisation des images
- [ ] Amélioration de l'accessibilité
- [ ] Tests de compatibilité cross-browser

### Planifié
- [ ] Ajout d'une section FAQ
- [ ] Intégration de témoignages clients
- [ ] Module de chat en ligne
- [ ] Filtres dynamiques pour le catalogue
- [ ] Amélioration du formulaire de devis

## Maintenance

### JavaScript
Le slider héro (`js/slider.js`) gère :
- Navigation automatique
- Contrôles tactiles
- Navigation au clavier
- Gestion d'erreurs
- Pause au survol

### CSS
Les styles sont organisés en plusieurs fichiers :
- `input.css` : Styles Tailwind de base
- `animations.css` : Animations personnalisées
- `header.css` et `footer.css` : Styles spécifiques
- `style.min.css` : Build final minifié

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## License

Propriétaire - Tous droits réservés
