import React from 'react';
import { Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { icon: <GraduationCap size={20} className="stat-icon-gold" />, label: 'Overall CGPA', value: '8.62 / 10', colorClass: 'gold' },
    { icon: <Briefcase size={20} className="stat-icon-blue" />, label: 'Experience', value: '6+ Internships', colorClass: 'blue' },
    { icon: <Code size={20} className="stat-icon-pink" />, label: 'Projects Done', value: '10+ Core Apps', colorClass: 'pink' },
    { icon: <Award size={20} className="stat-icon-teal" />, label: 'Dept Leadership', value: 'College Ambassador', colorClass: 'teal' }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-grid">
          <div className="about-image-column">
            <div className="about-image-card">
              <div className="border-glow-line"></div>
              <img src="/image-250x250.jpg" alt="Sarthak Gite Professional" className="about-img" />
              <div className="floating-badge">
                <span className="badge-bullet"></span> AI & DS Specialist
              </div>
            </div>
          </div>

          <div className="about-info-column">
            <h3 className="about-subtitle">AI & Data Science Engineer</h3>
            <p className="about-text">
              I am an Artificial Intelligence and Data Science Engineer with a passion for designing intelligent models, analyzing complex systems, and building scalable full-stack web applications.
            </p>
            <p className="about-text">
              Currently pursuing my B.E. in Artificial Intelligence & Data Science at Savitribai Phule Pune University (SPPU) with a CGPA of 8.62, I have completed multiple professional internships across front-end web development, AI platforms, data analytics, and project leadership.
            </p>
            
            <div className="stats-dashboard">
              {stats.map((stat, idx) => (
                <div key={idx} className={`stat-card glass-card stat-card-${stat.colorClass}`}>
                  <div className="stat-header">
                    {stat.icon}
                    <span className="stat-value">{stat.value}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
