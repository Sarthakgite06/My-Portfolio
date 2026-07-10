import React, { useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    {
      title: 'AI & Data Science',
      skills: [
        { name: 'Python Programming', level: '85%' },
        { name: 'Machine Learning (Scikit-learn)', level: '80%' },
        { name: 'Data Analysis (Pandas, Numpy)', level: '85%' },
        { name: 'Data Visualization (Seaborn, Matplotlib)', level: '80%' },
        { name: 'TensorFlow & Deep Learning', level: '70%' }
      ]
    },
    {
      title: 'Full-Stack Web Development',
      skills: [
        { name: 'React.js & Vite', level: '80%' },
        { name: 'JavaScript (ES6+)', level: '75%' },
        { name: 'Node.js & Express.js', level: '75%' },
        { name: 'HTML5 & CSS3 / Styling', level: '90%' },
        { name: 'SQL Databases (SQLite / MySQL)', level: '75%' }
      ]
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub Versioning', level: '85%' },
        { name: 'Jupyter & Anaconda Envs', level: '85%' },
        { name: 'AWS Cloud Basics', level: '65%' },
        { name: 'REST APIs Design', level: '80%' }
      ]
    }
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-tabs-header">
          <button 
            className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Categories
          </button>
          {skillCategories.map((cat, idx) => (
            <button 
              key={idx}
              className={`tab-btn ${activeCategory === cat.title ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.title)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {skillCategories
            .filter((cat) => activeCategory === 'all' || cat.title === activeCategory)
            .map((cat, idx) => (
              <div key={idx} className="skills-card glass-card animate-fade-in">
                <h3 className="cat-title">{cat.title}</h3>
                <div className="skills-list">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="skill-progress-bar">
                        <div 
                          className="skill-progress-fill" 
                          style={{ '--width-target': skill.level }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
