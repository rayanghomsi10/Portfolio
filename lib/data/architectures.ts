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

  'dbt-orange': {
    title: 'Trois couches, testées et orchestrées',
    caption: 'Les données collectées arrivent dans le Data Lake. dbt les transforme en trois couches, chaque modèle étant défini, testé et versionné dans Git ; Airflow, via Cosmos, exécute un groupe de tâches par couche après le renouvellement du ticket Kerberos.',
    nodes: [
      { id: 'src', label: 'Collecte NiFi', sub: 'sources opérationnelles', x: 20, y: 150, w: 158 },
      { id: 'hdfs', label: 'HDFS · Hive', sub: 'Data Lake', x: 202, y: 150, w: 128 },
      { id: 'kinit', label: 'kinit Kerberos', sub: 'ticket renouvelé', x: 370, y: 50, w: 150 },
      { id: 'repo', label: 'Azure DevOps', sub: 'code dbt versionné', x: 690, y: 50, w: 150 },
      { id: 'it', label: 'Couche IT', sub: 'proche de la source', x: 370, y: 150, w: 140 },
      { id: 'inter', label: 'Intermediate', sub: 'calculs', x: 535, y: 150, w: 140 },
      { id: 'mart', label: 'Mart', sub: 'tables de faits', x: 700, y: 150, w: 140, key: true },
      { id: 'tests', label: 'Tests dbt', sub: '6 / 6 réussis', x: 535, y: 262, w: 170 },
      { id: 'bi', label: 'Rapports BI', x: 875, y: 150, w: 110 },
    ],
    frames: [{ id: 'af', label: 'Orchestré par Airflow + Cosmos · un groupe de tâches par couche', x: 350, y: 20, w: 505, h: 325 }],
    edges: [['src', 'hdfs'], ['hdfs', 'it'], ['kinit', 'it'], ['it', 'inter'], ['inter', 'mart'], ['mart', 'bi'], ['inter', 'tests']],
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
}
