import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Layers, ArrowRight } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const projectsData = [
    {
      id: 'healthcard',
      title: 'Centralized Health Card System',
      desc: 'A unified clinical management platform where patients register to generate custom digital health cards with unique IDs, and medical practitioners review patient historical medical charts and append checkup prescriptions. Live production URL: https://chc-frontend-brown.vercel.app/login',
      image: '/health_card_dashboard.png',
      tags: ['React.js', 'Express.js', 'Node.js', 'Vercel-Deployment', 'MERN Stack'],
      isFeatured: true,
      link: 'https://chc-frontend-brown.vercel.app/login',
      github: 'https://github.com/sarthakgite06'
    },
    {
      id: 'hotel',
      title: 'Hotel Management System',
      desc: 'Comprehensive hospitality automation dashboard built with a React.js frontend and Spring Boot API backend. Handles guest registers, real-time room availability status, bookings list, and digital invoicing. Awarded Best Project in SPPU exhibition.',
      image: '/hotel management.JPG',
      tags: ['React.js', 'Spring Boot', 'REST API', 'MySQL', 'Hotel Automation'],
      github: 'https://github.com/sarthakgite06'
    },
    {
      id: 'uber',
      title: 'Uber NYC Ride Analysis',
      desc: 'Extracted temporal operational matrices from multi-thousand coordinates of Uber NYC pickups. Mapped peak demand windows (5–8 PM) and congested coordinate clusters.',
      image: '/uber ride.jpeg',
      tags: ['Python', 'Pandas', 'Jupyter', 'Seaborn', 'Matplotlib'],
      github: 'https://github.com/sarthakgite06'
    },
    {
      id: 'ims',
      title: 'Inventory Management System',
      desc: 'Real-time corporate inventory and supply chain application built with a React.js client and Spring Boot REST backend. Tracks stock units, manages supplier accounts, calculates invoices, and fires alerts on low-stock levels.',
      image: '/IMS.png',
      tags: ['React.js', 'Spring Boot', 'REST API', 'H2 Database', 'Supply Chain'],
      github: 'https://github.com/sarthakgite06'
    }
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className={`project-card glass-card ${project.isFeatured ? 'featured-card' : ''}`}
            >
              <div className="project-image-box">
                <img src={project.image} alt={project.title} className="proj-image" />
                {project.isFeatured && (
                  <span className="featured-tag">★ Featured Production App</span>
                )}
              </div>

              <div className="project-body">
                <h3 className="proj-title">{project.title}</h3>
                <p className="proj-desc">
                  {project.id === 'healthcard' ? (
                    <>
                      A unified clinical management platform where patients register to generate custom digital health cards with unique IDs, and medical practitioners review patient historical medical charts and append checkup prescriptions. Live production link: <a href="https://chc-frontend-brown.vercel.app/login" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-pink)', textDecoration: 'underline', fontWeight: '600' }}>chc-frontend-brown.vercel.app</a>
                    </>
                  ) : (
                    project.desc
                  )}
                </p>
                
                <div className="proj-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag-badge">{tag}</span>
                  ))}
                </div>

                <div className="proj-actions" style={{ display: 'flex', gap: '12px' }}>
                  {project.isFeatured ? (
                    <>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-accent" 
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        Launch App <ArrowRight size={16} />
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary"
                        title="View GitHub Repository"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    </>
                  ) : (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary full-width justify-center"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
