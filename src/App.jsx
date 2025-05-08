import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import StatsPage from './pages/StatsPage'; // Import StatsPage

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/stats/:urlPath" element={<StatsPage />} /> {/* Route for stats */}
            {/* You could add a 404 page here */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-slate-700">404 - Not Found</h1>
                <p className="text-slate-500 mt-2">The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="text-center py-6 text-sm text-slate-500">
          BriefShortLink © {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
}

export default App;