# Portfolio

Portfolio statique d'une seule page d'Arthur Mabit, en français. Mode sombre uniquement, sans framework.

## Structure

```
portfolio/
├── index.html                    # La page (tout le contenu est ici)
├── css/style.css                 # Styles, variables de thème clair/sombre
├── js/main.js                    # Année auto du pied de page
├── assets/
│   ├── profile-placeholder.svg   # Photo de profil (à remplacer)
│   └── project-placeholder.svg   # Aperçu de projet (à remplacer)
└── README.md
```

## Polices

Le site charge **Inter** (texte) et **Calistoga** (titres serif) via Google Fonts, comme le site de référence. Aucune installation requise.

## CV

Le bouton « Télécharger mon CV » pointe vers `assets/cv.pdf`. Place simplement ton fichier `cv.pdf` dans le dossier `assets/` pour activer le téléchargement.

## Où modifier le contenu

Tout se passe dans `index.html`.

### Présentation (hero, en haut)
- `hero__greeting` : la phrase d'accueil (« salut, moi c'est ... »).
- `hero__line` : ligne courte (rôle + pays + drapeau emoji).
- `hero__tagline` : ta phrase de présentation.
- Bouton `CV` (`btn-outline`) : mets le `href` du lien vers ton CV (ex: `assets/cv.pdf`).

### Photo
Remplace `assets/profile-placeholder.svg` par ta photo (format portrait ~175x233), puis mets à jour le `src` de l'image dans `.polaroid`. La vignette est inclinée et se redresse au survol.

### Liens de contact (icônes)
Modifie les `href` des liens `social-link` (hero et pied de page):
- LinkedIn : `https://www.linkedin.com/in/arthur-mabit/`
- GitHub : `https://github.com/ton-compte`
- Email : `mailto:ton.email@exemple.com`

### Compétences
Chaque catégorie est une `skill-card`. Pour chaque compétence:
- le nom et le niveau (texte),
- la largeur de la barre via `style="width: 80%"` (0 % à 100 %).

### Projets
5 cartes `project-card` (placeholder répété). Pour chacune, modifie:
- l'aperçu : remplace `assets/project-placeholder.svg` ou le `src` de l'image,
- le titre `project-card__title`,
- la description `project-card__desc`,
- les `badge` (technos) : simples étiquettes texte,
- les boutons `Site` et `Source` (attribut `href`).
