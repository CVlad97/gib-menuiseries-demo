import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="shell pt-12">
      <div className="surface-panel px-6 py-10 text-center sm:px-8">
        <p className="eyebrow">404</p>
        <h1 className="section-title mt-4 text-[var(--text-dark)]">La page demandee n existe pas sur cette demo.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/62">
          Le routeur est volontairement limite au socle demonstrable GitHub Pages : accueil, galerie, produits, simulation et devis.
        </p>
        <Link className="cta-primary mt-6" to="/">
          Revenir a l accueil
        </Link>
      </div>
    </div>
  )
}
