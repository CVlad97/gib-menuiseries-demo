import { CircleFadingArrowUp, Globe, Mail, MapPin, MessageCircle, Phone, PlayCircle } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { company } from '../lib/content'

const navItems = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/galerie', label: 'Galerie' },
  { to: '/produits', label: 'Produits' },
  { to: '/simulation', label: 'Simulation' },
  { to: '/devis', label: 'Devis' },
  { to: '/admin', label: 'Admin demo' },
]

export function SiteLayout() {
  return (
    <div className="pb-14">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0d1111]/82 backdrop-blur-xl">
        <div className="shell py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
              <div>
                <p className="text-2xl tracking-[-0.08em] text-white sm:text-3xl" style={{ fontFamily: 'Marcellus, serif' }}>
                  GIB
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">Menuiseries Services</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/62 sm:gap-4 sm:text-sm">
                <a className="inline-flex items-center gap-2" href={`tel:${company.phone_international}`}>
                  <Phone className="size-4" />
                  {company.phone_display}
                </a>
                <a className="inline-flex items-center gap-2" href={`mailto:${company.email}`}>
                  <Mail className="size-4" />
                  {company.email}
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  {company.location_label}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                  end={item.end}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="shell mt-16">
        <div className="glass-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              <span className="eyebrow">Contact public GIB</span>
              <div className="space-y-4">
                <h2 className="section-title text-[var(--text)]">Une base demonstrable, sans tunnel serveur fragile.</h2>
                <p className="body-copy max-w-2xl">
                  Cette base front privilegie les vrais visuels, la qualification rapide et la compatibilite GitHub Pages. Instagram reste une source secondaire, injectable plus tard sans casser le fallback local.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="cta-whatsapp" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp direct
                </a>
                <a className="cta-secondary" href={`mailto:${company.email}`}>
                  <Mail className="size-4" />
                  Envoyer un email
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="metric-card space-y-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Coordonnees</p>
                <a className="block text-lg font-semibold text-white" href={`tel:${company.phone_international}`}>
                  {company.phone_display}
                </a>
                <a className="block text-sm text-white/72" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <p className="text-sm text-white/62">{company.location_label}</p>
              </div>
              <div className="metric-card space-y-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Canaux</p>
                <div className="flex flex-wrap gap-3 text-sm text-white/74">
                  <a className="inline-flex items-center gap-2" href={company.instagram_url} rel="noreferrer" target="_blank">
                    <CircleFadingArrowUp className="size-4" />
                    Instagram
                  </a>
                  <a className="inline-flex items-center gap-2" href={company.facebook_url} rel="noreferrer" target="_blank">
                    <Globe className="size-4" />
                    Facebook
                  </a>
                  <a className="inline-flex items-center gap-2" href={company.youtube_url} rel="noreferrer" target="_blank">
                    <PlayCircle className="size-4" />
                    Video
                  </a>
                </div>
                <p className="text-sm text-white/52">{company.contact_note}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
