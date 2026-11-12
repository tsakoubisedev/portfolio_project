import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Database,
  Github,
  Gitlab,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Radio,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";

const profilePhoto = new URL("../Image/profile_photo.png", import.meta.url).href;
const aogProjectImage = new URL("../Image/AOG_PICTURE.png", import.meta.url).href;
const royalSquareProjectImage = new URL("../Image/royal square application.jpg", import.meta.url).href;
const contactEmail = "tsakoubise@gmail.com";

const navigation = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

const skillGroups = [
  {
    number: "01",
    title: "Programming",
    icon: Code2,
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    number: "02",
    title: "Web development",
    icon: Globe2,
    skills: ["HTML", "CSS", "REST basics", "Kotlin · Android"],
  },
  {
    number: "03",
    title: "Databases & design",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "CRUD", "Normalization"],
  },
  {
    number: "04",
    title: "DevOps & workflow",
    icon: Terminal,
    skills: ["Docker", "DevSecOps", "GitLab CI/CD", "Git", "Linux CLI", "Android Studio"],
  },
];

const projects = [
  {
    index: "01",
    name: "AOG Manager",
    category: "ELECTRON · CHURCH MANAGEMENT",
    description:
      "Built and deployed an Electron app for church member records, serving teams, and attendance, using GitHub Copilot during development. Designed the relational PostgreSQL schema with duplicate-safe attendance keys, then implemented Firebase-authenticated multi-organization access, ADMIN and TEAM_LEAD roles, member search, team filtering, and retry-safe transactional attendance recording.",
    stack: ["Electron", "Firebase Auth", "PostgreSQL", "Role-based access"],
    visual: "aog",
    icon: Layers3,
    repositoryUrl: null,
    demoUrl: "https://aogmanager.netlify.app/",
  },
  {
    index: "02",
    name: "Google API Calendar",
    category: "PYTHON · GOOGLE CALENDAR API",
    description:
      "Co-engineered an automated booking pipeline for peer-to-peer mentoring with the Google Calendar API. Implemented OAuth 2.0 authentication and authorization, real-time conflict checks to prevent double bookings, event deletion and CSV-based event matching, plus NumPy-powered event display in the CLI.",
    stack: ["Python", "Google Calendar API", "OAuth 2.0"],
    visual: "api",
    icon: Braces,
    repositoryUrl: null,
    demoUrl: null,
  },
  {
    index: "03",
    name: "Royal Square Financial App",
    category: "AFRIHACKATHON · FINTECH",
    description:
      "Designed the real-time client dashboard for financial position and net worth, and contributed to goal tracking and automated reminders for tasks, documents, renewals, and reviews. Built with a team as a Kotlin Android client and companion admin web app for a brokerage and financial services provider.",
    stack: ["Kotlin", "Android", "Admin web app", "AfriHackathon"],
    visual: "finance",
    icon: Layers3,
    repositoryUrl: "https://gitlab.com/botshelomogale02/royalsquarefinacial",
    demoUrl: null,
  },
];

