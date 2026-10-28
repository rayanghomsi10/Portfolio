import type { Universe } from './projects'

// Où chaque outil a servi, d'après les études de cas et le parcours décrits sur ce site.
// Un outil sans usage ici reste listé, mais signalé comme non illustré : rien n'est inventé.

export interface UsageTarget {
  id: string
  label: string
  href: string
  detail: string
  universe: Universe
}

export const usageTargets: UsageTarget[] = [
  { id: 'rag', label: 'Assistant-RAG', href: '/projects/assistant-rag', detail: 'Projet personnel · IA générative', universe: 'fragments' },
  { id: 'graph', label: 'Graph-RAG', href: '/projects/graph-rag-veille', detail: 'Projet d’entreprise · MS SIO', universe: 'mesh' },
  { id: 'jumeau', label: 'Jumeau numérique', href: '/projects/jumeau-numerique-extrudeuse', detail: 'Stage de recherche · ICAM Nantes', universe: 'grid' },
  { id: 'churn', label: 'Churn télécom', href: '/projects/churn-telecom', detail: 'Projet · UCAC-ICAM', universe: 'base' },
  { id: 'colorfol', label: 'Colorfol', href: '/projects/colorfol-backend', detail: 'Freelance · backend complet', universe: 'wave' },
  { id: 'orange', label: 'Orange Data AI Factory', href: '/experience', detail: 'Stage · Data Engineering', universe: 'base' },
  { id: 'web', label: 'Expériences web', href: '/experience', detail: 'Digital Experience, Lab2view · 2023–2024', universe: 'base' },
]

export const skillUsage: Record<string, string[]> = {
  // Machine Learning / Deep Learning
  XGBoost: ['jumeau'],
  // Statistiques
  Régression: ['jumeau'],
  'IC par bootstrap': ['rag'],
  'Comparaisons appariées': ['rag'],
  // IA générative
  'RAG / Graph-RAG': ['rag', 'graph'],
  LangChain: ['rag'],
  ChromaDB: ['rag'],
  RAGAS: ['rag'],
  Ollama: ['rag'],
  'DPO (TRL, QLoRA)': ['rag'],
  // Big Data & ETL
  'Apache NiFi': ['jumeau', 'churn', 'orange'],
  Airflow: ['churn', 'orange'],
  PySpark: ['churn'],
  Hadoop: ['churn'],
  DBT: ['orange'],
  Airbyte: ['orange'],
  ClickHouse: ['orange'],
  // MLOps & DevOps
  MLflow: ['rag'],
  Docker: ['rag'],
  'GitHub Actions': ['rag'],
  'Linux RHEL': ['orange'],
  // Langages
  Python: ['rag', 'jumeau', 'orange'],
  SQL: ['orange'],
  Bash: ['orange'],
  PHP: ['web'],
  // Bases de données
  PostgreSQL: ['jumeau', 'colorfol'],
  MySQL: ['web'],
  MongoDB: ['colorfol'],
  Hive: ['churn', 'orange'],
  // Web & API
  FastAPI: ['rag'],
  Django: ['colorfol'],
  Laravel: ['web'],
}

export function usagesOf(skill: string) {
  return (skillUsage[skill] ?? []).map((id) => usageTargets.find((t) => t.id === id)!)
}
