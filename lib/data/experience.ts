export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  type: 'work' | 'education'
  description: string
  achievements: string[]
  technologies: string[]
  metrics?: {
    label: string
    before?: number
    after: number
    unit: string
  }[]
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Data Engineer / Data Scientist',
    company: 'UCAC-ICAM Yansoki',
    location: 'Douala, Cameroun',
    period: 'Mars 2025 - Juin 2025',
    type: 'work',
    description: 'Architecture et déploiement d\'un Data Lake télécom end-to-end pour prédire le churn client, avec automatisation complète du pipeline ETL + ML.',
    achievements: [
      'Architecturé un Data Lake centralisant 5 sources de données (CRM, logs réseau, facturation, support, usage)',
      'Traitement de +1 Go de données/jour via Apache NiFi et Sqoop vers HDFS',
      'Développé un modèle de prédiction du churn (Random Forest, Gradient Boosting) avec F1 score de 0.87',
      'Identification de 85% des clients à risque avec 3 semaines d\'anticipation',
      'Automatisé le pipeline ETL + ML avec Airflow (ingestion, transformation Hive, feature engineering, scoring)',
      'Réduction du temps de traitement de 72 heures à 1 heure',
    ],
    technologies: ['PySpark', 'Apache NiFi', 'Airflow', 'HDFS', 'Hive', 'Sqoop', 'Random Forest', 'Gradient Boosting'],
    metrics: [
      { label: 'F1-Score', after: 87, unit: '%' },
      { label: 'Temps traitement', before: 72, after: 1, unit: 'h' },
      { label: 'Détection risque', after: 85, unit: '%' },
    ],
  },
  {
    id: '2',
    title: 'Chercheur Data Science',
    company: 'ICAM Nantes',
    location: 'Nantes, France',
    period: 'Septembre 2024 - Janvier 2025',
    type: 'work',
    description: 'Développement d\'un jumeau numérique d\'une extrudeuse de plastique pour prédire la qualité du produit final en temps réel.',
    achievements: [
      'Développé un jumeau numérique permettant d\'anticiper les défauts de fabrication avant la production',
      'Réduction du taux de rebut de 30%',
      'Conçu et entraîné des modèles de régression avancés (Random Forest, XGBoost, réseaux de neurones)',
      'Précision de prédiction de 92% sur les paramètres de qualité (viscosité, résistance, homogénéité)',
      'Déployé un pipeline de données automatisé pour la collecte temps réel de 20+ capteurs IoT',
      'Mise en place d\'une surveillance continue et d\'alertes proactives',
    ],
    technologies: ['Python', 'Random Forest', 'XGBoost', 'Réseaux de neurones', 'Apache NiFi', 'PostgreSQL', 'IoT'],
    metrics: [
      { label: 'Précision', after: 92, unit: '%' },
      { label: 'Réduction rebut', after: 30, unit: '%' },
      { label: 'Capteurs IoT', after: 20, unit: '+' },
    ],
  },
  {
    id: '3',
    title: 'Développeur Full Stack',
    company: 'Digital Experience',
    location: 'Akwa, Douala',
    period: 'Janvier 2024 - Avril 2024',
    type: 'work',
    description: 'Conception et développement d\'une plateforme de gestion de cantine d\'entreprise avec système de réservation en ligne.',
    achievements: [
      'Réalisé une plateforme complète de gestion de cantine pour entreprise',
      'Développé un système de réservation en ligne pour les repas avec gestion des créneaux',
      'Optimisé les performances pour gérer un grand nombre de commandes simultanées',
      'Collaboré avec l\'équipe marketing pour la promotion de la plateforme',
      'Formé les utilisateurs finaux pour assurer une adoption efficace',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
    metrics: [
      { label: 'Utilisateurs formés', after: 50, unit: '+' },
    ],
  },
  {
    id: '4',
    title: 'Développeur Web Junior',
    company: 'Lab2view',
    location: 'Bonamoussadi, Douala',
    period: 'Mai 2023 - Juin 2023',
    type: 'work',
    description: 'Conception et réalisation d\'une plateforme E-commerce complète avec système de paiement sécurisé.',
    achievements: [
      'Conçu et développé une plateforme E-commerce de A à Z',
      'Intégré un système de paiement en ligne sécurisé (Mobile Money, cartes bancaires)',
      'Optimisé les performances du site pour une expérience utilisateur fluide',
      'Mis en place un CMS pour faciliter la gestion et mise à jour du contenu',
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML/CSS', 'API Paiement'],
  },
  {
    id: '5',
    title: 'Ingénierie Informatique - Data Science',
    company: 'Institut UCAC-ICAM Yansoki',
    location: 'Douala, Cameroun',
    period: 'Septembre 2021 - Présent',
    type: 'education',
    description: 'Formation d\'ingénieur avec spécialisation en Data Science, Machine Learning et Big Data.',
    achievements: [
      'Spécialisation en Intelligence Artificielle et Data Engineering',
      'Projets pratiques en Machine Learning et Deep Learning',
      'Formation aux technologies Big Data (Hadoop, Spark, Airflow)',
      'Développement de compétences en Python, SQL et visualisation de données',
      'Mobilité internationale à l\'ICAM Nantes (France)',
    ],
    technologies: ['Python', 'PySpark', 'TensorFlow', 'Keras', 'PyTorch', 'SQL', 'Hadoop', 'Airflow'],
  },
  {
    id: '6',
    title: 'Baccalauréat Scientifique (C)',
    company: 'Collège Les Lauréats Bonamoussadi',
    location: 'Douala, Cameroun',
    period: 'Septembre 2012 - Juin 2020',
    type: 'education',
    description: 'Baccalauréat série C (Mathématiques et Sciences Physiques).',
    achievements: [
      'Formation solide en mathématiques et sciences',
      'Développement de la pensée analytique',
      'Base pour les études d\'ingénieur',
    ],
    technologies: ['Mathématiques', 'Physique', 'Informatique'],
  },
]

export const certifications = [
  { name: 'Introduction to Data Science', issuer: 'Cisco', year: '2024' },
  { name: 'Data Science Orientation', issuer: 'Coursera', year: '2024' },
  { name: 'Data Engineering Essentials', issuer: 'Coursera', year: '2024' },
  { name: 'Développement Web', issuer: 'Udemy', year: '2023' },
]
