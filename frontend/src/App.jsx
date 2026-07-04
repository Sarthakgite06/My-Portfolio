import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HealthCardSystem from './pages/HealthCardSystem';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Scroll to top or to specific hash if specified in URL
const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

// Main landing page structure
const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToSection />
      <div className="main-wrapper">
        <Navbar />
        <main className="content-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health-card-system" element={<HealthCardSystem />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
