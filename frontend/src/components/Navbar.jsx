import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Activity, ShieldAlert } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const navLinks = [
    { label: 'About', hash: 'about' },
    { label: 'Work', hash: 'work' },
    { label: 'Education', hash: 'education' },
    { label: 'Skills', hash: 'skills' },
    { label: 'Projects', hash: 'projects' },
    { label: 'Contact', hash: 'contact' }
  ];

  const handleNavClick = (hash) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
    } else {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
