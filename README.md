# Portfolio — Rayan Ghomsi Talla, Data Scientist

Portfolio de Rayan Gabriel Ghomsi Talla, en Mastère Spécialisé SIO à CentraleSupélec, qui cherche un stage de 6 mois en IA / Data Science à partir d’avril 2027.

## Parti pris

- **Le spectacle montre le métier.** Le héros est un espace d’embeddings en canvas 2D : le pointeur joue la requête et ses k plus proches voisins s’allument, comme l’étape de récupération d’un RAG.
- **Des résultats mesurés, pas des démos simulées.** Chaque projet a une étude de cas (contexte, contribution, résultats, limites). Aucune donnée fictive : pas de faux tableau de bord ni de faux chatbot.
- **Thème sombre par défaut**, thème clair disponible, `prefers-reduced-motion` respecté.

## Structure

```
app/
  page.tsx                 Accueil : héros, projet phare, travaux, parcours, compétences, contact
  projects/page.tsx        Index des projets
  projects/[slug]/page.tsx Étude de cas (générée statiquement)
  experience/ skills/ contact/
components/
  hero/EmbeddingField.tsx  Canvas interactif du héros
  ui/EvalReport.tsx        Rapport de résultats animé
  ui/RagPipeline.tsx       Schéma animé du pipeline RAG
  sections/Sections.tsx    Sections réutilisées par les pages
lib/data/
  projects.ts              Projets et résultats
  experience.ts            Profil, expériences, formation, compétences
```

Pour modifier le contenu, éditer `lib/data/`. Les couleurs sont des variables CSS dans `app/globals.css`.

## Lancer

```bash
npm install
npm run dev
```

Stack : Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, canvas 2D.
