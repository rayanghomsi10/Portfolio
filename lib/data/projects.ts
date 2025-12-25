export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: 'nlp' | 'cv' | 'ml' | 'data' | 'llm' | 'bigdata'
  technologies: string[]
  metrics: {
    name: string
    value: number
    unit: string
  }[]
  features: string[]
  demoType: 'image' | 'text' | 'chart' | 'none'
  githubUrl?: string
  liveUrl?: string
  image: string
  color: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'telecom-churn-prediction',
    title: 'Prédiction du Churn Télécom',
    description: 'Data Lake end-to-end pour prédire le churn client avec pipeline Big Data complet',
    longDescription: 'Architecture et déploiement d\'un Data Lake télécom centralisant 5 sources de données (CRM, logs réseau, facturation, support, usage) et traitant +1 Go de données/jour. Modèle de prédiction du churn identifiant 85% des clients à risque avec 3 semaines d\'anticipation.',
    category: 'bigdata',
    technologies: ['PySpark', 'Apache NiFi', 'Airflow', 'HDFS', 'Hive', 'Sqoop', 'Random Forest', 'Gradient Boosting'],
    metrics: [
      { name: 'F1-Score', value: 87, unit: '%' },
      { name: 'Détection risque', value: 85, unit: '%' },
      { name: 'Réduction temps', value: 98.6, unit: '%' },
    ],
    features: [
      'Centralisation de 5 sources de données hétérogènes',
      'Traitement de +1 Go de données/jour',
      'Pipeline ETL + ML automatisé avec Airflow',
      'Ré-entraînement hebdomadaire automatique',
      'Réduction du temps de traitement de 72h à 1h',
      'Anticipation du churn à 3 semaines',
    ],
    demoType: 'chart',
    githubUrl: 'https://github.com/Yansoki',
    image: '/projects/churn.png',
    color: '#00d4ff',
  },
  {
    id: '2',
    slug: 'digital-twin-extruder',
    title: 'Jumeau Numérique Extrudeuse',
    description: 'Prédiction en temps réel de la qualité de production industrielle avec IoT',
    longDescription: 'Développement d\'un jumeau numérique d\'une extrudeuse de plastique pour prédire la qualité du produit final en temps réel. Système permettant d\'anticiper les défauts de fabrication avant la production, réduisant le taux de rebut de 30%.',
    category: 'ml',
    technologies: ['Python', 'Random Forest', 'XGBoost', 'Réseaux de neurones', 'Apache NiFi', 'PostgreSQL', 'IoT'],
    metrics: [
      { name: 'Précision', value: 92, unit: '%' },
      { name: 'Réduction rebut', value: 30, unit: '%' },
      { name: 'Capteurs IoT', value: 20, unit: '+' },
    ],
    features: [
      'Prédiction temps réel de la qualité produit',
      'Modèles de régression avancés (RF, XGBoost, NN)',
      'Entraînement sur 10 000+ cycles de production',
      'Pipeline de données automatisé',
      'Surveillance continue de 20+ capteurs IoT',
      'Système d\'alertes proactives',
    ],
    demoType: 'chart',
    githubUrl: 'https://github.com/Yansoki',
    image: '/projects/digital-twin.png',
    color: '#8b5cf6',
  },
  {
    id: '3',
    slug: 'data-pipeline-automation',
    title: 'Pipeline ETL Automatisé',
    description: 'Orchestration de flux de données avec Airflow et Apache NiFi',
    longDescription: 'Conception et automatisation de pipelines ETL complets pour l\'ingestion, la transformation et le chargement de données massives. Intégration de multiples sources vers un Data Lake avec monitoring et alerting.',
    category: 'data',
    technologies: ['Apache Airflow', 'Apache NiFi', 'HDFS', 'Hive', 'Python', 'Superset'],
    metrics: [
      { name: 'Automatisation', value: 100, unit: '%' },
      { name: 'Temps gagné', value: 71, unit: 'h' },
      { name: 'Sources intégrées', value: 5, unit: '' },
    ],
    features: [
      'Orchestration avec Apache Airflow',
      'Ingestion temps réel avec NiFi',
      'Transformation et feature engineering',
      'Stockage distribué HDFS',
      'Visualisation avec Superset',
      'Monitoring et alerting',
    ],
    demoType: 'chart',
    githubUrl: 'https://github.com/Yansoki',
    image: '/projects/pipeline.png',
    color: '#22c55e',
  },
  {
    id: '4',
    slug: 'predictive-maintenance',
    title: 'Maintenance Prédictive IoT',
    description: 'Système de prédiction de pannes basé sur les données capteurs',
    longDescription: 'Développement d\'un système de maintenance prédictive utilisant les données de capteurs IoT pour anticiper les pannes et optimiser les interventions de maintenance.',
    category: 'ml',
    technologies: ['Python', 'TensorFlow', 'Keras', 'PostgreSQL', 'Apache NiFi', 'Scikit-learn'],
    metrics: [
      { name: 'Précision', value: 89, unit: '%' },
      { name: 'Anticipation', value: 48, unit: 'h' },
      { name: 'Réduction coûts', value: 25, unit: '%' },
    ],
    features: [
      'Analyse de séries temporelles',
      'Détection d\'anomalies',
      'Prédiction de durée de vie',
      'Dashboard temps réel',
      'Alertes automatiques',
      'Optimisation des interventions',
    ],
    demoType: 'chart',
    githubUrl: 'https://github.com/Yansoki',
    image: '/projects/maintenance.png',
    color: '#f59e0b',
  },
  {
    id: '5',
    slug: 'ml-classification-models',
    title: 'Modèles de Classification ML',
    description: 'Ensemble de modèles de Machine Learning pour la classification et régression',
    longDescription: 'Développement et optimisation de modèles de Machine Learning pour diverses tâches de classification et régression. Comparaison de performances entre Random Forest, XGBoost, et réseaux de neurones.',
    category: 'ml',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Random Forest', 'PyTorch', 'Pandas', 'NumPy'],
    metrics: [
      { name: 'Accuracy', value: 94, unit: '%' },
      { name: 'F1-Score', value: 91, unit: '%' },
      { name: 'Modèles', value: 5, unit: '+' },
    ],
    features: [
      'Prétraitement et feature engineering',
      'Cross-validation et hyperparameter tuning',
      'Comparaison de modèles',
      'Interprétabilité (SHAP, LIME)',
      'Pipeline de déploiement',
      'Documentation complète',
    ],
    demoType: 'text',
    githubUrl: 'https://github.com/Yansoki',
    image: '/projects/ml-models.png',
    color: '#d946ef',
  },
  {
    id: '6',
    slug: 'data-visualization-dashboard',
    title: 'Dashboard Analytics',
    description: 'Tableaux de bord interactifs avec Power BI et Superset',
    longDescription: 'Création de dashboards interactifs pour la visualisation de données métier. Intégration de multiples sources de données et création de KPIs pertinents pour le suivi de performance.',
    category: 'data',
    technologies: ['Power BI', 'Apache Superset', 'Tableau', 'Plotly', 'Python', 'SQL'],
    metrics: [
      { name: 'KPIs', value: 15, unit: '+' },
      { name: 'Sources', value: 4, unit: '' },
      { name: 'Utilisateurs', value: 50, unit: '+' },
    ],
    features: [
      'Dashboards interactifs',
      'Visualisations personnalisées',
      'Rafraîchissement automatique',
      'Filtres dynamiques',
      'Export de rapports',
      'Accès multi-utilisateurs',
    ],
    demoType: 'chart',
    githubUrl: 'https://github.com/Yansoki',
    image: '/projects/dashboard.png',
    color: '#ef4444',
  },
]

export const categories = [
  { id: 'all', label: 'Tous', color: '#ffffff' },
  { id: 'bigdata', label: 'Big Data', color: '#00d4ff' },
  { id: 'ml', label: 'Machine Learning', color: '#8b5cf6' },
  { id: 'data', label: 'Data Engineering', color: '#22c55e' },
  { id: 'nlp', label: 'NLP', color: '#f59e0b' },
  { id: 'llm', label: 'LLM / GenAI', color: '#d946ef' },
]
