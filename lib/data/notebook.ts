// Notes de travail : uniquement des faits vérifiés (limites, contraintes, choix). Rien d'inventé.
export interface Note {
  project: string
  tag: 'limite' | 'méthode' | 'contrainte' | 'en cours' | 'choix'
  text: string
  open?: boolean
}

export const notes: Note[] = [
  {
    project: 'Assistant-RAG',
    tag: 'limite',
    text: '4 questions de suivi sur 18 ratées par la mémoire de conversation.',
    open: true,
  },
  {
    project: 'Assistant-RAG',
    tag: 'méthode',
    text: 'Juge RAGAS de 7B, donc des scores bruités. Chaque version est rejouée sur les mêmes 85 questions et comparée à la précédente, avec IC bootstrap à 95 %.',
  },
  {
    project: 'Orange Data AI Factory',
    tag: 'contrainte',
    text: 'Serveurs RHEL sans accès Internet. DBT et Airbyte y ont été déployés hors ligne.',
  },
  {
    project: 'Assistant-RAG',
    tag: 'en cours',
    text: 'Pipeline DPO (TRL, QLoRA) écrit. Pas encore évalué, donc aucun résultat publié.',
    open: true,
  },
  {
    project: 'Orange Data AI Factory',
    tag: 'choix',
    text: 'Avant de fixer l’architecture ELT cible : un POC comparant NiFi, Airbyte et DBT.',
  },
  {
    project: 'Graph-RAG',
    tag: 'contrainte',
    text: 'Preuve de concept de veille à construire avec un budget nul.',
    open: true,
  },
]
