export const profile = {
  name: 'Rayan Gabriel Ghomsi Talla',
  title: 'Data Scientist',
  focus: 'Machine Learning · IA générative · Évaluation de modèles',
  pitch:
    'Je construis des modèles et des systèmes RAG, puis je mesure s’ils tiennent leurs promesses : jeux d’évaluation, intervalles de confiance, garde-fous. Avant ça, j’ai construit les pipelines de données qui les alimentent, de NiFi à DBT.',
  availability: 'Stage de 6 mois en IA / Data Science à partir d’avril 2027',
  location: 'Les Ulis (91), plateau de Paris-Saclay',
  email: 'rayanghomsi10@gmail.com',
  phone: '07 59 26 22 72',
  github: 'https://github.com/rayanghomsi10',
  githubHandle: 'rayanghomsi10',
  linkedin: 'https://www.linkedin.com/in/rayan-ghomsi-talla',
  linkedinHandle: 'rayan-ghomsi-talla',
}

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  points: string[]
  stack: string[]
  projectSlug?: string
}

export const experiences: Experience[] = [
  {
    title: 'Data Engineer stagiaire',
    company: 'Orange Cameroun, Data AI Factory',
    location: 'Douala',
    period: 'Janv. – juin 2026',
    points: [
      'Modernisation du Data Lake : déploiement de DBT et Airbyte sur des serveurs RHEL sans accès Internet.',
      'Suivi automatisé des transactions AFD (Bash, Hive SQL, Python) avec visualisations et rapports HTML envoyés par e-mail.',
      'Pipeline Airbyte + Airflow vers un entrepôt ClickHouse.',
      'Benchmark (POC) NiFi, Airbyte et DBT pour choisir l’architecture ELT cible.',
    ],
    stack: ['DBT', 'Airbyte', 'Airflow', 'ClickHouse', 'Hive', 'Bash', 'Python', 'RHEL'],
  },
  {
    title: 'Développeur backend freelance (temps partiel)',
    company: 'Colorfol, streaming musical',
    location: 'Douala',
    period: 'Mai 2025 – avr. 2026',
    points: [
      'Responsable de l’ensemble du backend de la plateforme.',
      'API REST Django pour le streaming, les playlists et la recommandation musicale.',
      'Bases PostgreSQL et MongoDB.',
    ],
    stack: ['Django', 'PostgreSQL', 'MongoDB'],
    projectSlug: 'colorfol-backend',
  },
  {
    title: 'Data Engineer / Data Scientist',
    company: 'UCAC-ICAM Yansoki',
    location: 'Douala',
    period: 'Mars – juin 2025',
    points: [
      'Data Lake télécom de 5 sources, plus d’1 Go par jour via NiFi et Sqoop vers HDFS.',
      'Modèle de churn PySpark sur 10 000+ profils, F1-score de 0,87.',
      'Pipeline ETL + ML sous Airflow avec réentraînement hebdomadaire ; traitement ramené de 72 h à 12 h.',
    ],
    stack: ['PySpark', 'NiFi', 'Airflow', 'HDFS', 'Hive'],
    projectSlug: 'churn-telecom',
  },
  {
    title: 'Chercheur Data Science (stage de recherche, 5 mois)',
    company: 'ICAM Nantes',
    location: 'Nantes',
    period: 'Sept. 2024 – janv. 2025',
    points: [
      'Jumeau numérique d’une extrudeuse prédisant la qualité du produit en temps réel ; taux de rebut −30 %.',
      'Régression sur 10 000+ cycles de production, 92 % de précision.',
      'Pipeline NiFi + PostgreSQL sur 20+ capteurs IoT avec alertes.',
    ],
    stack: ['Python', 'XGBoost', 'Random Forest', 'NiFi', 'PostgreSQL'],
    projectSlug: 'jumeau-numerique-extrudeuse',
  },
]

export const earlierExperiences = [
  { title: 'Développeur Full Stack', company: 'Digital Experience', period: 'Janv. – avr. 2024', stack: 'Laravel, MySQL' },
  { title: 'Développeur web junior', company: 'Lab2view', period: 'Mai – juin 2023', stack: 'Laravel, MySQL' },
]

export const education = [
  {
    degree: 'Mastère Spécialisé Ingénierie des Systèmes Intelligents Ouverts (MS SIO)',
    school: 'CentraleSupélec',
    location: 'Gif-sur-Yvette / Palaiseau',
    period: 'Depuis sept. 2026',
  },
  {
    degree: 'Diplôme d’ingénieur, spécialité Data Science (accrédité CTI)',
    school: 'UCAC-ICAM',
    location: 'Douala',
    period: '2021 – 2026',
  },
]

export const skillGroups = [
  { label: 'Machine Learning / Deep Learning', items: ['Scikit-learn', 'XGBoost', 'TensorFlow', 'Keras', 'PyTorch', 'Dataiku'] },
  { label: 'Statistiques', items: ['Régression', 'IC par bootstrap', 'Comparaisons appariées'] },
  { label: 'IA générative', items: ['RAG / Graph-RAG', 'LangChain', 'ChromaDB', 'RAGAS', 'Ollama', 'DPO (TRL, QLoRA)', 'n8n multi-agents'] },
  { label: 'Big Data & ETL', items: ['Apache NiFi', 'Airflow', 'PySpark', 'Hadoop', 'DBT', 'Airbyte', 'ClickHouse'] },
  { label: 'MLOps & DevOps', items: ['MLflow', 'Docker', 'GitHub Actions', 'Git', 'Linux RHEL', 'Kerberos'] },
  { label: 'Langages', items: ['Python', 'SQL', 'Bash', 'JavaScript', 'PHP'] },
  { label: 'Bases de données', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Hive', 'Elasticsearch'] },
  { label: 'BI & visualisation', items: ['Power BI', 'Tableau', 'Plotly', 'Superset'] },
  { label: 'Web & API', items: ['FastAPI', 'Django', 'NestJS', 'Laravel'] },
]

export const certifications = [
  { name: 'Data Engineering Essentials', issuer: 'Coursera' },
  { name: 'Développement Web', issuer: 'Udemy' },
]

export const languages = [
  { name: 'Français', level: 'Langue maternelle' },
  { name: 'Anglais', level: 'TOEIC B2' },
]
