// Graphe de connaissances du site : projets, expériences, outils, lieux et résultats.
// Les réponses sont préparées à partir du contenu des pages ; chaque phrase cite sa source.

export type NodeKind = 'project' | 'experience' | 'tool' | 'place' | 'result'

export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  href?: string
}

export const nodes: GraphNode[] = [
  { id: 'rag', label: 'Assistant-RAG', kind: 'project', href: '/projects/assistant-rag' },
  { id: 'jumeau', label: 'Jumeau numérique', kind: 'project', href: '/projects/jumeau-numerique-extrudeuse' },
  { id: 'colorfol', label: 'Colorfol', kind: 'project', href: '/projects/colorfol-backend' },
  { id: 'graph', label: 'Graph-RAG', kind: 'project', href: '/projects/graph-rag-veille' },
  { id: 'churn', label: 'Churn télécom', kind: 'project', href: '/projects/churn-telecom' },
  { id: 'tsa', label: 'TSA InnovLab', kind: 'project', href: '/projects/tsa-innovlab' },
  { id: 'orange', label: 'Orange Data AI Factory', kind: 'experience', href: '/experience' },

  { id: 'cs', label: 'CentraleSupélec', kind: 'place' },
  { id: 'icam', label: 'ICAM Nantes', kind: 'place' },
  { id: 'ucac', label: 'UCAC-ICAM', kind: 'place' },

  { id: 'langchain', label: 'LangChain', kind: 'tool' },
  { id: 'chroma', label: 'ChromaDB', kind: 'tool' },
  { id: 'llama', label: 'Llama 3.1 8B', kind: 'tool' },
  { id: 'ragas', label: 'RAGAS', kind: 'tool' },
  { id: 'fastapi', label: 'FastAPI', kind: 'tool' },
  { id: 'mlflow', label: 'MLflow', kind: 'tool' },
  { id: 'kg', label: 'Graphe de connaissances', kind: 'tool' },
  { id: 'django', label: 'Django', kind: 'tool' },
  { id: 'postgres', label: 'PostgreSQL', kind: 'tool' },
  { id: 'mongo', label: 'MongoDB', kind: 'tool' },
  { id: 'xgboost', label: 'XGBoost', kind: 'tool' },
  { id: 'nifi', label: 'NiFi', kind: 'tool' },
  { id: 'airflow', label: 'Airflow', kind: 'tool' },
  { id: 'pyspark', label: 'PySpark', kind: 'tool' },
  { id: 'dbt', label: 'DBT', kind: 'tool' },
  { id: 'airbyte', label: 'Airbyte', kind: 'tool' },
  { id: 'clickhouse', label: 'ClickHouse', kind: 'tool' },

  { id: 'r-refus', label: '0 refus à tort', kind: 'result' },
  { id: 'r-cit', label: '100 % citations exactes', kind: 'result' },
  { id: 'r-rebut', label: '−30 % rebut', kind: 'result' },
  { id: 'r-f1', label: 'F1 0,87', kind: 'result' },
  { id: 'r-first', label: '1ère place', kind: 'result' },
  { id: 'r-offline', label: 'Serveurs hors ligne', kind: 'result' },
]

export const links: [string, string][] = [
  ['rag', 'langchain'], ['rag', 'chroma'], ['rag', 'llama'], ['rag', 'ragas'], ['rag', 'fastapi'], ['rag', 'mlflow'],
  ['rag', 'r-refus'], ['rag', 'r-cit'],
  ['graph', 'kg'], ['graph', 'cs'],
  ['jumeau', 'icam'], ['jumeau', 'xgboost'], ['jumeau', 'nifi'], ['jumeau', 'postgres'], ['jumeau', 'r-rebut'],
  ['colorfol', 'django'], ['colorfol', 'postgres'], ['colorfol', 'mongo'],
  ['churn', 'ucac'], ['churn', 'pyspark'], ['churn', 'nifi'], ['churn', 'airflow'], ['churn', 'r-f1'],
  ['orange', 'dbt'], ['orange', 'airbyte'], ['orange', 'airflow'], ['orange', 'clickhouse'], ['orange', 'r-offline'],
  ['tsa', 'r-first'], ['tsa', 'ucac'],
  ['cs', 'ucac'],
]

export interface Citation {
  n: number
  label: string
  href: string
  nodes: string[]
}

export interface Answer {
  id: string
  question: string
  /** Phrases avec le numéro de la citation qui les justifie */
  sentences: { text: string; cite: number }[]
  citations: Citation[]
}

export const answers: Answer[] = [
  {
    id: 'production',
    question: 'Qu’a-t-il construit en production ?',
    sentences: [
      { text: 'Chez Orange Data AI Factory, il a déployé DBT et Airbyte sur des serveurs sans accès Internet, et un pipeline Airbyte + Airflow vers ClickHouse.', cite: 1 },
      { text: 'Chez Colorfol, il a pris en charge l’ensemble du backend d’une plateforme de streaming musical.', cite: 2 },
      { text: 'À l’ICAM Nantes, son jumeau numérique a réduit le taux de rebut de 30 %.', cite: 3 },
    ],
    citations: [
      { n: 1, label: 'Parcours · Orange', href: '/experience', nodes: ['orange', 'dbt', 'airbyte', 'airflow', 'clickhouse', 'r-offline'] },
      { n: 2, label: 'Étude de cas · Colorfol', href: '/projects/colorfol-backend', nodes: ['colorfol', 'django', 'postgres', 'mongo'] },
      { n: 3, label: 'Étude de cas · Jumeau numérique', href: '/projects/jumeau-numerique-extrudeuse', nodes: ['jumeau', 'icam', 'xgboost', 'r-rebut'] },
    ],
  },
  {
    id: 'evaluation',
    question: 'Sait-il évaluer un modèle ?',
    sentences: [
      { text: 'Assistant-RAG est évalué sur 85 questions, avec intervalles de confiance bootstrap à 95 % et comparaisons appariées entre versions.', cite: 1 },
      { text: 'Résultat : aucun refus à tort et 100 % de citations vérifiées exactes.', cite: 1 },
      { text: 'Son modèle de churn télécom atteint un F1-score de 0,87.', cite: 2 },
    ],
    citations: [
      { n: 1, label: 'Étude de cas · Assistant-RAG', href: '/projects/assistant-rag', nodes: ['rag', 'ragas', 'mlflow', 'r-refus', 'r-cit'] },
      { n: 2, label: 'Étude de cas · Churn télécom', href: '/projects/churn-telecom', nodes: ['churn', 'pyspark', 'r-f1'] },
    ],
  },
  {
    id: 'genai',
    question: 'Que fait-il en IA générative ?',
    sentences: [
      { text: 'Assistant-RAG répond sur la documentation de dbt et d’Airflow en citant ses sources, et refuse les questions hors périmètre.', cite: 1 },
      { text: 'Avec Graph-RAG, il construit une preuve de concept de veille technologique fondée sur un graphe de connaissances, pour un client industriel.', cite: 2 },
      { text: 'Un pipeline DPO est écrit ; il n’est pas encore évalué.', cite: 1 },
    ],
    citations: [
      { n: 1, label: 'Étude de cas · Assistant-RAG', href: '/projects/assistant-rag', nodes: ['rag', 'langchain', 'chroma', 'llama', 'fastapi'] },
      { n: 2, label: 'Étude de cas · Graph-RAG', href: '/projects/graph-rag-veille', nodes: ['graph', 'kg', 'cs'] },
    ],
  },
]
