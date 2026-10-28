import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-page flex-col justify-center px-4 sm:px-6">
      <p className="font-mono text-sm text-accent">404 · hors périmètre</p>
      <h1 className="mt-4 font-serif text-6xl md:text-8xl">Aucun passage pertinent.</h1>
      <p className="mt-6 max-w-md text-muted">Comme mon assistant RAG, je préfère refuser plutôt qu’inventer une réponse.</p>
      <Link href="/" className="link mt-8">Retour à l’accueil</Link>
    </div>
  )
}
