import Image from 'next/image';
import { ContactForm, Header, Reveal, VentureCards } from './interactive';

const base = 'https://margroup.com.pk';
const ventures = [
  { name: 'Spixhost', category: 'Cloud & IT', text: 'Cloud hosting, business email and digital infrastructure for organizations.', href: 'https://spixhost.com/', image: '/cloud.webp' },
  { name: 'ZING Pakistan', category: 'Consumer & e-commerce', text: 'A Pakistani fragrance brand offering perfumes, ouds and gift collections.', href: 'https://zing.pk/pages/the-zing-story', image: '/commerce.webp' },
  { name: 'MAR Foundation', category: 'Social impact', text: 'The group’s charitable initiative, supported by ZING Pakistan.', href: 'https://zing.pk/pages/the-zing-story' },
  { name: 'Birdagents', category: 'Pet retail', text: 'A Lahore-based retailer of bird supplies, pet food and accessories.', href: 'https://birdagents.pk/pages/about-us' },
];
const pillars = [
  ['Business Innovation', 'Innovation and collaboration are among the group’s stated values.'],
  ['Customer-Focused Solutions', 'MAR Group describes a discovery-led process for tailoring IT services to each client’s needs.'],
  ['Diverse Business Portfolio', 'The portfolio spans technology, consumer products and a charitable initiative.'],
  ['Long-Term Growth', 'The group’s service approach emphasizes ongoing support and value beyond deployment.'],
  ['Technology-Driven Approach', 'Its published services include cloud computing, software development and cybersecurity.'],
];
export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a><Header/><Reveal/>
    <main id="main" tabIndex={-1}>
      <section className="hero" id="top" tabIndex={-1} aria-labelledby="hero-title">
        <div className="wrap hero-content">
          <p className="eyebrow light">MAR GROUP OF COMPANIES</p>
          <h1 id="hero-title">Building Businesses.<br/><span>Creating Digital Impact.</span></h1>
          <p className="hero-copy">MAR Group brings together innovative businesses, technology, and solutions to create meaningful opportunities and long-term growth.</p>
          <div className="flex flex-wrap gap-3"><a className="btn primary" href="#businesses">Explore Our Businesses <span className="arrow-icon" aria-hidden="true"/></a><a className="btn outline" href="#contact">Let’s Talk <span className="arrow-icon" aria-hidden="true"/></a></div>
        </div>
        <div className="hero-architecture">
          <Image src="/hero.webp" alt="" fill preload sizes="(max-width: 760px) 100vw, 65vw"/>
        </div>
        <div className="wrap hero-bottom"><a href="#about"><span aria-hidden="true">↓</span> Explore the group</a><span>LAHORE, PAKISTAN</span></div>
      </section>
      <section className="section wrap about" id="about" tabIndex={-1} data-reveal>
        <div><p className="eyebrow">ABOUT THE GROUP</p><h2>One Group.<br/>Multiple Possibilities.</h2></div>
        <div><p className="intro">MAR Group is a diversified business group based in Lahore, Pakistan.</p><p>Its portfolio brings together cloud and IT services, consumer brands and a charitable initiative. Across its technology work, the group offers managed services, software development and cloud solutions.</p><a className="text-link" href={base + '/about-us/'}>Discover Our Story <span className="arrow-icon" aria-hidden="true"/></a></div>
      </section>
      <section className="section portfolio" id="businesses" tabIndex={-1}><div className="wrap" data-reveal>
        <p className="eyebrow">OUR PORTFOLIO</p><h2>Meet our businesses.</h2>
        <VentureCards ventures={ventures}/>
      </div></section>
      <section className="section why" id="approach" tabIndex={-1}><div className="wrap split" data-reveal>
        <div><p className="eyebrow light">WHY MAR GROUP</p><h2>How we work.</h2><a className="text-link" href={base + '/how-we-do/'}>See our approach <span className="arrow-icon" aria-hidden="true"/></a></div>
        <div className="pillars">{pillars.map(([title, description]) => <details key={title}><summary>{title}</summary><p>{description}</p></details>)}</div>
      </div></section>
      <section className="section wrap" id="projects" tabIndex={-1} data-reveal>
        <p className="eyebrow">CASE STUDIES & PROJECTS</p><h2>Selected project concepts.</h2>
        <div className="projects">
          <article><div className="project-image"><Image src="/cloud.webp" alt="Illustrative server racks" fill sizes="(max-width: 700px) 100vw, 55vw"/><span>Demo placeholder</span></div><p className="category">Cloud infrastructure</p><h3>Cloud readiness assessment</h3><p>An illustrative assessment of infrastructure, dependencies and migration priorities.</p><details><summary>View project concept</summary><p>Example scope: inventory systems, map dependencies and outline a phased migration plan. This is an illustrative example.</p></details></article>
          <article><div className="project-image"><Image src="/commerce.webp" alt="Illustrative fragrance product photograph" fill sizes="(max-width: 700px) 100vw, 40vw"/><span>Demo placeholder</span></div><p className="category">Digital commerce</p><h3>Online storefront redesign</h3><p>An illustrative redesign focused on product discovery and a simpler path to checkout.</p><details><summary>View project concept</summary><p>Example scope: reorganize product categories, refine the mobile product page and simplify the checkout journey. This is an illustrative example.</p></details></article>
        </div>
      </section>
      <section className="section contact" id="contact" tabIndex={-1}><div className="wrap split" data-reveal>
        <div><p className="eyebrow light">GET IN TOUCH</p><h2>Let’s Build Something Meaningful Together.</h2><p>Tell us what you’re working on.</p><div className="contact-links"><a href="mailto:info@margroup.com.pk">info@margroup.com.pk</a><a href="tel:+923111222735">+92 311 122 2735</a><span>Johar Town, Lahore, Pakistan</span></div></div>
        <ContactForm/>
      </div></section>
    </main>
    <footer><div className="wrap footer-grid">
      <div><a className="wordmark" href="#top" aria-label="MAR Group home"><span className="brand-icon" aria-hidden="true">M</span><span>MAR GROUP<small>OF COMPANIES</small></span></a><p>Corporate website redesign concept</p></div>
      <div><h2>Explore</h2><a href="#about">About</a><a href="#businesses">Businesses</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
      <div><h2>Our businesses</h2>{ventures.map(v => <a href={v.href} key={v.name}>{v.name}</a>)}</div>
      <div><h2>Connect</h2><a href="mailto:info@margroup.com.pk">info@margroup.com.pk</a><a href="tel:+923111222735">+92 311 122 2735</a><a href="https://www.linkedin.com/company/margroupco">LinkedIn</a><a href="https://www.facebook.com/margroupco">Facebook</a></div>
    </div><div className="wrap footer-bottom"><small>© {new Date().getFullYear()} MAR Group of Companies</small><a href="#top">Back to top</a></div></footer>
  </>;
}
