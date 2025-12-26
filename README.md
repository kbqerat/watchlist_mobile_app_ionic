# 🎬 FLIXAPP - Watchlist Manager

**FLIXAPP** est une application mobile hybride interactive conçue pour centraliser et organiser vos envies cinématographiques. Développée avec **Ionic**, **Angular** et **Firebase**, elle combine la puissance du cloud en temps réel avec une interface utilisateur moderne inspirée des plateformes de streaming.

---

## 🛠 Stack Technique & Architecture

- **Framework** : Ionic 8+ & Angular 19 (Architecture **Standalone Components**)
- **Base de données** : Firebase Cloud Firestore (NoSQL temps réel)
- **Authentification** : Firebase Auth (Email/Password)
- **Services Cloud** : Déploiement de règles de sécurité pour la protection des données par utilisateur.
- **API Externe** : Intégration de l'API REST **TVMaze** pour l'indexation mondiale des films et séries.
- **Gestion d'état** : Programmation réactive avec **RxJS** (Observables).

---

## ✨ Fonctionnalités Détaillées

### 🔐 Sécurité & Accès

- **Isolation des données** : Chaque utilisateur possède sa propre base de données. Un utilisateur A ne peut pas voir la liste d'un utilisateur B.
- **Validation d'inscription** : Double vérification du mot de passe et contrôle du format email.
- **Gardes de navigation** : Utilisation d'Angular Auth Guards pour rediriger automatiquement les utilisateurs non connectés vers l'écran de Login.

### 🔍 Recherche & Découverte

- **Recherche Live API** : Dès la saisie de 3 caractères, l'application interroge l'API TVMaze et affiche des suggestions (nom, genre, affiche).
- **Ajout en un clic** : L'ajout depuis l'API pré-remplit automatiquement le type (Film/Série) et l'image.

### 📝 Organisation de la Watchlist (CRUD)

- **Gestion de statuts** : Suivi précis du cycle de vie d'un média :
  - ⏳ **À voir** : Pour les découvertes futures.
  - 🍿 **En cours** : Pour les contenus en cours de visionnage.
  - ✅ **Terminé** : Pour les contenus archivés (coche automatiquement la case "Vu").
- **Notation & Critiques** : Système de scoring (1 à 5 étoiles) et zone de texte pour rédiger des notes personnelles sur chaque média.

### 📊 Dashboard & Profil

- **Statistiques dynamiques** : Calcul automatique du ratio films/séries et du taux de complétion de la liste.
- **Interface Intuitive** : Design "Dark Mode" avec effets de flou (Glassmorphism) et animations de cartes.

---

## 📖 Guide d'utilisation (Étapes de test)

Pour tester l'application de manière optimale, suivez ces étapes :

### 1. Inscription et Connexion

- Lancez l'application. Sur l'écran d'accueil, cliquez sur **"Créer un compte"**.
- Remplissez les champs (Email, Mot de passe, Confirmation).
- Une fois validé, vous êtes automatiquement redirigé vers votre espace personnel.

### 2. Ajouter du contenu

- **Option A (Recherche API)** : Dans la barre de recherche en haut, tapez "Batman" ou "Breaking Bad". Une liste de suggestions apparaît. Cliquez sur l'icône `+` pour l'ajouter instantanément à votre liste.
- **Option B (Manuel)** : Utilisez le bouton flottant `+` ou le formulaire d'ajout rapide pour entrer un titre manuellement.

### 3. Gérer votre liste

- Sur votre écran principal, utilisez le **Sélecteur de Statut** pour passer un film de "À voir" à "En cours".
- Cliquez sur l'icône **"Œil"** d'une carte pour accéder aux détails. Ici, attribuez une note ⭐ et écrivez une courte critique. Enregistrez.
- Cochez la **Checkbox** pour marquer un titre comme vu (cela barrera le texte pour une meilleure visibilité).

### 4. Filtrage et Recherche locale

- Utilisez les **Segments** (Films / Séries) pour filtrer votre collection.
- Utilisez la barre de recherche pour retrouver un titre spécifique déjà présent dans votre liste.

### 5. Consulter les statistiques

- Cliquez sur l'icône **Profil** (en haut à gauche).
- Observez vos compteurs se mettre à jour en fonction des actions effectuées précédemment.

### 6. Déconnexion

- Cliquez sur l'icône de **Sortie** (en haut à droite) pour fermer votre session de manière sécurisée.

---

## 📦 Installation Développeur

```bash
# Installation des dépendances
npm install

# Lancement du serveur de test
ionic serve

# Build pour production
ionic build
```

📝Auteur
Bekkaoui Tarek - Projet Mobile Hybride (Ionic/Angular)
