import React, { useState } from 'react';
import { Briefcase, Award, GraduationCap, ChevronRight, ExternalLink } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');

  const workData = [
    {
      role: 'Artificial Intelligence Intern',
      company: 'Codec Technologies',
      duration: 'July 2025 - Present',
      points: [
        'Developing machine learning pipelines including preprocessing, feature engineering, model training, and validation.',
        'Collaborating with cross-functional teams to integrate AI models into enterprise workflows.',
        'Building predictive models using Python, Scikit-Learn, and TensorFlow (achieving 95% accuracy in classifications).',
        'Participating in agile standups, product planning, and peer code reviews.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Project Intern',
      company: 'Neu AI Labs',
      duration: 'Dec 2024 - Jan 2025',
      points: [
        'Goal: Analyzed Uber NYC ride datasets to extract traffic trends, peak operational hours, and highly congested locations.',
        'Extracted date-time dimensions (hours, days of week, months) from coordinates datasets.',
        'Built interactive maps, heatmaps, and frequency histograms using Pandas, Matplotlib, and Seaborn.',
        'Delivered insights on busiest zones (Manhattan, Brooklyn) and peak demand hours (5 PM – 8 PM).'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    }
  ];

  const certificationData = [
    { title: 'AWS – Solutions Architecture Job Simulation', provider: 'Forage / AWS', date: 'Jul 2025' },
    { title: 'Tata Group – GenAI Powered Data Analytics Job Simulation', provider: 'Forage / Tata', date: 'Jun 2025' },
    { title: 'Deloitte Australia – Data Analytics Job Simulation', provider: 'Forage / Deloitte', date: 'Jun 2025' },
    { title: 'Career Essentials in Software Development', provider: 'Microsoft & LinkedIn', date: 'Oct 2024' },
    { title: 'Programming Foundations: Beyond the Fundamentals', provider: 'LinkedIn Learning', date: 'Oct 2024' }
  ];

  const achievementData = [
    {
      title: 'Vice President – AI & DS Department',
      organization: 'G S Moze College of Engineering (SPPU)',
      period: 'Academic Year 2024 – 2025',
      desc: 'Led departmental code clubs, organized national level hackathons, mentored junior students in project design, and facilitated direct student-faculty collaborations.'
    },
    {
      title: 'Best Project Award',
      organization: 'Departmental Exhibition',
      period: 'Academic Year 2024',
      desc: 'Secured the first-place prize for designing and launching an AI-powered Hotel Management analytics system featuring automated booking and room inventory prediction charts.'
    },
    {
      title: 'Coding Competition Winner',
      organization: 'Inter-College Tech Fest',
      period: '2024',
      desc: 'Placed first in data analytics challenges and participated in Google Developer Student Clubs coding events.'
    }
  ];

  return (
    <section id="work" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Experience & Achievements</h2>

        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`} 
            onClick={() => setActiveTab('work')}
          >
            <Briefcase size={16} /> Work Experience
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('certs')}
          >
            <Award size={16} /> Certifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'leader' ? 'active' : ''}`} 
            onClick={() => setActiveTab('leader')}
          >
            <GraduationCap size={16} /> Leadership & Wins
          </button>
        </div>

        <div className="tab-content-area">
          {activeTab === 'work' && (
            <div className="timeline-wrapper">
              {workData.map((work, idx) => (
                <div key={idx} className="timeline-card glass-card">
                  <div className="card-top">
                    <div>
                      <h3 className="card-role">{work.role}</h3>
                      <h4 className="card-company">{work.company}</h4>
                    </div>
                    <div className="card-meta">
                      <span className="card-date">{work.duration}</span>
                      <a href={work.link} target="_blank" rel="noopener noreferrer" className="linkedin-link" title="Verify on LinkedIn">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  <ul className="points-list">
                    {work.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <ChevronRight size={14} className="bullet-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="certs-grid">
              {certificationData.map((cert, idx) => (
                <div key={idx} className="cert-card glass-card">
                  <div className="cert-badge">★</div>
                  <div className="cert-body">
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-provider">{cert.provider}</p>
                  </div>
                  <span className="cert-date">{cert.date}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leader' && (
            <div className="grid-2">
              {achievementData.map((ach, idx) => (
                <div key={idx} className="achievement-item glass-card">
                  <h3 className="ach-title">{ach.title}</h3>
                  <div className="ach-meta">
                    <span className="ach-org">{ach.organization}</span>
                    <span className="ach-period">{ach.period}</span>
                  </div>
                  <p className="ach-desc">{ach.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
