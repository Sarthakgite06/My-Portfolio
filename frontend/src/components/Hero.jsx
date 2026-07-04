import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const words = ["AI & Data Science Engineer", "Data Analyst", "Full Stack Developer", "Vice President @ Moze SPPU"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    // Word complete typing
    if (!isDeleting && currentText === currentFullWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } 
    // Word complete deleting
    else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx]);

  return (
    <header className="hero">
      <div className="hero-grid container">
        <div className="hero-content">
          <div className="hero-tag">Welcome to my portfolio</div>
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Sarthak Gite</span>
          </h1>
          <h2 className="hero-subtitle">
            <span className="cursor-text">{currentText}</span>
            <span className="cursor-blink">|</span>
          </h2>
          <p className="hero-desc">
            Developing intelligent systems and analyzing complex datasets to solve real-world problems.
            Specializing in building neural network pipelines, data intelligence reports, and full-stack solutions.
          </p>
          <div className="hero-actions">
            <button 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} 
              className="btn btn-primary"
            >
              View Projects <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} 
              className="btn btn-secondary"
            >
              Contact Me <Mail size={16} />
            </button>
          </div>
        </div>

        <div className="hero-image-area">
          <div className="image-wrapper">
            <div className="circle-glow"></div>
            <div className="profile-img-container">
              <img src="/sarthak_profile.jpg" alt="Sarthak S. Gite" className="hero-img" />
            </div>
            <div className="orbit-item item-1">📊</div>
            <div className="orbit-item item-2">🧠</div>
            <div className="orbit-item item-3">💻</div>
          </div>
        </div>
      </div>
      <div className="hero-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
    </header>
  );
};

export default Hero;
