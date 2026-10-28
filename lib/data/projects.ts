export interface Result {
  label: string
  value: string
  /** Score entre 0 et 1, affiché en barre quand il est fourni */
  score?: number
  note?: string
}

export interface Project {
  slug: string
  title: string
  kind: string
  period: string
  status: 'Terminé' | 'En cours'
  domain: 'IA générative' | 'Machine Learning' | 'Data Engineering' | 'Backend'
  summary: string
  context: string
  contributions: string[]
  results: Result[]
  limits?: string[]
  stack: string[]
  repoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'assistant-rag',
    title: 'Assistant-RAG',
    kind: 'Projet personnel',
    period: '2026',
    status: 'En cours',
    domain: 'IA générative',
    summary:
      'Questions-réponses sur la documentation dbt et Airflow, évalué sur 85 questions avec garde-fous contre les hallucinations.',
    context:
      'Un assistant qui répond à partir de la documentation officielle de dbt et d’Airflow, cite ses sources et refuse les questions hors périmètre. L’objectif était moins la démo que la mesure : savoir, chiffres à l’appui, si une modification améliore vraiment les réponses.',
    contributions: [
      'Pipeline RAG en LangChain (LCEL) : ChromaDB, embeddings multilingual-e5-small et reranker, Llama 3.1 8B servi en local par Ollama, API FastAPI.',
      'Mémoire de conversation avec reformulation des questions de suivi.',
      'Garde-fous : vérification des citations, contrôle NLI et refus hors périmètre.',
      'Jeu d’évaluation de 85 questions (73 dans le périmètre, 12 hors périmètre), RAGAS avec qwen2.5:7b comme juge, métriques déterministes, IC bootstrap à 95 % et comparaisons appariées entre versions.',
      'Industrialisation : CI GitHub Actions, image Docker publiée sur GHCR, suivi des expériences avec MLflow, traces avec Langfuse.',
      'Pipeline DPO (TRL, QLoRA) écrit, pas encore évalué.',
    ],
    results: [
      { label: 'evidence_hit', value: '0,973', score: 0.973, note: 'Le bon passage figure dans le contexte récupéré' },
      { label: 'answer_relevancy', value: '0,926', score: 0.926, note: 'RAGAS' },
      { label: 'faithfulness', value: '0,864', score: 0.864, note: 'RAGAS, juge qwen2.5:7b' },
      { label: 'quotes_faithful', value: '1,0', score: 1, note: 'Citations vérifiées mot pour mot' },
      { label: 'false_refusal', value: '0', note: 'Aucun refus à tort dans le périmètre' },
    ],
    limits: [
      'Juge de 7B paramètres : les scores RAGAS restent bruités.',
      'Jeu de test encore petit (85 questions).',
      '4 questions de suivi sur 18 sont mal traitées par la mémoire de conversation.',
      'DPO : résultats non disponibles tant que l’évaluation n’est pas faite.',
    ],
    stack: ['LangChain', 'ChromaDB', 'Ollama', 'Llama 3.1 8B', 'FastAPI', 'RAGAS', 'MLflow', 'Langfuse', 'Docker', 'GitHub Actions', 'TRL', 'QLoRA'],
    repoUrl: 'https://github.com/rayanghomsi10/Assistant-RAG',
    featured: true,
  },
  {
    slug: 'graph-rag-veille',
    title: 'Graph-RAG pour la veille technologique',
    kind: 'Projet d’entreprise, MS SIO CentraleSupélec',
    period: 'Depuis octobre 2026',
    status: 'En cours',
    domain: 'IA générative',
    summary:
      'Preuve de concept de veille et de co-réflexion fondée sur un graphe de connaissances couplé à un LLM, à budget nul.',
    context:
      'Projet mené pour un client industriel dans le cadre du Mastère Spécialisé SIO. Il s’agit de construire une preuve de concept de veille technologique et de co-réflexion fondée sur le Graph-RAG, sans budget d’infrastructure.',
    contributions: ['Projet en cours : le détail sera publié à mesure de l’avancement.'],
    results: [],
    stack: ['Graph-RAG', 'Graphe de connaissances', 'LLM'],
  },
  {
    slug: 'jumeau-numerique-extrudeuse',
    title: 'Jumeau numérique d’une extrudeuse',
    kind: 'Stage de recherche, ICAM Nantes',
    period: 'Sept. 2024 – janv. 2025',
    status: 'Terminé',
    domain: 'Machine Learning',
    summary:
      'Prédiction en temps réel de la qualité d’un produit plastique à partir de 20+ capteurs IoT, pour corriger avant de produire du rebut.',
    context:
      'Une extrudeuse de plastique produit des pièces dont on ne connaissait la qualité qu’après fabrication. Le jumeau numérique prédit les paramètres de qualité (viscosité, résistance, homogénéité) pendant la production.',
    contributions: [
      'Modèles de régression (Random Forest, XGBoost, réseaux de neurones) entraînés sur plus de 10 000 cycles de production.',
      'Pipeline de collecte temps réel (Apache NiFi, PostgreSQL) sur plus de 20 capteurs IoT.',
      'Surveillance continue et alertes déclenchées avant l’apparition des défauts.',
    ],
    results: [
      { label: 'Précision de prédiction', value: '92 %', score: 0.92, note: 'Paramètres de qualité' },
      { label: 'Taux de rebut', value: '−30 %' },
      { label: 'Cycles d’entraînement', value: '10 000+' },
      { label: 'Capteurs suivis', value: '20+' },
    ],
    stack: ['Python', 'Random Forest', 'XGBoost', 'Réseaux de neurones', 'Apache NiFi', 'PostgreSQL'],
  },
  {
    slug: 'churn-telecom',
    title: 'Prédiction du churn télécom',
    kind: 'Projet, UCAC-ICAM',
    period: 'Mars – juin 2025',
    status: 'Terminé',
    domain: 'Machine Learning',
    summary:
      'Data Lake de 5 sources et modèle de churn PySpark, avec pipeline ETL + ML automatisé et réentraînement hebdomadaire.',
    context:
      'Les données client d’un opérateur étaient dispersées entre CRM, logs réseau, facturation, support et usage. Le projet les réunit dans un Data Lake pour prédire les clients susceptibles de partir.',
    contributions: [
      'Data Lake centralisant 5 sources, plus d’1 Go de données par jour ingéré via Apache NiFi et Sqoop vers HDFS.',
      'Modèle de churn en PySpark (Random Forest, Gradient Boosting) sur plus de 10 000 profils clients.',
      'Pipeline ETL + ML orchestré par Airflow : ingestion, transformation Hive, feature engineering, scoring et réentraînement hebdomadaire.',
    ],
    results: [
      { label: 'F1-score', value: '0,87', score: 0.87 },
      { label: 'Temps de traitement', value: '72 h → 12 h' },
      { label: 'Volume ingéré', value: '1 Go+/jour' },
      { label: 'Sources intégrées', value: '5' },
    ],
    stack: ['PySpark', 'Apache NiFi', 'Sqoop', 'HDFS', 'Hive', 'Airflow', 'Random Forest', 'Gradient Boosting'],
  },
  {
    slug: 'tsa-innovlab',
    title: 'TSA InnovLab',
    kind: 'Concours en équipe',
    period: '1ère place',
    status: 'Terminé',
    domain: 'Backend',
    summary:
      'Backend, modélisation des données et intégration d’API d’une plateforme logistique B2B2C de transport en Afrique centrale.',
    context:
      'Concours d’innovation en équipe autour d’une plateforme logistique B2B2C pour le transport en Afrique centrale. L’équipe a remporté la première place.',
    contributions: ['Développement du backend.', 'Modélisation des données.', 'Intégration des API.'],
    results: [{ label: 'Classement', value: '1ère place' }],
    stack: ['Backend', 'Modélisation de données', 'API'],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
