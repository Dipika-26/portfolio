// React Components
const { useState, useEffect } = React;

// Header Component
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="nav">
                <div className="logo">Dipika's Portfolio</div>
                
                <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <li><a onClick={() => scrollToSection('home')}>Home</a></li>
                    <li><a onClick={() => scrollToSection('about')}>About</a></li>
                    <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
                    <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
                    <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
                </ul>

                <button 
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    ☰
                </button>
            </nav>
        </header>
    );
};

// Hero Component
const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = "Hello, I'm Dipika";

    useEffect(() => {
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < fullText.length) {
                setDisplayText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);

        return () => clearInterval(typingEffect);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="hero">
            <div className="container">
                <h1>{displayText}<span className="cursor">|</span></h1>
                <p>Web Developer & Creative Designer</p>
                <div className="hero-btns">
                    <button 
                        className="btn" 
                        onClick={() => scrollToSection('projects')}
                    >
                        View My Work
                    </button>
                    <button 
                        className="btn btn-outline"
                        onClick={() => scrollToSection('contact')}
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        </section>
    );
};

// About Component
const About = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="section">
            <div className="container">
                <h2>About Me</h2>
                <div className={`about-content ${visible ? 'visible' : ''}`}>
                    <div className="profile-img-container">
                        <div className="profile-img">👩‍💻</div>
                    </div>
                    <div className="about-text">
                        <p>I'm a passionate web developer who loves creating beautiful and functional websites. I enjoy turning complex problems into simple, beautiful designs.</p>
                        <p>My goal is to build web applications that provide the best user experience while being efficient and maintainable.</p>
                        <p>When I'm not coding, you can find me learning new technologies, reading books, or exploring creative design ideas.</p>
                        
                        <div className="about-stats">
                            <div className="stat-item">
                                <span className="stat-number">2+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Projects Completed</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Happy Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Skills Component
const Skills = () => {
    const [skills] = useState([
        { 
            name: 'Frontend', 
            description: 'HTML, CSS, JavaScript, React',
            level: 90
        },
        { 
            name: 'Backend', 
            description: 'Node.js, Express, MongoDB',
            level: 80
        },
        { 
            name: 'Tools', 
            description: 'Git, VS Code, Figma, Chrome DevTools',
            level: 85
        },
        { 
            name: 'Soft Skills', 
            description: 'Problem Solving, Teamwork, Communication',
            level: 95
        }
    ]);

    return (
        <section id="skills" className="section bg-light">
            <div className="container">
                <h2>My Skills</h2>
                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <SkillCard 
                            key={index}
                            name={skill.name}
                            description={skill.description}
                            level={skill.level}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Skill Card Component
const SkillCard = ({ name, description, level }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedLevel(level);
        }, 300);
        return () => clearTimeout(timer);
    }, [level]);

    return (
        <div className="skill-card">
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="skill-level">
                <div className="skill-progress">
                    <div 
                        className="skill-progress-bar"
                        style={{ width: `${animatedLevel}%` }}
                    ></div>
                </div>
                <span className="skill-percentage">{animatedLevel}%</span>
            </div>
        </div>
    );
};

// Projects Component
const Projects = () => {
    const [projects] = useState([
        { 
            id: 1,
            title: 'E-Commerce Website', 
            description: 'A fully responsive online store with shopping cart functionality built with React and Node.js.',
            tech: 'React, Node.js, MongoDB',
            status: 'Completed'
        },
        { 
            id: 2,
            title: 'Task Manager App', 
            description: 'A React-based web application for managing daily tasks and to-do lists with drag & drop functionality.',
            tech: 'React, Local Storage, CSS3',
            status: 'In Progress'
        },
        { 
            id: 3,
            title: 'Weather Dashboard', 
            description: 'Real-time weather information dashboard with beautiful UI design and multiple location support.',
            tech: 'JavaScript, API Integration, Chart.js',
            status: 'Completed'
        }
    ]);

    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(project => project.status === filter);

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2>My Projects</h2>
                
                <div className="project-filters">
                    <button 
                        className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                        onClick={() => setFilter('All')}
                    >
                        All
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`}
                        onClick={() => setFilter('Completed')}
                    >
                        Completed
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'In Progress' ? 'active' : ''}`}
                        onClick={() => setFilter('In Progress')}
                    >
                        In Progress
                    </button>
                </div>

                <div className="projects-grid">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Project Card Component
const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="project-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="project-image">
                Project {project.id}
                {isHovered && (
                    <div className="project-overlay">
                        <button className="btn">View Details</button>
                    </div>
                )}
            </div>
            <div className="project-content">
                <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                    </span>
                </div>
                <p>{project.description}</p>
                <p className="tech-stack">{project.tech}</p>
            </div>
        </div>
    );
};

// Contact Component
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section id="contact" className="section bg-light">
            <div className="container">
                <h2>Get In Touch</h2>
                
                {submitted && (
                    <div className="success-message">
                        ✅ Thank you for your message! I'll get back to you soon.
                    </div>
                )}

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>I'm always interested in new opportunities and collaborations.</p>
                        
                        <div className="contact-item">
                            <strong>📧 Email:</strong>
                            <span>dipika.kadam23@pcu.edu.in</span>
                        </div>
                        <div className="contact-item">
                            <strong>📱 Phone:</strong>
                            <span>+91 9226025507</span>
                        </div>
                        <div className="contact-item">
                            <strong>📍 Location:</strong>
                            <span>Pune, India</span>
                        </div>
                    </div>

                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {currentYear} Dipika's Portfolio. Built with React.</p>
                <div className="social-links">
                    <a href="#" className="social-link">GitHub</a>
                    <a href="#" className="social-link">LinkedIn</a>
                    <a href="#" className="social-link">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="app">
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
};

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));