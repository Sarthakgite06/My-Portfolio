import React, { useState, useEffect } from 'react';
import { ExternalLink, Layers, ArrowRight, Star, GitFork, FolderGit2, AlertTriangle, RefreshCw } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [gitRepos, setGitRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(null);

  const projectsData = [
    {
      id: 'healthcard',
      title: 'Centralized Health Card System',
      desc: 'A unified clinical management platform where patients register to generate custom digital health cards with unique IDs, and medical practitioners review patient historical medical charts and append checkup prescriptions. Live production URL: https://chc-frontend-brown.vercel.app/login',
      image: '/health_card_dashboard.png',
      tags: ['React.js', 'Express.js', 'Node.js', 'Vercel-Deployment', 'MERN Stack'],
      isFeatured: true,
      link: 'https://chc-frontend-brown.vercel.app/login',
      github: 'https://github.com/Sarthakgite06/Centralized-Health-Card-System'
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

  const fetchGithubRepos = async () => {
    setReposLoading(true);
    setReposError(null);
    try {
      const response = await fetch('https://api.github.com/users/Sarthakgite06/repos?sort=updated&per_page=12');
      if (!response.ok) {
        throw new Error('Failed to retrieve GitHub repositories.');
      }
      const data = await response.json();
      
      // Filter out forks and the portfolio repository itself to show unique projects
      const filtered = data
        .filter(repo => !repo.fork && repo.name.toLowerCase() !== 'my-portfolio')
        .slice(0, 6); // Limit to top 6 active repositories
      
      setGitRepos(filtered);
    } catch (err) {
      console.error(err);
      setReposError('Could not sync dynamic GitHub repositories. Showing direct profile access instead.');
    } finally {
      setReposLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="projects-subtitle">Production applications and academic masterpieces</p>
        
        {/* Hand-curated projects grid */}
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

        {/* Dynamic GitHub repositories showcase */}
        <div className="github-showcase-section" style={{ marginTop: '80px' }}>
          <div className="github-section-header">
            <div>
              <h3 className="github-section-title">Open Source Repositories</h3>
              <p className="github-section-subtitle">Synced in real-time from GitHub</p>
            </div>
            <button 
              onClick={fetchGithubRepos} 
              className="btn btn-secondary btn-small"
              title="Refresh GitHub Feed"
              disabled={reposLoading}
            >
              <RefreshCw size={14} className={reposLoading ? 'spin' : ''} /> Sync Repos
            </button>
          </div>

          {reposLoading ? (
            <div className="github-loader-container">
              <RefreshCw className="spin" size={32} style={{ color: 'var(--accent)' }} />
              <p>Fetching active GitHub repositories...</p>
            </div>
          ) : reposError ? (
            <div className="github-error-container glass-card">
              <AlertTriangle size={32} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
              <p>{reposError}</p>
              <a 
                href="https://github.com/Sarthakgite06" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ marginTop: '16px' }}
              >
                Go to GitHub Profile
              </a>
            </div>
          ) : (
            <div className="github-repos-grid">
              {gitRepos.map((repo) => (
                <div key={repo.id} className="github-repo-card glass-card">
                  <div className="repo-card-header">
                    <FolderGit2 size={24} className="repo-folder-icon" />
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="repo-title-link"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <p className="repo-desc">
                    {repo.description || "Software repository developed using Sarthak's tech stack. Focuses on clean implementation and core algorithms."}
                  </p>
                  
                  <div className="repo-footer">
                    <div className="repo-stats-row">
                      {repo.language && (
                        <span className="repo-lang">
                          <span className="lang-dot" style={{ backgroundColor: repo.language === 'Java' ? '#b07219' : repo.language === 'Python' ? '#3572A5' : repo.language === 'JavaScript' ? '#f1e05a' : '#555555' }}></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="repo-stat-item">
                        <Star size={12} /> {repo.stargazers_count}
                      </span>
                      <span className="repo-stat-item">
                        <GitFork size={12} /> {repo.forks_count}
                      </span>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="repo-link-btn"
                    >
                      Codebase &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
