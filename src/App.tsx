import { HashRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { AdminDemoPage } from './pages/AdminDemoPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { ProductsPage } from './pages/ProductsPage'
import { QuotePage } from './pages/QuotePage'
import { SimulationPage } from './pages/SimulationPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<GalleryPage />} path="galerie" />
          <Route element={<ProductsPage />} path="produits" />
          <Route element={<ProductPage />} path="produits/:slug" />
          <Route element={<SimulationPage />} path="simulation" />
          <Route element={<QuotePage />} path="devis" />
          <Route element={<AdminDemoPage />} path="admin" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
