import React, { useState } from 'react';
import { Briefcase, Award, GraduationCap, ChevronRight, ExternalLink, Download, Eye, X, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [certFilter, setCertFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const workData = [
    {
      role: 'City Head',
      company: 'Twinmind AI (USA)',
      duration: 'Nov 2025 – Mar 2026',
      location: 'Remote',
      points: [
        'Spearheaded regional operations and local market strategy for an international AI tech platform, reporting to global stakeholders.',
        'Drove developer community engagement and technical collaboration initiatives to expand the platform’s presence in the local market.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Project Head Intern',
      company: 'Codec Technologies',
      duration: 'Mar 2025 – Apr 2025',
      location: 'Pune, India',
      points: [
        'Led end-to-end execution of technology projects ensuring timely delivery, team collaboration, and alignment with organizational goals.',
        'Oversaw project planning, resource allocation, progress tracking, and stakeholder communication.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Front End Developer Intern',
      company: 'Overload Ware Labs AI (OWL AI)',
      duration: 'Sept 2025 – Oct 2025',
      location: 'Remote',
      points: [
        'Successfully completed remote internship demonstrating proficiency in modern front-end technologies.',
        'Built responsive, user-centric web interface components and integrated API workflows for AI web applications.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Outbound SDR Intern',
      company: 'Eazybe',
      duration: 'Aug 2025 – Oct 2025',
      location: 'Delhi, India',
      points: [
        'Executed outbound client acquisition campaigns and market outreach strategies for CRM productivity tools.',
        'Engaged corporate prospects, qualified lead funnels, and assisted in optimizing user onboarding conversion rates.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Front-End Development Intern',
      company: 'Codexintern',
      duration: 'Aug 2025',
      location: 'Virtual',
      points: [
        'Built scalable, user-centric web interfaces; translated wireframes into functional components using modern frontend technologies.',
        'Ensured mobile responsiveness and cross-browser compatibility across corporate digital applications.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Full Stack Web Development Intern',
      company: 'Future Interns',
      duration: 'Apr 2025',
      location: 'Virtual',
      points: [
        'Engaged in hands-on application development covering HTML5/CSS3 frontend, JavaScript, and backend RESTful architectures.',
        'Built modular web applications adhering to clean code standards and database schema practices.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'Intern',
      company: 'NeuAi Labs',
      duration: 'Dec 2024 – Jan 2025',
      location: 'Pune, India',
      points: [
        'Developed a Customer Churn Prediction System using Python and ML models with feature engineering and hyperparameter tuning.',
        'Performed data analysis and visualization using SQL, MongoDB, Pandas, and Matplotlib for actionable business insights.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    },
    {
      role: 'College Ambassador',
      company: 'Techfest, IIT Bombay',
      duration: 'Sept 2025',
      location: 'Pune, India',
      points: [
        'Represented Asia’s Largest Science & Technology Festival; ranked in Top 2000 by managing peer coordination and campus event promotions.'
      ],
      link: 'https://www.linkedin.com/in/sarthak-gite-0ab655258'
    }
  ];

  const certificationCategories = [
    { id: 'all', label: 'All Credentials (14)' },
    { id: 'cloud-ai', label: 'Cloud & AI' },
    { id: 'analytics-dev', label: 'Data & Dev' },
    { id: 'internships', label: 'Internships' },
    { id: 'leadership', label: 'Leadership & Wins' }
  ];

  const certificationData = [
    {
      id: 'oci-ds',
      title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
      provider: 'Oracle Cloud',
      category: 'cloud-ai',
      date: 'Sept 2025 – Sept 2027',
      code: '102578465OCI25DSOCP',
      preview: '/certificates/oracle_cloud_ds_page_1.png',
      pdf: '/certificates/oracle_cloud_ds.pdf',
      badge: '☁️ Oracle Cloud'
    },
    {
      id: 'deloitte-da',
      title: 'Data Analytics Job Simulation Certificate',
      provider: 'Deloitte Australia / Forage',
      category: 'analytics-dev',
      date: 'June 2025',
      code: 'dMQpbvEddawLrunng',
      preview: '/certificates/deloitte_analytics_page_1.png',
      pdf: '/certificates/deloitte_analytics.pdf',
      badge: '📊 Deloitte'
    },
    {
      id: 'tata-genai',
      title: 'GenAI Powered Data Analytics Job Simulation',
      provider: 'Tata Group / Forage',
      category: 'cloud-ai',
      date: 'June 2025',
      code: 'Tata GenAI Analytics',
      preview: '/certificates/tata_genai_analytics_page_1.png',
      pdf: '/certificates/tata_genai_analytics.pdf',
      badge: '🤖 Tata Group'
    },
    {
      id: 'ms-linkedin',
      title: 'Career Essentials in Software Development',
      provider: 'Microsoft & LinkedIn',
      category: 'analytics-dev',
      date: 'Nov 2024',
      code: '75f914819639ada29fd3158c7c52eaee4b56e6280bead4a70c56449d633a127b',
      preview: '/certificates/microsoft_linkedin_dev_page_1.png',
      pdf: '/certificates/microsoft_linkedin_dev.pdf',
      badge: '💻 Microsoft'
    },
    {
      id: 'owl-ai',
      title: 'Front End Developer Internship Completion Certificate',
      provider: 'Overload Ware Labs AI (OWL AI)',
      category: 'internships',
      date: 'Sept 2025 – Oct 2025',
      code: 'OWL-AI-FE-2025',
      preview: '/certificates/owl_ai_internship.png',
      pdf: '/certificates/owl_ai_internship.png',
      badge: '🚀 OWL AI'
    },
    {
      id: 'eazybe-intern',
      title: 'Outbound SDR Internship Certificate',
      provider: 'Eazybe',
      category: 'internships',
      date: 'Aug 2025 – Oct 2025',
      code: 'EAZYBE-SDR-2025',
      preview: '/certificates/eazybe_sdr_internship_page_1.png',
      pdf: '/certificates/eazybe_sdr_internship.pdf',
      badge: '💼 Eazybe'
    },
    {
      id: 'codex-intern',
      title: 'Front-End Development Virtual Internship',
      provider: 'CodexIntern',
      category: 'internships',
      date: 'Aug 2025',
      code: 'cxifnwd20250891038',
      preview: '/certificates/codex_internship_page_1.png',
      pdf: '/certificates/codex_internship.pdf',
      badge: '🌐 CodexIntern'
    },
    {
      id: 'future-interns',
      title: 'Full Stack Web Development Internship Offer & Fellowship',
      provider: 'Future Interns',
      category: 'internships',
      date: 'Apr 2025',
      code: 'FIT/APR25/FS1344',
      preview: '/certificates/future_interns.jpeg',
      pdf: '/certificates/future_interns.jpeg',
      badge: '🔥 Future Interns'
    },
    {
      id: 'gdg-cp',
      title: 'Competitive Programming Contest 2025 Certificate of Completion',
      provider: 'Google Developer Groups (GDG AISSMS COE)',
      category: 'leadership',
      date: 'Apr 2025',
      code: 'GDG-CP-AISSMS-2025',
      preview: '/certificates/gdg_cp_contest_2025_page_1.png',
      pdf: '/certificates/gdg_cp_contest_2025.pdf',
      badge: '⚡ Google GDG'
    },
    {
      id: 'iitb-techfest',
      title: 'College Ambassador Certificate of Appreciation',
      provider: 'Techfest, IIT Bombay',
      category: 'leadership',
      date: 'AY 2024 – 2025',
      code: 'IITB-TECHFEST-CA',
      preview: '/certificates/iitb_techfest_ca_page_1.png',
      pdf: '/certificates/iitb_techfest_ca.pdf',
      badge: '🏆 IIT Bombay'
    },
    {
      id: 'be10x-ai',
      title: 'AI Tools & ChatGPT Workshop Certificate',
      provider: 'be10X',
      category: 'cloud-ai',
      date: '2025',
      code: 'BE10X-AI-2025',
      preview: '/certificates/be10x_ai_workshop_page_1.png',
      pdf: '/certificates/be10x_ai_workshop.pdf',
      badge: '✨ be10X AI'
    },
    {
      id: 'skillquest-ds',
      title: 'Data Science Foundation Certificate',
      provider: 'SkillQuest',
      category: 'cloud-ai',
      date: 'Jun 2025',
      code: '27614117',
      preview: '/certificates/skillquest_ds_foundation_page_1.png',
      pdf: '/certificates/skillquest_ds_foundation.pdf',
      badge: '🎯 SkillQuest'
    },
    {
      id: 'skillected-comm',
      title: 'Mastering Effective Communication Skills For Interview',
      provider: 'SkillEcted',
      category: 'leadership',
      date: 'Jan 2025',
      code: 'SBL1D9NZ',
      preview: '/certificates/skillected_communication.jpeg',
      pdf: '/certificates/skillected_communication.jpeg',
      badge: '🗣️ SkillEcted'
    },
    {
      id: 'participation-cert',
      title: 'National Level Technical Event Participation Certificate',
      provider: 'Technical Association',
      category: 'leadership',
      date: 'Apr 2025',
      code: 'CIT-P-1640352',
      preview: '/certificates/participation_certificate_page_1.png',
      pdf: '/certificates/participation_certificate.pdf',
      badge: '🏅 Technical Event'
    }
  ];

  const achievementData = [
    {
      title: 'Campus Ambassador',
      organization: 'Techfest, IIT Bombay',
      period: 'Academic Year 2024 – 2025',
      desc: 'Represented Asia\'s largest science and technology festival at the university campus. Coordinated college-level publicity campaigns, facilitated student registration drives, and organized tech-workshops and programming challenges.'
    },
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

  const filteredCerts = certFilter === 'all' 
    ? certificationData 
    : certificationData.filter(c => c.category === certFilter);

  return (
    <section id="work" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Experience & Verified Credentials</h2>
        <p className="section-subtitle text-center" style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-secondary)' }}>
          Explore professional work history, verified industry certifications, and leadership roles
        </p>

        {/* Section Tabs */}
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
            <Award size={16} /> Verified Certifications ({certificationData.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'leader' ? 'active' : ''}`} 
            onClick={() => setActiveTab('leader')}
          >
            <GraduationCap size={16} /> Leadership & Wins
          </button>
        </div>

        <div className="tab-content-area">
          {/* WORK EXPERIENCE TAB */}
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

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certs' && (
            <div className="certifications-container">
              {/* Category Filter Pills */}
              <div className="cert-filter-bar">
                {certificationCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCertFilter(cat.id)}
                    className={`cert-filter-pill ${certFilter === cat.id ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Certifications Grid */}
              <div className="certs-rich-grid">
                {filteredCerts.map((cert) => (
                  <div key={cert.id} className="cert-card-enhanced glass-card">
                    {/* Thumbnail Preview Image */}
                    <div className="cert-thumb-box" onClick={() => setSelectedCert(cert)}>
                      <img 
                        src={cert.preview} 
                        alt={cert.title} 
                        className="cert-thumb-img" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/projects/portfolio_hero_screenshot.png';
                        }}
                      />
                      <span className="cert-badge-tag">{cert.badge}</span>
                      <div className="cert-thumb-overlay">
                        <Eye size={20} />
                        <span>Preview Certificate</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="cert-card-body">
                      <div className="cert-provider-row">
                        <span className="cert-provider-name">{cert.provider}</span>
                        <span className="cert-date-tag">{cert.date}</span>
                      </div>

                      <h4 className="cert-title-text">{cert.title}</h4>

                      {cert.code && (
                        <div className="cert-code-row">
                          <ShieldCheck size={14} className="shield-icon" />
                          <span className="cert-code-text">ID: {cert.code}</span>
                        </div>
                      )}

                      {/* Card Action Buttons */}
                      <div className="cert-actions">
                        <button 
                          onClick={() => setSelectedCert(cert)} 
                          className="btn btn-secondary btn-sm flex-1 justify-center"
                        >
                          <Eye size={14} /> View
                        </button>
                        <a 
                          href={cert.pdf} 
                          download 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-primary btn-sm flex-1 justify-center"
                        >
                          <Download size={14} /> PDF
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEADERSHIP & WINS TAB */}
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

      {/* CERTIFICATE MODAL LIGHTBOX */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>
              <X size={20} />
            </button>

            <div className="cert-modal-header">
              <span className="cert-modal-badge">{selectedCert.badge}</span>
              <h3 className="cert-modal-title">{selectedCert.title}</h3>
              <p className="cert-modal-provider">Issued by {selectedCert.provider} • {selectedCert.date}</p>
              {selectedCert.code && (
                <span className="cert-modal-code"><CheckCircle2 size={14} inline="true" /> Credential ID: {selectedCert.code}</span>
              )}
            </div>

            <div className="cert-modal-preview">
              <img src={selectedCert.preview} alt={selectedCert.title} className="cert-modal-img" />
            </div>

            <div className="cert-modal-footer">
              <a 
                href={selectedCert.pdf} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <ExternalLink size={16} /> Open Document
              </a>
              <a 
                href={selectedCert.pdf} 
                download 
                className="btn btn-primary"
              >
                <Download size={16} /> Download Verified PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;

