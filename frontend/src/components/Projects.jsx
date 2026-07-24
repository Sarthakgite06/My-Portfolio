import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Layers, 
  ArrowRight, 
  Star, 
  GitFork, 
  FolderGit2, 
  AlertTriangle, 
  RefreshCw,
  X,
  Code2,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import './Projects.css';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Projects = () => {
  const [gitRepos, setGitRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'full-stack', label: 'Full-Stack' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'web-apps', label: 'Web Apps' }
  ];

  const projectsData = [
    {
      id: 'eduleap',
      title: 'EduLeap AI',
      subtitle: 'AI Assistant for Coaching Institutions',
      category: 'ai-ml',
      categoryLabel: 'AI / ML',
      desc: 'Intelligent educational ecosystem using vision-based multi-modal AI to extract timetable data from images and map course information to student preferences. Features analytical progress dashboards.',
      image: '/projects/eduleap_ai_hero.png',
      tags: ['Python', 'React.js', 'FastAPI', 'Google Gemini', 'Vision AI', 'OpenCV'],
      isFeatured: true,
      link: 'https://eduleap-ai.vercel.app',
      github: 'https://github.com/Sarthakgite06/eagle-vision-python',
      breakdown: {
        problem: 'Coaching institutions manually construct schedules and track individual student completion rates using disconnected spreadsheets, causing scheduling bottlenecks and poor visibility.',
        solution: 'An automated multi-modal vision system that parses schedule images, matches courses to student preferences automatically, and provides analytical tracking.',
        architecture: 'React.js Frontend → Python FastAPI Microservice → Google Gemini / Vision AI → MongoDB Atlas.',
        highlights: [
          'Vision-based OCR timetable extraction from image uploads',
          'Analytical task completion dashboard with authentication',
          'Export formatting to Excel and HD graphical reports',
          'Automated student preference mapping algorithms'
        ]
      }
    },
    {
      id: 'healthcard',
      title: 'Centralized Health Card System (CHC)',
      subtitle: 'Unified Clinical Healthcare Platform',
      category: 'full-stack',
      categoryLabel: 'Full-Stack',
      desc: 'Cloud-hosted healthcare platform where patients generate unique digital health cards with unique IDs, and practitioners review patient historical medical charts and append checkup prescriptions.',
      image: '/projects/chc_doctor_dashboard.jpeg',
      tags: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'JWT Auth', 'Vercel'],
      isFeatured: true,
      link: 'https://chc-frontend-brown.vercel.app/login',
      github: 'https://github.com/Sarthakgite06/Centralize-Health-card-project',
      breakdown: {
        problem: 'Patient medical histories are fragmented across various clinic databases, forcing duplicate diagnostic tests and losing critical health records in emergency care.',
        solution: 'A single unique digital Health Card ID enabling medical practitioners to pull up patient charts in seconds and attach digital prescriptions.',
        architecture: 'React.js Client → Express.js REST API Backend → MongoDB Atlas Database → Vercel Cloud.',
        highlights: [
          '5 distinct user roles (Patient, Doctor, Pathologist, Chemist, Admin) with RBAC',
          'Stateless JWT authentication and encrypted security protocols',
          'Single unique Digital Health Card ID generation',
          'Cross-device responsive UI deployed live on Vercel'
        ]
      }
    },
    {
      id: 'hotel',
      title: 'Hotel Management System',
      subtitle: 'Hospitality Automation & Invoicing',
      category: 'full-stack',
      categoryLabel: 'Full-Stack',
      desc: 'Comprehensive hospitality automation dashboard built with React.js frontend and Spring Boot REST API backend. Handles guest registers, room availability, and digital invoicing. Awarded Best Project at SPPU exhibition.',
      image: '/projects/hotel_management.jpg',
      tags: ['React.js', 'Spring Boot', 'REST API', 'MySQL', 'Hotel Automation'],
      isFeatured: true,
      github: 'https://github.com/Sarthakgite06/my-portfolio-backend',
      breakdown: {
        problem: 'Hotel reception desks struggle with double-bookings, manual register logging, and delayed checkout invoicing during high occupancy seasons.',
        solution: 'Centralized booking automation system managing guest check-ins, real-time room availability grids, and automated PDF invoice generation.',
        architecture: 'React.js SPA → Java Spring Boot REST Backend → MySQL Database via JPA/Hibernate.',
        highlights: [
          'Awarded Best Project in SPPU Engineering Exhibition',
          'Real-time room availability matrix and reservation management',
          'Automated digital invoice & bill calculation engine',
          'Role-based access control with secure REST endpoints'
        ]
      }
    },
    {
      id: 'uber',
      title: 'Uber NYC Ride Analysis',
      subtitle: 'Data Analytics & Traffic Heatmaps',
      category: 'data-science',
      categoryLabel: 'Data Science',
      desc: 'Extracted operational matrices from thousands of Uber NYC pickup coordinates. Mapped peak demand windows (5–8 PM) and congested coordinate clusters using Python and Power BI heatmaps.',
      image: '/projects/uber_ride_analysis.jpeg',
      tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI', 'Jupyter'],
      isFeatured: false,
      github: 'https://github.com/Sarthakgite06/Uber-Analysis',
      breakdown: {
        problem: 'Rideshare fleets lack visual insight into high-congested spatial-temporal pickup zones during peak operational hours.',
        solution: 'Exploratory data analysis workflow evaluating spatial pickup coordinates to identify traffic patterns and customer demand density.',
        architecture: 'Python (Pandas, NumPy) Data Wrangling → Matplotlib/Seaborn Analytics → Power BI Interactive Heatmap.',
        highlights: [
          'Identified peak demand windows (5:00 PM – 8:00 PM) in NYC',
          'Geospatial coordinate clustering for dispatch optimization',
          'Visualized passenger traffic bottlenecks using Power BI heatmaps',
          'Comprehensive exploratory data report on ride frequencies'
        ]
      }
    },
    {
      id: 'ims',
      title: 'Inventory Management System',
      subtitle: 'Supply Chain & Real-Time Stock Tracking',
      category: 'full-stack',
      categoryLabel: 'Full-Stack',
      desc: 'Real-time corporate inventory and supply chain application built with a React.js client and Spring Boot REST backend. Tracks stock units, manages suppliers, calculates invoices, and fires low-stock alerts.',
      image: '/projects/ims_dashboard.png',
      tags: ['React.js', 'Spring Boot', 'REST API', 'H2 Database', 'Supply Chain'],
      isFeatured: false,
      github: 'https://github.com/Sarthakgite06/Interportal-project',
      breakdown: {
        problem: 'Unsynchronized stock tracking leads to stockouts, expired inventory, and delayed supplier reorders.',
        solution: 'Automated inventory portal with low-stock alert notifications, supplier directories, and automatic billing calculation.',
        architecture: 'React.js Client → Java Spring Boot Controller/Service Layer → Relational Database.',
        highlights: [
          'Automated low-stock threshold alert notifications',
          'Supplier account management & item procurement records',
          'Itemized invoice calculation with export capabilities',
          'Clean RESTful API implementation with Spring Security'
        ]
      }
    },
    {
      id: 'ecommerce',
      title: 'Full-Stack E-Commerce Platform',
      subtitle: 'Digital Storefront & Checkout Engine',
      category: 'full-stack',
      categoryLabel: 'Full-Stack',
      desc: 'Built a full-stack e-commerce application with product browsing, shopping cart management, seamless checkout, and real-time inventory management. Deployed live on Vercel.',
      image: '/projects/ecommerce_easyshop_screenshot.png',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Vercel'],
      isFeatured: false,
      link: 'https://e-commerce-submission.vercel.app',
      github: 'https://github.com/Sarthakgite06/E-Commerce-Submission',
      breakdown: {
        problem: 'Modern buyers expect rapid product discovery, persistent cart states, and seamless checkout flows across devices.',
        solution: 'Full-featured web storefront with catalog search, real-time inventory synchronization, and user checkout.',
        architecture: 'React.js Client → Express.js API Gateway → MongoDB Database → Vercel Deployment.',
        highlights: [
          'Real-time inventory deduction upon order placement',
          'Dynamic product filter by category and price range',
          'Persistent cart state management',
          'Hosted live on Vercel'
        ]
      }
    },
    {
      id: 'taskmanager',
      title: 'Task Management System',
      subtitle: 'Team Workflow & REST Backend API',
      category: 'full-stack',
      categoryLabel: 'Full-Stack',
      desc: 'Full-stack application with complete CRUD operations, secure RESTful API backend built using Spring Boot and MySQL for team task tracking and deadline management.',
      image: '/projects/task_tracker_dashboard.png',
      tags: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Postman'],
      isFeatured: false,
      github: 'https://github.com/Sarthakgite06/Task-management-project',
      breakdown: {
        problem: 'Project teams lack lightweight task assignment tools with clean REST APIs for custom dashboard integration.',
        solution: 'High-performance Spring Boot task manager with status transitions, assignment boards, and MySQL persistence.',
        architecture: 'React.js Client → Spring Boot REST API → MySQL Relational Database.',
        highlights: [
          'Full CRUD capabilities for tasks, priorities, and deadlines',
          'Task status transitions (Pending, In Progress, Completed)',
          'Optimized MySQL relational database queries',
          'Complete Postman documentation and endpoint verification'
        ]
      }
    },
    {
      id: 'virtualdoctor',
      title: 'IoT Based Virtual Doctor',
      subtitle: 'Remote Telemedicine & Vitals Telemetry',
      category: 'ai-ml',
      categoryLabel: 'AI / ML & IoT',
      desc: 'Designed a remote healthcare solution using IoT sensors to monitor patient vitals in real time and provide immediate health alerts to physicians.',
      image: '/projects/iot_doctor.jpeg',
      tags: ['IoT Sensors', 'Python', 'Flask', 'Telemetry', 'Healthcare Alert'],
      isFeatured: false,
      github: 'https://github.com/Sarthakgite06/FUTURE_FS_01',
      breakdown: {
        problem: 'High risk patients require continuous vital monitoring outside hospital ICUs to prevent sudden health emergencies.',
        solution: 'IoT sensor array transmitting real-time heart rate and temperature telemetry to a cloud monitoring dashboard with alert triggers.',
        architecture: 'IoT Microcontroller Sensors → Python Flask Server → Real-Time Telemetry Dashboard.',
        highlights: [
          'Real-time telemetry streaming of patient pulse & body temperature',
          'Automated emergency threshold health alert trigger',
          'Remote doctor monitoring console',
          'Low-latency data pipeline'
        ]
      }
    },
    {
      id: 'ngo',
      title: 'Basti Ki Pathsala Foundation',
      subtitle: 'NGO Web Platform – Live',
      category: 'web-apps',
      categoryLabel: 'Web Apps',
      desc: 'Designed a responsive, accessible frontend for a Pune-based NGO to boost digital outreach, community volunteer registration, and fundraising. Hosted on Vercel.',
      image: '/projects/basti_ki_pathsala_hero.png',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'UI/UX Design'],
      isFeatured: false,
      link: 'https://basti-ki-pathsala-foundation-projec.vercel.app',
      github: 'https://github.com/Sarthakgite06/Basti-Ki-pathsala-foundation-project',
      breakdown: {
        problem: 'Grassroots educational NGO needed a modern online presence to recruit volunteers and accept community contributions.',
        solution: 'Accessible, mobile-first web portal presenting the NGO mission, student stories, volunteer sign-up, and donation links.',
        architecture: 'HTML5 / CSS3 / JavaScript → Responsive Design → Vercel Deployment.',
        highlights: [
          'Built for Pune-based education NGO foundation',
          'Mobile-first responsive design',
          'Interactive volunteer registration form',
          'Hosted live on Vercel'
        ]
      }
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio Website',
      subtitle: 'Interactive Developer Showcase – Live',
      category: 'web-apps',
      categoryLabel: 'Web Apps',
      desc: 'Developed an interactive, responsive portfolio showcasing skills, experience, and projects with real-time GitHub repository sync; hosted on Vercel & Render.',
      image: '/projects/portfolio_hero_screenshot.png',
      tags: ['React.js', 'Vite', 'CSS3', 'GitHub API', 'Vercel'],
      isFeatured: false,
      link: 'https://sarthak-gite.onrender.com',
      github: 'https://github.com/Sarthakgite06/my-portfolio-frontend',
      breakdown: {
        problem: 'Traditional PDF resumes fail to demonstrate live web interactivity or real-time codebase activity.',
        solution: 'Glassmorphic React portfolio showcasing interactive project modals and real-time GitHub REST API feed.',
        architecture: 'React.js (Vite) → GitHub REST API → Custom Theme CSS → Vercel Cloud.',
        highlights: [
          'Real-time GitHub REST API repository sync',
          'Interactive Project Details Modal with architectural breakdowns',
          'Multi-theme custom CSS design system',
          'Deployed live on Vercel & Render'
        ]
      }
    }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  const fetchGithubRepos = async () => {
    setReposLoading(true);
    setReposError(null);
    try {
      const response = await fetch('https://api.github.com/users/Sarthakgite06/repos?sort=updated&per_page=12');
      if (!response.ok) {
        throw new Error('Failed to retrieve GitHub repositories.');
      }
      const data = await response.json();
      
      const filtered = data
        .filter(repo => !repo.fork)
        .slice(0, 9);
      
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
        <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="projects-subtitle">Production applications, AI innovations, and academic engineering masterpieces</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filter-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Featured projects grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card glass-card ${project.isFeatured ? 'featured-card' : ''}`}
            >
              <div className="project-image-box">
                <img src={project.image} alt={project.title} className="proj-image" />
                <span className="category-tag">{project.categoryLabel}</span>
                {project.isFeatured && (
                  <span className="featured-tag">★ Featured App</span>
                )}
              </div>

              <div className="project-body">
                <h3 className="proj-title">{project.title}</h3>
                <h4 className="proj-subtitle">{project.subtitle}</h4>
                <p className="proj-desc">{project.desc}</p>
                
                <div className="proj-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag-badge">{tag}</span>
                  ))}
                </div>

                <div className="proj-actions-row">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-primary btn-sm flex-1 justify-center"
                  >
                    Details <Info size={15} />
                  </button>

                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-sm flex-1 justify-center"
                    title="View GitHub Repository"
                  >
                    <GithubIcon size={15} /> Code Link
                  </a>

                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-accent btn-sm icon-only"
                      title="Launch Live Application"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                <X size={20} />
              </button>

              <div className="modal-header">
                <span className="category-tag modal-cat">{selectedProject.categoryLabel}</span>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-subtitle">{selectedProject.subtitle}</p>
              </div>

              <div className="modal-body">
                <div className="modal-img-container">
                  <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" />
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title"><Sparkles size={16} /> Overview</h4>
                  <p className="modal-text">{selectedProject.desc}</p>
                </div>

                {selectedProject.breakdown && (
                  <>
                    <div className="modal-section">
                      <h4 className="modal-section-title"><AlertTriangle size={16} /> Problem Statement</h4>
                      <p className="modal-text">{selectedProject.breakdown.problem}</p>
                    </div>

                    <div className="modal-section">
                      <h4 className="modal-section-title"><CheckCircle2 size={16} /> Solution & System Architecture</h4>
                      <p className="modal-text">{selectedProject.breakdown.solution}</p>
                      <div className="architecture-box">
                        <strong>Architecture:</strong> {selectedProject.breakdown.architecture}
                      </div>
                    </div>

                    <div className="modal-section">
                      <h4 className="modal-section-title"><Layers size={16} /> Key Engineering Highlights</h4>
                      <ul className="modal-highlights-list">
                        {selectedProject.breakdown.highlights.map((h, i) => (
                          <li key={i}><CheckCircle2 size={14} className="highlight-icon" /> {h}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div className="modal-section">
                  <h4 className="modal-section-title"><Code2 size={16} /> Technologies & Tools</h4>
                  <div className="proj-tags">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="tag-badge modal-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary flex-1 justify-center"
                >
                  <GithubIcon size={18} /> GitHub Repository
                </a>
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-accent flex-1 justify-center"
                  >
                    Launch Live Demo <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic GitHub repositories showcase */}
        <div className="github-showcase-section" style={{ marginTop: '80px' }}>
          <div className="github-section-header">
            <div>
              <h3 className="github-section-title">Open Source Repositories</h3>
              <p className="github-section-subtitle">Synced live from Sarthak's GitHub profile (@Sarthakgite06)</p>
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
                Go to GitHub Profile (@Sarthakgite06)
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
                    {repo.description || "Software codebase developed by Sarthak Gite with clean architecture and robust implementation."}
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
