import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Generator from './pages/Generator';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="generator" element={<Generator />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
