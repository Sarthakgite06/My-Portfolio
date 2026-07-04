import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import './Education.css';

const Education = () => {
  const educationData = [
    {
      period: '2022 - 2026',
      degree: 'Bachelor of Engineering (B.E.)',
      major: 'Artificial Intelligence & Data Science',
      institution: 'G S Moze College of Engineering',
      location: 'Balewadi, Pune (SPPU)',
      desc: 'Focused on core AI/DS architectures: Machine Learning models, Neural Networks, Deep Learning configurations, Big Data structures, and SQL/NoSQL systems. Serving as Vice President of AI & DS association.'
    },
    {
      period: '2020 - 2022',
      degree: 'Higher Secondary Certificate (HSC)',
      major: 'Science Stream (Physics, Chemistry, Maths, CS)',
      institution: 'Anasaheb Wagire College',
      location: 'Otur, Pune',
      desc: 'Built fundamental engineering skills in analytical physics, advanced mathematics calculus, chemistry formulas, and programming logic foundations.'
    },
    {
      period: '2019 - 2020',
      degree: 'Secondary School Certificate (SSC)',
      major: 'General Curriculum',
      institution: 'Chaitanya Vidyalaya',
      location: 'Otur, Pune',
      desc: 'Completed with distinction. Participated in science exhibitions, local coding clubs, and extracurricular quizzes.'
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="container">
        <h2 className="section-title">Education Details</h2>

        <div className="edu-timeline">
          {educationData.map((edu, idx) => (
            <div key={idx} className="edu-item">
              <div className="edu-left">
                <span className="edu-year-badge"><Calendar size={14} /> {edu.period}</span>
              </div>
              <div className="edu-center">
                <div className="edu-circle"></div>
                <div className="edu-line"></div>
              </div>
              <div className="edu-right">
                <div className="edu-card glass-card">
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <h4 className="edu-major">{edu.major}</h4>
                  <div className="edu-institute-info">
                    <span className="edu-org"><Award size={14} /> {edu.institution}</span>
                    <span className="edu-loc"><MapPin size={14} /> {edu.location}</span>
                  </div>
                  <p className="edu-desc">{edu.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
