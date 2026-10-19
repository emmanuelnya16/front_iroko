import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Structure from './pages/Structure';
import Catalogue from './pages/Catalogue';
import Tarifs from './pages/Tarifs';
import Realisation from './pages/Realisation';
import Founders from './pages/Founders';
import Contact from './pages/Contact';
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Les Menus Officiels IROKO GROUP (2026) */}
          <Route path="/" element={<Home />} />
          <Route path="/le-groupe" element={<About />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/poles" element={<Catalogue />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/methode" element={<Realisation />} />
          <Route path="/fondateurs" element={<Founders />} />
          <Route path="/contact" element={<Contact />} />

          {/* Redirections et compatibilité des anciens chemins */}
          <Route path="/a-propos" element={<Navigate to="/le-groupe" replace />} />
          <Route path="/catalogue" element={<Navigate to="/poles" replace />} />
          <Route path="/realisations" element={<Navigate to="/methode" replace />} />
          <Route path="/vente" element={<Navigate to="/poles" replace />} />
          <Route path="/achat" element={<Navigate to="/tarifs" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
