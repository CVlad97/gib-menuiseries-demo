import { HashRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { CompanyDossierPage } from './pages/CompanyDossierPage'
import { ContactPage } from './pages/ContactPage'
import { DiagnosticPage } from './pages/DiagnosticPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { ProductsPage } from './pages/ProductsPage'
import { QuotePage } from './pages/QuotePage'
import { InstagramProfilePage } from './pages/InstagramProfilePage'
import { TendersPage } from './pages/TendersPage'
import { TenderAdminPage } from './pages/TenderAdminPage'
import { ProspectingAppPage } from './pages/ProspectingAppPage'
import { TenderMethodologyPage } from './pages/TenderMethodologyPage'
import { GlobalProspectingPage } from './pages/GlobalProspectingPage'
import { ProspectingAutomationPage } from './pages/ProspectingAutomationPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<AboutPage />} path="a-propos" />
          <Route element={<DiagnosticPage />} path="diagnostic-immobilier" />
          <Route element={<InstagramProfilePage />} path="instagram" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<GalleryPage />} path="galerie" />
          <Route element={<TendersPage />} path="appels-offres" />
          <Route element={<CompanyDossierPage />} path="dossier-entreprise" />
          <Route element={<TenderAdminPage />} path="admin-appels-offres" />
          <Route element={<ProspectingAppPage />} path="prospection-locale" />
          <Route element={<GlobalProspectingPage />} path="prospection-globale" />
          <Route element={<ProspectingAutomationPage />} path="automatisation-prospection" />
          <Route element={<TenderMethodologyPage />} path="methode-appels-offres" />
          <Route element={<ProductsPage />} path="produits" />
          <Route element={<ProductPage />} path="produits/:slug" />
          <Route element={<QuotePage />} path="devis" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
