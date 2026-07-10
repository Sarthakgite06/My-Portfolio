import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Activity, ShieldAlert, Palette, Download } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'cyberpunk');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const navLinks = [
    { label: 'About', hash: 'about' },
    { label: 'Work', hash: 'work' },
    { label: 'Education', hash: 'education' },
    { label: 'Skills', hash: 'skills' },
    { label: 'Projects', hash: 'projects' },
    { label: 'Contact', hash: 'contact' }
  ];

  const themes = [
    { name: 'cyberpunk', label: 'Cyberpunk Glow', color: '#6366f1' },
    { name: 'emerald', label: 'Slate Emerald', color: '#10b981' },
    { name: 'nordic', label: 'Nordic Ice', color: '#38bdf8' },
    { name: 'sunset', label: 'Sunset Amber', color: '#f97316' }
  ];

  const handleNavClick = (hash) => {
    setIsOpen(false);
    setShowThemeMenu(false);
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
    } else {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.theme-selector-container')) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container container">
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Sarthak<span>.Gite</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.hash}>
              <button onClick={() => handleNavClick(link.hash)} className="nav-btn-link">
                {link.label}
              </button>
            </li>
          ))}

          {/* Theme Selector */}
          <li className="theme-selector-container" style={{ position: 'relative' }}>
            <button 
              className="theme-selector-btn" 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              title="Change Theme"
            >
              <Palette size={18} />
            </button>
            {showThemeMenu && (
              <div className="theme-dropdown glass-card">
                {themes.map((t) => (
                  <button 
                    key={t.name}
                    className={`theme-opt ${theme === t.name ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(t.name);
                      setShowThemeMenu(false);
                    }}
                  >
                    <span className="theme-dot" style={{ backgroundColor: t.color }}></span>
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </li>

          {/* Resume Download */}
          <li>
            <a 
              href="/Sarthak_Gite_Resume.pdf" 
              download="Sarthak_Gite_Resume.pdf" 
              className="nav-btn-link resume-nav-btn"
            >
              <Download size={15} /> Resume
            </a>
          </li>

          <li>
            <a 
              href="https://chc-frontend-brown.vercel.app/login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-badge-link"
            >
              <Activity size={16} /> Health Card System
            </a>
          </li>
          <li>
            <Link to="/admin" className="nav-admin-link" title="Admin Dashboard">
              <ShieldAlert size={18} />
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger toggle */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Mobile Menu */}
        <ul className={`nav-menu-mobile ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.hash}>
              <button 
                onClick={() => handleNavClick(link.hash)} 
                className="nav-btn-link"
              >
                {link.label}
              </button>
            </li>
          ))}

          {/* Mobile Theme Selector */}
          <li className="mobile-theme-item">
            <span className="mobile-theme-title"><Palette size={14} style={{ marginRight: '6px' }} /> Theme</span>
            <div className="mobile-themes-grid">
              {themes.map((t) => (
                <button
                  key={t.name}
                  className={`mobile-theme-opt ${theme === t.name ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.name);
                    setIsOpen(false);
                  }}
                >
                  <span className="theme-dot" style={{ backgroundColor: t.color, display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '6px' }}></span>
                  {t.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </li>

          {/* Mobile Resume Link */}
          <li>
            <a 
              href="/Sarthak_Gite_Resume.pdf" 
              download="Sarthak_Gite_Resume.pdf" 
              className="nav-btn-link mobile-resume-link"
              onClick={() => setIsOpen(false)}
            >
              <Download size={16} style={{ marginRight: '6px' }} /> Download Resume
            </a>
          </li>

          <li>
            <a 
              href="https://chc-frontend-brown.vercel.app/login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-badge-link mobile" 
              onClick={() => setIsOpen(false)}
            >
              <Activity size={16} /> Health Card System
            </a>
          </li>
          <li>
            <Link to="/admin" className="nav-admin-link mobile" onClick={() => setIsOpen(false)}>
              <ShieldAlert size={16} /> Admin Panel
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
