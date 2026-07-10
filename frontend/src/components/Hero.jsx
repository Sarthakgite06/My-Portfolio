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

  // Particle background logic
  useEffect(() => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 600);
    
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight || 600;
      }
    };
    window.addEventListener('resize', handleResize);
    
    const particleCount = Math.min(50, Math.floor((width * height) / 18000));
    const particles = [];
    const connectionDistance = 110;
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
      
      draw(color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color + '55'; // semi-transparent accent color
        ctx.fill();
      }
    }
    
    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const style = getComputedStyle(document.body);
      const accent = style.getPropertyValue('--accent').trim() || '#6366f1';
      
      particles.forEach((p) => {
        p.update();
        p.draw(accent);
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accent + Math.round(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = accent + Math.round(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      const parent = canvas.parentElement;
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <header className="hero">
      <canvas id="hero-canvas" className="hero-particle-canvas"></canvas>
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
            <a 
              href="/Sarthak_Gite_Resume.pdf" 
              download="Sarthak_Gite_Resume.pdf" 
              className="btn btn-accent"
            >
              Download Resume <Download size={16} />
            </a>
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
