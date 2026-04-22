import { HashRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { DiagnosticPage } from './pages/DiagnosticPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { ProductsPage } from './pages/ProductsPage'
import { QuotePage } from './pages/QuotePage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<AboutPage />} path="a-propos" />
          <Route element={<DiagnosticPage />} path="diagnostic-immobilier" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<GalleryPage />} path="galerie" />
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
