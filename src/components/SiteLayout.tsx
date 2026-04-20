import {
  FileText,
  Globe,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PlayCircle,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { company } from '../lib/content'

const logoSrc =
  'https://le-de.cdn-website.com/179f7a3a04c5410bb41d060e3efd0cfd/dms3rep/multi/opt/logo+gib-fe923f67-381w.PNG'

const navItems = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/a-propos', label: 'A propos' },
  { to: '/produits', label: 'Menuiserie aluminium' },
  { to: '/produits/renovation-depannage', label: 'Renovation d habitat' },
  { to: '/produits/renovation-depannage', label: 'Depannage express' },
  { to: '/diagnostic-immobilier', label: 'Diagnostic immobilier' },
  { to: '/contact', label: 'Contact' },
]

const secondaryItems = [
  { to: '/galerie', label: 'Realisations' },
  { to: '/devis', label: 'Demander un devis' },
]

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    closeMenu()
  }, [])

  return (
    <div className="pb-28 lg:pb-10">
      <div className="border-b border-[#1398db]/10 bg-[linear-gradient(90deg,rgba(19,152,219,0.08),rgba(83,196,216,0.06))] text-[0.78rem] text-black/72">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-4">
            <a className="inline-flex items-center gap-2 font-semibold text-black" href={`tel:${company.phone_international}`}>
              <Phone className="size-4 text-[#e12726]" />
              Appelez-nous
            </a>
            <a className="inline-flex items-center gap-2 font-semibold text-black" href={`mailto:${company.email}`}>
              <Mail className="size-4 text-[#1398db]" />
              Ecrivez-nous
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-medium">
            <span className="topbar-pill">Intervention Martinique</span>
            <span className="topbar-pill">WhatsApp direct</span>
            <span className="inline-flex items-center gap-2 text-black/72">
              <MapPin className="size-4 text-[#ffd400]" />
              Zone Cocotte, Ducos · Martinique
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#1398db]/10 bg-white/92 backdrop-blur-xl">
        <div className="shell py-4">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <NavLink className="min-w-0" onClick={closeMenu} to="/">
              <img alt="Logo GIB Menuiseries Services" className="h-12 w-auto" src={logoSrc} />
            </NavLink>
            <button
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white p-3 text-black transition hover:bg-black/[0.04]"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            <div className="flex items-center justify-between gap-6">
              <NavLink className="shrink-0" onClick={closeMenu} to="/">
                <img alt="Logo GIB Menuiseries Services" className="h-16 w-auto" src={logoSrc} />
              </NavLink>
              <div className="flex flex-wrap items-center gap-3 text-sm text-black/70">
                <a className="inline-flex items-center gap-2" href={`tel:${company.phone_international}`}>
                  <Phone className="size-4 text-[#e12726]" />
                  {company.phone_display}
                </a>
                <a className="inline-flex items-center gap-2" href={`mailto:${company.email}`}>
                  <Mail className="size-4 text-[#1398db]" />
                  {company.email}
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[#ffd400]" />
                  {company.location_label}
                </span>
                <span className="topbar-pill hidden xl:inline-flex">Intervention locale</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav className="flex flex-wrap items-center gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={`${item.to}-${item.label}`}
                    className={({ isActive }) => `nav-link !text-black/74 ${isActive ? 'nav-link-active !bg-black/[0.04] !text-black' : '!bg-transparent'}`}
                    end={item.end}
                    onClick={closeMenu}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex flex-wrap items-center gap-3">
                <a className="cta-whatsapp !px-4 !py-2" href={company.whatsapp_url} rel="noreferrer" target="_blank">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
                <NavLink className="cta-primary !px-4 !py-2" to="/devis">
                  <FileText className="size-4" />
                  Devis
                </NavLink>
              </div>
            </div>
          </div>

          {menuOpen ? (
            <div className="mt-4 rounded-[1.8rem] border border-black/8 bg-white p-4 shadow-[0_20px_50px_rgba(17,22,21,0.08)] lg:hidden">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={`${item.to}-${item.label}`}
                    className={({ isActive }) => `nav-link flex items-center justify-between !text-black/74 ${isActive ? 'nav-link-active !bg-black/[0.04] !text-black' : '!bg-transparent'}`}
                    end={item.end}
                    onClick={closeMenu}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ))}
                {secondaryItems.map((item) => (
                  <NavLink
                    key={item.to}
                    className={({ isActive }) => `nav-link flex items-center justify-between !text-black/74 ${isActive ? 'nav-link-active !bg-black/[0.04] !text-black' : '!bg-transparent'}`}
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
                <NavLink className="cta-primary w-full justify-center" onClick={closeMenu} to="/devis">
                  <FileText className="size-4" />
                  Demander un devis
                </NavLink>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="shell mt-16">
        <div className="surface-panel overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <img alt="Logo GIB Menuiseries Services" className="h-16 w-auto" src={logoSrc} />
              <div className="space-y-3 text-sm leading-7 text-black/70">
                <p>
                  GIB Menuiseries Services intervient depuis Zone Cocotte a Ducos sur toute la Martinique pour la menuiserie aluminium, la renovation d habitat, le depannage express et le diagnostic immobilier.
                </p>
                <p>
                  Plus de 20 ans d experience, certification RGE, Qualicoat et accompagnement sur mesure.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="cta-primary" href={`tel:${company.phone_international}`}>
                  <Phone className="size-4" />
                  Appeler
                </a>
                <a className="cta-secondary !border-[#1398db]/30 !text-black" href={`mailto:${company.email}`}>
                  <Mail className="size-4 text-[#1398db]" />
                  Ecrire
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-black/8 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Contactez-nous</p>
                <div className="mt-4 space-y-3 text-sm text-black/72">
                  <a className="block font-semibold text-black" href={`tel:${company.phone_international}`}>{company.phone_display}</a>
                  <a className="block" href={`mailto:${company.email}`}>{company.email}</a>
                  <p>{company.location_label}, 97224, FR</p>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-black/8 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Suivez-nous</p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-black/72">
                  <a className="inline-flex items-center gap-2" href={company.facebook_url} rel="noreferrer" target="_blank">
                    <Globe className="size-4 text-[#1398db]" /> Facebook
                  </a>
                  <a className="inline-flex items-center gap-2" href={company.instagram_url} rel="noreferrer" target="_blank">
                    <Globe className="size-4 text-[#1398db]" /> Instagram
                  </a>
                  <a className="inline-flex items-center gap-2" href={company.youtube_url} rel="noreferrer" target="_blank">
                    <PlayCircle className="size-4 text-[#e12726]" /> Video
                  </a>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-black/8 bg-white p-5 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Acces directs</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {secondaryItems.map((item) => (
                    <NavLink key={item.to} className="nav-link !bg-black/[0.04] !text-black/76" to={item.to}>
                      {item.label}
                    </NavLink>
                  ))}
                  <NavLink className="nav-link !bg-black/[0.04] !text-black/76" to="/contact">
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/8 bg-white/95 px-3 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-2">
          <a className="cta-primary !px-3 !py-3 text-xs" href={`tel:${company.phone_international}`}>
            <Phone className="size-4" />
            Appeler
          </a>
          <a className="cta-whatsapp !px-3 !py-3 text-xs" href={company.whatsapp_url} rel="noreferrer" target="_blank">
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
          <NavLink className="cta-secondary !border-black/12 !px-3 !py-3 !text-black text-xs" onClick={closeMenu} to="/devis">
            <FileText className="size-4" />
            Devis
          </NavLink>
        </div>
      </div>
    </div>
  )
}