const learning = [
  { title: "Open source", detail: "Interested in contributing" },
  { title: "Software architecture", detail: "Exploring better systems" },
  { title: "Tech communities", detail: "Learning and connecting" },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><Asterisk size={13} /> {eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}

function ProjectVisual({ variant, Icon }: { variant: string; Icon: typeof Code2 }) {
  return (
    <div className={`project-visual visual-${variant}`} aria-hidden="true">
      <div className="visual-topline">
        <span className="visual-mark"><Icon size={15} /></span>
        <span className="visual-dots"><i /><i /><i /></span>
      </div>
      {variant === "aog" && (
        <img className="aog-project-image" src={aogProjectImage} alt="" />
      )}
      {variant === "robot" && (
        <div className="robot-scene">
          <div className="robot-orbit orbit-one" /><div className="robot-orbit orbit-two" />
          <div className="robot-core"><span /><i /><i /></div>
          <span className="scene-label">WORLD // READY</span>
        </div>
      )}
      {variant === "sentinel" && (
        <div className="sentinel-scene">
          <div className="sentinel-ring"><ShieldCheck size={43} strokeWidth={1} /></div>
          <div className="scan-line" />
          <span className="scene-label">SYSTEM STATUS <b>· MONITORING</b></span>
          <span className="signal signal-one" /><span className="signal signal-two" />
        </div>
      )}
      {variant === "api" && (
        <div className="api-code">
          <span><b>01</b> <i>GET</i> /api/projects</span>
          <span><b>02</b> <em>200</em> OK</span>
          <span><b>03</b> {"{"} <i>status</i>: <em>"ready"</em> {"}"}</span>
          <span><b>04</b> <i>response</i> → <em>JSON</em></span>
        </div>
      )}
      {variant === "finance" && (
        <img className="royal-square-project-image" src={royalSquareProjectImage} alt="" />
      )}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map(([, href]) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let revealObserver: IntersectionObserver | undefined;
    if (!reducedMotion && "IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-in-view", entry.isIntersecting);
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { threshold: 0.14 },
      );
      document.documentElement.classList.add("reveal-ready");
      document.querySelectorAll(".reveal").forEach((element) => revealObserver?.observe(element));
    }

    return () => {
      observer.disconnect();
      revealObserver?.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "");
    const email = String(fields.get("email") ?? "");
    const subject = String(fields.get("subject") ?? "Portfolio enquiry");
    const message = String(fields.get("message") ?? "");
    const body = `Hi, I'm ${name} (${email}).\n\n${message}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
  }

  function handleNavigationHover(href: string) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelector<HTMLElement>(href)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div className="site-shell min-h-screen bg-ink text-white">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Tsako Ubise, home">
          <span className="wordmark-icon">TU<span>.</span></span>
          <span className="wordmark-name">TSAKO UBISE <small>SOFTWARE ENGINEER</small></span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? "active" : undefined}
              aria-current={activeSection === href.slice(1) ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => handleNavigationHover(href)}
            >
              {activeSection === href.slice(1) && (
                <span className="nav-active-indicator" aria-hidden="true" />
              )}
              <span>{label}</span>
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            <span>Let&apos;s talk</span> <ArrowUpRight size={14} />
          </a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="availability-dot" /> TSAKO UBISE <span className="hero-eyebrow-divider">/</span> SOFTWARE ENGINEER
            </p>
            <h1>
              Building digital<br />solutions. <span>Engineering</span><br /><span className="hero-tomorrow">tomorrow.</span>
            </h1>
            <p className="hero-intro">
              I&apos;m a Software Engineer and final-year AI Software Engineering student at WeThinkCode_, also enrolled in the ALX Africa Data Analytics programme. I bring 2+ years of hands-on full-stack and mobile development experience, strong Python and Java skills, and experience with Docker, GitLab CI/CD, and software deployment.
            </p>
            <div className="hero-actions">
              <a className="button button-accent button-view-work" href="#projects"><span>View my work</span> <ArrowDownRight size={17} /></a>
              <a className="button button-outline" href="/Tsako-Ubise-CV.pdf" download="Tsako-Ubise-CV.pdf">Download CV <ArrowDown size={16} /></a>
            </div>
            <div className="hero-socials">
              <span>FIND ME ON</span>
              <a className="social-link" href="https://linkedin.com/in/tsako-ubise" target="_blank" rel="noreferrer"><Linkedin size={16} /><span>LinkedIn</span></a>
              <a className="social-link" href="https://github.com/tsakoubisedev" target="_blank" rel="noreferrer"><Github size={16} /><span>GitHub</span></a>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-coordinate">FIG. 01 <span>— DIGITAL CRAFT</span></div>
            <div className="portrait-frame">
              <img className="profile-photo" src={profilePhoto} alt="Tsako Ubise" loading="eager" fetchPriority="high" />
              <div className="portrait-grid" />
              <div className="portrait-glow" />
              <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
              <span className="portrait-index">TU / 001</span>
              <span className="portrait-coordinate">26°12&apos; S<br />28°02&apos; E</span>
              <div className="portrait-crosshair crosshair-one">+</div><div className="portrait-crosshair crosshair-two">+</div>
            </div>
            <div className="art-caption"><span>SOFTWARE ENGINEER</span><span>CREATING WITH INTENTION <Asterisk size={12} /></span></div>
            <div className="floating-tag">
              <span className="tag-pulse" /> FULL-STACK &amp;<br />MOBILE DEVELOPMENT
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
          <span className="hero-index">01 / 05</span>
        </section>

        <section className="about section-wrap" id="about">
          <Reveal><SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curious by nature.<br /><span>Engineer by choice.</span></>} note="A thoughtful approach to building technology that works for people." /></Reveal>
          <div className="about-layout">
            <Reveal className="about-main">
              <p className="about-lead">I&apos;m <span>Tsako Ubise</span> — a Software Engineer and final-year AI Software Engineering student who enjoys turning complex problems into useful software.</p>
              <p className="body-copy">With 2+ years of hands-on full-stack and mobile development experience, I&apos;ve built client websites, desktop and Android apps, and automated booking workflows. I value test-driven development, strong problem-solving, and thoughtful collaboration, and I&apos;m always learning through hands-on work.</p>
              <a className="text-link" href="#contact">A little more about working together <ArrowRight size={16} /></a>
            </Reveal>
            <Reveal className="about-aside" delay={0.12}>
              <div className="about-card">
                <span className="card-kicker">MY APPROACH</span>
                <div className="approach-item"><span>01</span><div><b>Think deeply</b><small>Understand the problem before writing code.</small></div></div>
                <div className="approach-item"><span>02</span><div><b>Build thoughtfully</b><small>Make the useful thing, beautifully.</small></div></div>
                <div className="approach-item"><span>03</span><div><b>Keep learning</b><small>Stay curious. Improve continuously.</small></div></div>
              </div>
              <div className="about-signoff"><Asterisk size={18} /><span>GOOD SOFTWARE STARTS WITH GOOD QUESTIONS.</span></div>
            </Reveal>
          </div>
        </section>

        <section className="skills section-wrap" id="skills">
          <Reveal><SectionHeading eyebrow="THE TOOLKIT" title={<>Skills built for<br /><span>what&apos;s next.</span></>} note="A versatile foundation, always growing through practice and curiosity." /></Reveal>
          <div className="skills-grid">
            {skillGroups.map((group, i) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={i * 0.07}>
                  <article className="skill-card">
                    <div className="skill-card-top"><span>{group.number}</span><Icon size={18} strokeWidth={1.5} /></div>
                    <h3>{group.title}</h3>
                    <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="learning-strip">
            <div className="learning-heading"><Radio size={17} /><span>CURRENTLY EXPLORING</span></div>
            {learning.map((item) => <div className="learning-item" key={item.title}><span className="learning-dot" /><div><b>{item.title}</b><small>{item.detail}</small></div></div>)}
          </Reveal>
        </section>

        <section className="projects section-wrap" id="projects">
          <Reveal><SectionHeading eyebrow="SELECTED WORK" title={<>Built with purpose.<br /><span>Made to matter.</span></>} note="A selection of projects exploring thoughtful engineering and practical solutions." /></Reveal>
          <div className="projects-grid">
            {projects.map((project, i) => {
              const Icon = project.icon;
              const primaryUrl = project.demoUrl ?? project.repositoryUrl;
              const primaryLinkLabel = project.demoUrl ? "live app" : "repository";
              return (
                <Reveal key={project.name} delay={(i % 2) * 0.1}>
                  <article className="project-card">
                    {primaryUrl ? (
                      <a
                        className="project-image-link"
                        href={primaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name} ${primaryLinkLabel}`}
                      >
                        <ProjectVisual variant={project.visual} Icon={Icon} />
                      </a>
                    ) : (
                      <ProjectVisual variant={project.visual} Icon={Icon} />
                    )}
                    <div className="project-info">
                      <div className="project-meta"><span>{project.category}</span><span>{project.index}</span></div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                      <div className="project-links">
                        {project.repositoryUrl ? (
                          <a className="project-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                            <Gitlab size={14} /> View GitLab repository
                          </a>
                        ) : (
                          <span className="project-link-placeholder"><Github size={14} /> Repository URL to be added</span>
                        )}
                        {project.demoUrl ? (
                          <a className="project-link" href={project.demoUrl} target="_blank" rel="noreferrer">
                            <ArrowUpRight size={14} /> Open live app
                          </a>
                        ) : (
                          <span className="project-link-placeholder"><ArrowUpRight size={14} /> Demo link to be added</span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="projects-footnote"><span><Asterisk size={13} /> SOME PROJECT LINKS ARE PLACEHOLDERS.</span><a href="#contact">Have a project in mind? <ArrowRight size={15} /></a></Reveal>
        </section>

        <section className="experience section-wrap" id="experience">
          <Reveal><SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Learning that moves<br /><span>me forward.</span></>} note="Education, exploration, and a commitment to keep getting better." /></Reveal>
          <div className="journey-layout">
            <div className="timeline">
              <Reveal>
                <article className="timeline-entry">
                  <div className="timeline-marker"><span /></div>
                  <div className="timeline-date">CURRENT · FINAL YEAR</div>
                  <div className="timeline-card"><span className="timeline-type">EDUCATION</span><h3>AI Software Engineering</h3><p className="timeline-place">WeThinkCode_</p><p>Final-year student building software engineering skills and practical experience.</p></div>
                </article>
              </Reveal>
              <Reveal delay={0.1}>
                <article className="timeline-entry">
                  <div className="timeline-marker"><span /></div>
                  <div className="timeline-date">DATA ANALYTICS</div>
                  <div className="timeline-card"><span className="timeline-type">PROFESSIONAL DEVELOPMENT</span><h3>Data Analytics Programme</h3><p className="timeline-place">ALX Africa · Enrolled</p><p>Developing data analytics capability alongside software engineering studies.</p></div>
                </article>
              </Reveal>
              <Reveal delay={0.2}>
                <article className="timeline-entry">
                  <div className="timeline-marker"><span /></div>
                  <div className="timeline-date">FREELANCE · WEB</div>
                  <div className="timeline-card"><span className="timeline-type">FREELANCE DEVELOPER</span><h3>Da Silva Flooring &amp; Construction</h3><p className="timeline-place">Company website</p><p>Built and maintain a multi-page business website, including a filterable portfolio gallery; audited the site, fixed bugs, and rebuilt the footer.</p></div>
                </article>
              </Reveal>
            </div>
            <Reveal className="cert-card" delay={0.12}>
              <div className="cert-icon"><ShieldCheck size={22} strokeWidth={1.4} /></div>
              <p className="eyebrow">CERTIFICATIONS &amp; DEVELOPMENT</p>
              <h3>Keep learning.<br /><span>Keep building.</span></h3>
              <p className="cert-copy">Completed training and areas I continue to explore.</p>
              <div className="cert-divider" />
              <div className="cert-list">
                <div><span>01</span><p><b>Introduction to Cybersecurity</b><small>Cisco Networking Academy · Completed</small></p><ShieldCheck size={14} /></div>
                <div><span>02</span><p><b>Interests</b><small>Open source · software architecture</small></p><ArrowUpRight size={14} /></div>
                <div><span>03</span><p><b>Community</b><small>Open-source contributions · tech communities</small></p><ArrowUpRight size={14} /></div>
              </div>
              <a className="cert-link" href="#contact">Let&apos;s build something together <ArrowRight size={15} /></a>
            </Reveal>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <Reveal><SectionHeading eyebrow="YOUR NEXT MOVE" title={<>Have an idea?<br /><span>Let&apos;s build something.</span></>} note="Open to conversations, collaborations, and opportunities to do meaningful work." /></Reveal>
          <div className="contact-layout">
            <Reveal className="contact-details">
              <p className="body-copy">Have a project in mind, an opportunity to share, or just want to connect? My inbox is always open.</p>
              <a className="email-link" href={`mailto:${contactEmail}`}><Mail size={18} /> {contactEmail} <ArrowUpRight size={16} /></a>
              <a className="phone-link" href="tel:+27787680454">+27 78 768 0454</a>
              <div className="contact-socials">
                <a href="https://linkedin.com/in/tsako-ubise" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} /></a>
                <a href="https://github.com/tsakoubisedev" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={13} /></a>
              </div>
              <div className="contact-note"><span className="availability-dot" /> OPEN TO MEANINGFUL COLLABORATION</div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.1}>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <label>Your name<input name="name" type="text" placeholder="How should I address you?" required /></label>
                  <label>Email address<input name="email" type="email" placeholder="you@company.com" required /></label>
                </div>
                <label>Subject<input name="subject" type="text" placeholder="What would you like to discuss?" required /></label>
                <label>Your message<textarea name="message" rows={4} placeholder="Tell me a little about it..." required /></label>
                <button className="button button-accent form-submit" type="submit">{formSent ? <>Email draft opened <Check size={16} /></> : <>Let&apos;s connect <ArrowUpRight size={16} /></>}</button>
                <p className="form-note">Your email app will open with your message ready to send.</p>
              </form>
            </Reveal>
          </div>
        </section>

        <section className="closing section-wrap">
          <Reveal className="closing-inner">
            <div><span className="closing-kicker"><Asterisk size={13} /> BUILT WITH CURIOSITY</span><p>Thoughtful software.<br /><span>Real-world impact.</span></p></div>
            <a href="#home" className="back-top" aria-label="Back to top"><ArrowRight size={18} /></a>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-mark" href="#home"><span className="wordmark-icon">TU<span>.</span></span><span className="wordmark-name">TSAKO UBISE <small>SOFTWARE ENGINEER</small></span></a>
        <p>© {new Date().getFullYear()} Tsako Ubise. Designed with intention.</p>
        <a href="#home" className="footer-top">BACK TO TOP <ArrowUpRight size={13} /></a>
      </footer>
    </div>
  );
}

export default App;
