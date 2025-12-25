# 🧠 Portfolio AI - Data Scientist & AI Engineer

Un portfolio interactif et unique pour Data Scientist/IA Engineer avec des visualisations 3D, des démos ML interactives et un assistant IA.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.170-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## ✨ Fonctionnalités

### 🌐 Page d'Accueil - Neural Network Landing
- Réseau de neurones 3D interactif généré avec React Three Fiber
- Nœuds représentant les compétences avec navigation au clic
- Particules de données animées
- Statistiques et liens rapides

### 📁 Section Projets - Interactive ML Playground
- Grille de projets filtrable par catégorie
- Recherche en temps réel
- Démos interactives pour chaque projet :
  - Analyse de sentiments (NLP)
  - Classification d'images (Computer Vision)
  - Visualisations de métriques
- Code snippets avec syntax highlighting

### 🌌 Compétences - Skill Galaxy
- Représentation 3D des compétences en système solaire
- Taille des planètes = niveau de maîtrise
- Orbites = catégories de compétences
- Interaction : rotation, zoom, sélection

### 📊 Expérience - Data Timeline
- Timeline verticale avec scroll parallax
- Métriques avant/après pour chaque expérience
- Animations de transition fluides

### 📈 Dashboard - Real-time Analytics
- Statistiques de visiteurs en temps réel
- Activité GitHub avec graphiques
- Distribution des langages
- Repositories populaires

### 💬 Contact - AI Chat Assistant
- Chatbot IA conversationnel
- Réponses contextuelles sur le parcours
- Formulaire de contact moderne
- Informations de contact

### 🎮 Easter Eggs
- **Konami Code** : Active le mode Matrix (↑↑↓↓←→←→BA)
- Mode sombre/clair avec transition fluide

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/your-username/portfolio-ai.git
cd portfolio-ai

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
npm start
```

## 📁 Structure du Projet

```
portfolio-ai/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── projects/
│   │   ├── page.tsx          # Liste des projets
│   │   └── [slug]/page.tsx   # Détail projet
│   ├── skills/page.tsx       # Skill Galaxy 3D
│   ├── experience/page.tsx   # Timeline
│   ├── dashboard/page.tsx    # Analytics
│   └── contact/page.tsx      # Contact + Chat
├── components/
│   ├── 3d/
│   │   ├── NeuralNetwork.tsx
│   │   └── SkillGalaxy.tsx
│   ├── ml/
│   │   ├── TextPredictor.tsx
│   │   └── ImageClassifier.tsx
│   ├── visualizations/
│   │   └── MetricsChart.tsx
│   ├── chat/
│   │   └── AIAssistant.tsx
│   └── layout/
│       └── Navigation.tsx
├── lib/
│   ├── data/
│   │   ├── projects.ts
│   │   └── experience.ts
│   └── utils.ts
└── public/
```

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **3D**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 🎨 Personnalisation

### Modifier les projets
Éditez `lib/data/projects.ts` pour ajouter/modifier vos projets.

### Modifier les expériences
Éditez `lib/data/experience.ts` pour votre parcours.

### Modifier les compétences
Éditez le tableau `skills` dans `components/3d/SkillGalaxy.tsx`.

### Couleurs et thème
Modifiez `tailwind.config.ts` pour personnaliser les couleurs.

## 📱 Responsive

Le portfolio est entièrement responsive avec :
- Visualisations 3D adaptées au mobile
- Navigation mobile avec menu hamburger
- Touch gestures pour les interactions 3D

## ⚡ Performance

- Lazy loading des composants 3D
- Code splitting par route
- Images optimisées avec next/image
- Animations respectant `prefers-reduced-motion`

## 📄 License

MIT License - Libre d'utilisation et de modification.

---

Créé avec ❤️ et beaucoup de ☕
