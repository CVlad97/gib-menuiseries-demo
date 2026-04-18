import {
  CircleFadingArrowUp,
  FileText,
  Globe,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PlayCircle,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { company } from '../lib/content'

const navItems = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/produits', label: 'Produits' },
  { to: '/galerie', label: 'Realisations' },
  { to: '/simulation', label: 'Projection' },
  { to: '/devis', label: 'Devis' },
]

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname, location.search])

  return (
    <div className="pb-28 lg:pb-14">
      <div className="border-b border-white/6 bg-black/30">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/56">
          <span>Menuiserie aluminium · renovation · depannage</span>
          <span>Zone Cocotte, Ducos · intervention Martinique</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#182021]/86 backdrop-blur-xl">
        <div className="shell py-4">
          <div className="flex items-start justify-between gap-4 lg:hidden">
            <div className="flex min-w-0 flex-col gap-3">
              <div>
                <p className="text-2xl tracking-[-0.08em] text-white" style={{ fontFamily: 'Marcellus, serif' }}>
                  GIB
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">Menuiseries Services</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/62">
                <a className="inline-flex items-center gap-2" href={`tel:${company.phone_international}`}>
                  <Phone className="size-4" />
                  {company.phone_display}
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  {company.location_label}
                </span>
              </div>
            </div>
            <button
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] p-3 text-white transition hover:bg-white/[0.08]"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
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
                  onClick={closeMenu}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
              <a className="cta-whatsapp !px-4 !py-2" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {menuOpen ? (
            <div className="mt-4 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4 lg:hidden">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    className={({ isActive }) =>
                      `nav-link flex items-center justify-between ${isActive ? 'nav-link-active' : ''}`
                    }
                    end={item.end}
                    onClick={closeMenu}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <a className="cta-whatsapp w-full justify-center" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp direct
                </a>
                <a className="cta-secondary w-full justify-center" href={`mailto:${company.email}`}>
                  <Mail className="size-4" />
                  Email
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="shell mt-16">
        <div className="glass-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              <span className="eyebrow">Contact GIB</span>
              <div className="space-y-4">
                <h2 className="section-title text-[var(--text)]">
                  GIB Menuiseries Services accompagne vos projets de menuiserie aluminium, renovation et depannage.
                </h2>
                <p className="body-copy max-w-2xl">
                  Le site met en avant les produits, les realisations, les coordonnees utiles et un parcours de contact simple pour qualifier un besoin, envoyer des photos et demander un devis personnalise.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="cta-primary" href={`tel:${company.phone_international}`}>
                  Appeler GIB
                </a>
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
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Coordonnees directes</p>
                <a className="block text-lg font-semibold text-white" href={`tel:${company.phone_international}`}>
                  {company.phone_display}
                </a>
                <a className="block text-sm text-white/72" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <p className="text-sm text-white/62">{company.location_label}</p>
                <p className="text-sm text-white/52">{company.service_area}</p>
              </div>
              <div className="metric-card space-y-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Relais visuels</p>
                <div className="flex flex-col gap-3 text-sm text-white/74">
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
              <div className="metric-card space-y-3 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Acces directs</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <NavLink className="nav-link justify-start !bg-white/[0.04]" to="/produits">
                    <LayoutGrid className="size-4" />
                    Catalogue produits
                  </NavLink>
                  <NavLink className="nav-link justify-start !bg-white/[0.04]" to="/galerie">
                    <CircleFadingArrowUp className="size-4" />
                    Realisations
                  </NavLink>
                  <NavLink className="nav-link justify-start !bg-white/[0.04]" to="/simulation">
                    <PlayCircle className="size-4" />
                    Projection
                  </NavLink>
                  <NavLink className="nav-link justify-start !bg-white/[0.04]" to="/devis">
                    <FileText className="size-4" />
                    Devis personnalise
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[#0b0f10]/94 px-3 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-2">
          <a className="cta-primary !px-3 !py-3 text-xs" href={`tel:${company.phone_international}`}>
            <Phone className="size-4" />
            Appeler
          </a>
          <a className="cta-whatsapp !px-3 !py-3 text-xs" href={company.whatsapp_url} rel="noreferrer" target="_blank">
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
          <NavLink className="cta-secondary !px-3 !py-3 text-xs" onClick={closeMenu} to="/devis">
            <FileText className="size-4" />
            Devis
          </NavLink>
        </div>
      </div>
    </div>
  )
}
