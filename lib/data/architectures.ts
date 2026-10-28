// Planches techniques : l'architecture réelle de chaque projet, telle que décrite sur ce site.
// Coordonnées dans un repère de 1000 × 360. Rien n'est ajouté au-delà des faits documentés.

export interface ArchNode {
  id: string
  label: string
  sub?: string
  x: number
  y: number
  w: number
  h?: number
  /** Nœud mis en avant (bordure et fond dans la couleur de l'univers) */
  key?: boolean
}

export interface ArchFrame {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
}

export interface Architecture {
  title: string
  caption: string
  nodes: ArchNode[]
  frames?: ArchFrame[]
  edges: [string, string][]
}

export const architectures: Record<string, Architecture> = {
  'jumeau-numerique-extrudeuse': {
    title: 'Du capteur à l’alerte',
    caption: 'Les mesures des capteurs sont collectées en temps réel, stockées, puis passées aux modèles qui prédisent la qualité avant la fin de la production.',
    nodes: [
      { id: 's', label: 'Capteurs IoT', sub: '20+ capteurs', x: 20, y: 150, w: 150 },
      { id: 'n', label: 'Apache NiFi', sub: 'collecte temps réel', x: 215, y: 150, w: 150 },
      { id: 'p', label: 'PostgreSQL', sub: 'stockage', x: 410, y: 150, w: 150 },
      { id: 'm', label: 'Modèles de régression', sub: 'RF · XGBoost · réseaux de neurones', x: 605, y: 150, w: 190, key: true },
      { id: 'q', label: 'Qualité prédite', sub: 'viscosité · résistance · homogénéité', x: 830, y: 55, w: 160 },
      { id: 'a', label: 'Alertes', sub: 'avant le défaut', x: 830, y: 245, w: 160 },
    ],
    edges: [['s', 'n'], ['n', 'p'], ['p', 'm'], ['m', 'q'], ['m', 'a']],
  },

  'churn-telecom': {
    title: 'Cinq sources, un score',
    caption: 'Cinq sources réunies dans un Data Lake, transformées dans Hive, puis notées par un modèle PySpark. Airflow orchestre tout et réentraîne le modèle chaque semaine.',
    nodes: [
      { id: 'crm', label: 'CRM', x: 20, y: 20, w: 120, h: 46 },
      { id: 'logs', label: 'Logs réseau', x: 20, y: 87, w: 120, h: 46 },
      { id: 'fact', label: 'Facturation', x: 20, y: 154, w: 120, h: 46 },
      { id: 'sup', label: 'Support', x: 20, y: 221, w: 120, h: 46 },
      { id: 'usage', label: 'Usage', x: 20, y: 288, w: 120, h: 46 },
      { id: 'ing', label: 'NiFi + Sqoop', sub: '1 Go+ / jour', x: 200, y: 150, w: 130 },
      { id: 'hdfs', label: 'HDFS', sub: 'Data Lake', x: 365, y: 150, w: 120 },
      { id: 'hive', label: 'Hive', sub: 'transformation · features', x: 520, y: 150, w: 135 },
      { id: 'model', label: 'PySpark', sub: 'RF · Gradient Boosting', x: 690, y: 150, w: 135, key: true },
      { id: 'score', label: 'Scoring', sub: 'F1 0,87', x: 860, y: 150, w: 120 },
    ],
    frames: [{ id: 'airflow', label: 'Orchestré par Airflow · réentraînement hebdomadaire', x: 185, y: 110, w: 810, h: 140 }],
    edges: [['crm', 'ing'], ['logs', 'ing'], ['fact', 'ing'], ['sup', 'ing'], ['usage', 'ing'], ['ing', 'hdfs'], ['hdfs', 'hive'], ['hive', 'model'], ['model', 'score']],
  },

  'colorfol-backend': {
    title: 'Du paiement au billet dans la boîte mail',
    caption: 'Quand un achat est payé, l’API attribue les bonus éventuels et confie l’envoi à Celery : le billet est rendu en PDF par un service Chromium, puis joint à l’e-mail. À l’entrée, chaque billet ne se scanne qu’une fois.',
    nodes: [
      { id: 'pay', label: 'Achat payé', sub: 'billet, album ou single', x: 20, y: 150, w: 165 },
      { id: 'api', label: 'API Django', sub: 'billet passé à « payé »', x: 220, y: 150, w: 170, key: true },
      { id: 'bonus', label: 'Bonus', sub: 'attribution sans doublon', x: 425, y: 40, w: 170 },
      { id: 'celery', label: 'Celery', sub: 'tâche avec reprises', x: 425, y: 150, w: 170 },
      { id: 'scan', label: 'Scan à l’entrée', sub: 'une seule fois par billet', x: 425, y: 262, w: 170 },
      { id: 'pdf', label: 'Rendu PDF', sub: 'Chromium · QR intégré', x: 640, y: 150, w: 160 },
      { id: 'mail', label: 'E-mail', sub: 'billet en PDF', x: 845, y: 150, w: 135 },
    ],
    edges: [['pay', 'api'], ['api', 'bonus'], ['api', 'celery'], ['api', 'scan'], ['celery', 'pdf'], ['pdf', 'mail']],
  },

  'graph-rag-veille': {
    title: 'Le principe du Graph-RAG',
    caption: 'Principe général de la méthode, pas l’architecture du projet : celle-ci, comme les données du client, reste confidentielle.',
    nodes: [
      { id: 'src', label: 'Sources', sub: 'documents de veille', x: 20, y: 200, w: 135 },
      { id: 'ext', label: 'Extraction', sub: 'entités · relations', x: 181, y: 200, w: 135 },
      { id: 'kg', label: 'Graphe', sub: 'de connaissances', x: 342, y: 200, w: 135, key: true },
      { id: 'q', label: 'Question', x: 503, y: 40, w: 135, h: 46 },
      { id: 'ret', label: 'Récupération', sub: 'sous-graphe utile', x: 503, y: 200, w: 135 },
      { id: 'llm', label: 'LLM', sub: 'génération', x: 664, y: 200, w: 135 },
      { id: 'out', label: 'Synthèse', sub: 'reliée à ses sources', x: 825, y: 200, w: 155 },
    ],
    edges: [['src', 'ext'], ['ext', 'kg'], ['kg', 'ret'], ['q', 'ret'], ['ret', 'llm'], ['llm', 'out']],
  },

  orange: {
    title: 'Orange Data AI Factory',
    caption: 'Deux chantiers sur des serveurs sans accès Internet : la modernisation ELT du Data Lake, et le suivi automatisé des transactions AFD.',
    nodes: [
      { id: 'src', label: 'Sources', x: 40, y: 85, w: 140 },
      { id: 'ab', label: 'Airbyte', sub: 'ingestion', x: 245, y: 85, w: 150 },
      { id: 'ch', label: 'ClickHouse', sub: 'entrepôt', x: 470, y: 85, w: 160, key: true },
      { id: 'dbt', label: 'DBT', sub: 'déployé hors ligne', x: 705, y: 85, w: 130 },
      { id: 'poc', label: 'POC', sub: 'NiFi · Airbyte · DBT', x: 845, y: 85, w: 135 },
      { id: 'afd', label: 'Transactions AFD', x: 40, y: 245, w: 160 },
      { id: 'scr', label: 'Bash · Hive SQL · Python', sub: 'suivi automatisé', x: 245, y: 245, w: 230 },
      { id: 'rep', label: 'Rapports HTML', sub: 'visualisations · e-mail', x: 530, y: 245, w: 200 },
    ],
    frames: [
      { id: 'rhel', label: 'Serveurs RHEL sans accès Internet', x: 10, y: 14, w: 980, h: 336 },
      { id: 'af', label: 'Orchestré par Airflow', x: 225, y: 50, w: 425, h: 120 },
    ],
    edges: [['src', 'ab'], ['ab', 'ch'], ['afd', 'scr'], ['scr', 'rep']],
  },
}
