import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import './Education.css';

const Education = () => {
  const educationData = [
    {
      period: 'Nov 2022 – Jul 2026',
      degree: 'B.E. in Artificial Intelligence & Data Science',
      major: 'CGPA: 8.62 / 10.0',
      institution: 'Savitribai Phule Pune University (SPPU)',
      location: 'Pune, India',
      desc: 'Hands-on experience in AI, ML, data analysis, and web development through projects, corporate internships, and competitive coding contests.'
    },
    {
      period: 'Mar 2021 – Jun 2022',
      degree: 'Higher Secondary Certificate (Class XII)',
      major: 'Percentage: 64.83%',
      institution: 'Annasaheb Waghire College',
      location: 'Otur, Maharashtra, India',
      desc: 'Built fundamental engineering skills in analytical physics, advanced mathematics calculus, chemistry formulas, and programming logic foundations.'
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
