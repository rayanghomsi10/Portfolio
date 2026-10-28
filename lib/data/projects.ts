export interface Result {
  label: string
  value: string
  /** Score entre 0 et 1, affiché en barre quand il est fourni */
  score?: number
  note?: string
}

/** Univers visuel : couleur d'accent et motif, définis dans globals.css et components/universe */
export type Universe = 'fragments' | 'mesh' | 'wave' | 'grid' | 'layers' | 'base'

export interface Project {
  slug: string
  universe: Universe
  /** Niveau 1 de lecture : trois phrases en langage clair */
  plain: { problem: string; did: string; result: string }
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
  /** Photos de carnets, croquis, tableaux blancs : fichiers à placer dans public/ */
  media?: { src: string; alt: string; caption: string }[]
}

export const projects: Project[] = [
  {
    slug: 'assistant-rag',
    universe: 'fragments',
    plain: {
      problem: 'La documentation de dbt et d’Airflow est vaste, et les assistants génératifs inventent souvent leurs réponses.',
      did: 'J’ai construit un assistant qui répond en citant les passages exacts, et qui refuse quand la question sort de son périmètre.',
      result: 'Sur 85 questions de test : aucun refus à tort et 100 % de citations vérifiées exactes.',
    },
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
      'Jeu d’évaluation de 85 questions (73 dans le périmètre, 12 hors périmètre), RAGAS avec qwen2.5:7b comme juge, métriques déterministes, IC bootstrap à 95 % et comparaisons appariées entre versions.',
      'Industrialisation : CI GitHub Actions, image Docker publiée sur GHCR, suivi des expériences avec MLflow, traces avec Langfuse.',
      'Pipeline DPO (TRL, QLoRA) écrit, pas encore évalué.',
    ],
    results: [
      { label: 'evidence_hit', value: '0,973', score: 0.973, note: 'Part des questions où le bon passage figure dans le contexte récupéré (85 questions)' },
      { label: 'answer_relevancy', value: '0,926', score: 0.926, note: 'RAGAS, juge qwen2.5:7b, IC bootstrap 95 %' },
      { label: 'faithfulness', value: '0,864', score: 0.864, note: 'RAGAS, juge qwen2.5:7b, IC bootstrap 95 %' },
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
    slug: 'jumeau-numerique-extrudeuse',
    universe: 'grid',
    plain: {
      problem: 'Sur une extrudeuse de plastique, la qualité d’une pièce n’était connue qu’après sa fabrication.',
      did: 'J’ai développé un jumeau numérique qui prédit la qualité en temps réel à partir de plus de 20 capteurs.',
      result: 'Taux de rebut réduit de 30 %, avec 92 % de précision de prédiction.',
    },
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
      { label: 'Précision de prédiction', value: '92 %', score: 0.92, note: 'Paramètres de qualité' },
      { label: 'Taux de rebut', value: '−30 %' },
      { label: 'Cycles d’entraînement', value: '10 000+' },
      { label: 'Capteurs suivis', value: '20+' },
    ],
    stack: ['Python', 'Random Forest', 'XGBoost', 'Réseaux de neurones', 'Apache NiFi', 'PostgreSQL'],
  },
  {
    slug: 'dbt-orange',
    universe: 'layers',
    plain: {
      problem: 'Le Data Lake d’un opérateur télécom transformait ses données avec un ordonnanceur maison, sans tests, sans documentation formelle et sans traçabilité des dépendances entre tables.',
      did: 'J’ai inventorié l’existant, puis migré deux pipelines de production vers dbt, testés et orchestrés par Airflow, sur des serveurs sans accès Internet.',
      result: '22 modèles migrés, 6 tests sur 6 réussis sur les données de production, et 75,9 % des configurations identifiées comme migrables.',
    },
    title: 'Migration vers dbt',
    kind: 'Stage de fin d’études, Orange Cameroun · Data & IA',
    period: 'Janv. – juin 2026',
    status: 'Terminé',
    domain: 'Data Engineering',
    summary:
      'Remplacer la couche de transformation d’un Data Lake télécom par dbt : inventaire de l’existant, migration de deux pipelines de production, tests et orchestration Airflow.',
    context:
      'Le Data Lake d’Orange Cameroun repose sur un cluster Hadoop HDP de 25 nœuds qui exécute plus de 800 jobs par jour sur plus de 2 500 tables Hive. Les transformations passaient par un ordonnanceur maison écrit en Scala, sans tests automatisés ni lineage. La mission : démontrer que dbt peut le remplacer pour les transformations SQL, dans une trajectoire vers un Modern Data Stack (Dataiku, Starburst, CDP).',
    contributions: [
      'Inventaire par reverse engineering sur HDFS : 1 966 fichiers de configuration actifs, 947 tables et 4 330 scripts HQL ; 75,9 % des fichiers relèvent de transformations SQL pures, migrables vers dbt.',
      'Preuve de concept sur deux pipelines de production : Souscriptions (10 modèles) et SMS Usage (12 modèles), organisés en trois couches (IT, intermediate, mart).',
      'Tests dbt (not_null, unique, accepted_values, relationships et tests métier) : les premières règles de qualité formalisées et reproductibles sur ces données.',
      'Orchestration Airflow avec astronomer-cosmos : un groupe de tâches par couche, chacun avec son profil de ressources Spark, et renouvellement du ticket Kerberos ; code versionné sur Azure DevOps.',
      'Installation hors ligne sur des serveurs RHEL isolés d’Internet : paquets préparés sur un poste connecté puis transférés par SFTP, versions de dbt choisies pour rester compatibles avec Spark 2.3.2.',
      'Benchmark sur sept dimensions (maintenabilité, testabilité, observabilité, lineage, time-to-insight, versioning, onboarding).',
      'Autres travaux du stage : pipeline Airbyte + Airflow vers ClickHouse et suivi automatisé des transactions AFD (Bash, Hive SQL, Python) avec rapports HTML par e-mail.',
    ],
    results: [
      { label: 'Modèles migrés', value: '22', note: 'Souscriptions (10) et SMS Usage (12), sur données de production' },
      { label: 'Tests dbt', value: '6 / 6', note: 'Tous réussis sur données de production ; couverture de 0,27 test par modèle, à étendre' },
      { label: 'Configurations migrables', value: '75,9 %', note: 'Soit environ 1 493 fichiers sur 1 966, d’après l’inventaire' },
      { label: 'Benchmark dbt', value: '4,6 / 5', note: 'Contre 1,4 / 5 pour l’existant ; auto-évaluation qualitative sur 7 dimensions, validée chaque semaine avec le référent' },
    ],
    limits: [
      'Couverture de tests encore faible : 6 tests pour 22 modèles.',
      'Benchmark qualitatif, auto-évalué : une comparaison structurée, pas une mesure absolue.',
      'dbt hébergé sur un serveur sans engagement de niveau de service ; à réévaluer pour la production.',
      'La migration complète (environ 1 493 fichiers) reste à conduire, estimée à 12 à 18 mois.',
    ],
    stack: ['dbt-core', 'dbt-spark', 'Apache Airflow', 'astronomer-cosmos', 'Hive', 'Spark', 'Hadoop HDP', 'Kerberos', 'Azure DevOps', 'RHEL'],
  },
  {
    slug: 'colorfol-backend',
    universe: 'wave',
    plain: {
      problem: 'Colorfol, plateforme de streaming musical, vend aussi des billets de concert et récompense certains achats par des bonus.',
      did: 'J’ai développé la billetterie, le système de bonus et l’envoi des billets par e-mail, ainsi que des routes de l’API Django.',
      result: 'Un an de développement à temps partiel, mené en parallèle de mes études.',
    },
    title: 'Billetterie et bonus de Colorfol',
    kind: 'Freelance, temps partiel',
    period: 'Mai 2025 – avr. 2026',
    status: 'Terminé',
    domain: 'Backend',
    summary: 'Sur l’API Django d’une plateforme de streaming musical : la billetterie, les bonus liés aux achats et l’envoi des billets par e-mail.',
    context:
      'Colorfol est une plateforme de streaming musical basée à Douala, dont l’API est écrite en Django. J’y ai travaillé à temps partiel, en parallèle de mes études, sur la billetterie, les bonus et l’envoi des billets.',
    contributions: [
      'Billetterie : événements, catégories de billets et billets avec code QR ; à l’entrée, un contrôleur affecté à l’événement scanne le billet, qui ne peut être validé qu’une fois.',
      'Billets nominatifs : l’acheteur nomme une personne par billet, joignable par e-mail ou par téléphone, sans qu’elle ait besoin d’un compte.',
      'Bonus : un achat (album, single ou billet) peut débloquer un bonus ; l’attribution se fait dans une transaction verrouillée pour éviter les doublons quand le paiement est notifié deux fois, et les bonus expirent automatiquement.',
      'Envoi des billets : tâches Celery avec reprises automatiques, billet rendu en PDF à partir d’un gabarit HTML par un service Chromium, puis joint à l’e-mail ; si le rendu échoue, un PDF simple part quand même.',
      'Mise en place de routes de l’API REST (Django REST Framework).',
    ],
    results: [],
    stack: ['Django', 'Django REST Framework', 'Celery', 'MySQL', 'Chromium (rendu PDF)', 'QR codes'],
  },
  {
    slug: 'graph-rag-veille',
    universe: 'mesh',
    plain: {
      problem: 'Un client industriel cherche un outil de veille technologique et de co-réflexion, sans budget d’infrastructure.',
      did: 'Une preuve de concept fondée sur un graphe de connaissances couplé à un LLM (Graph-RAG), dans le cadre du MS SIO.',
      result: 'Projet en cours. Les résultats sont confidentiels et ne seront pas publiés ici.',
    },
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
    slug: 'churn-telecom',
    universe: 'base',
    plain: {
      problem: 'Les données client d’un opérateur télécom étaient dispersées entre cinq systèmes.',
      did: 'Un Data Lake qui les réunit, et un modèle PySpark qui repère les clients susceptibles de partir.',
      result: 'F1-score de 0,87, et un traitement ramené de 72 h à 12 h.',
    },
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
    universe: 'base',
    plain: {
      problem: 'Concevoir en équipe une plateforme logistique B2B2C pour le transport en Afrique centrale.',
      did: 'J’ai pris en charge le backend, la modélisation des données et l’intégration des API.',
      result: 'Première place du concours.',
    },
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
