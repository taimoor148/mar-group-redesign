'use client';
import { animate } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent } from 'react';

const links = [['About', '#about'], ['Businesses', '#businesses'], ['Approach', '#approach'], ['Projects', '#projects']];
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); document.getElementById('menu-toggle')?.focus(); } }}>
    <div className="wrap nav">
      <a className="wordmark" href="#top" onClick={() => setOpen(false)} aria-label="MAR Group home"><span className="brand-icon" aria-hidden="true">M</span><span>MAR GROUP<small>OF COMPANIES</small></span></a>
      <button id="menu-toggle" className="menu-toggle" type="button" aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="main-nav" aria-label="Main navigation" data-open={open}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s Talk <span className="arrow-icon" aria-hidden="true"/></a>
      </nav>
    </div>
  </header>;
}
export function Reveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target, { opacity: [0.82, 1], y: [14, 0] }, { duration: 0.56, ease: 'easeOut' });
      observer.unobserve(entry.target);
    }), { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
export function ContactForm() {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) ?? '').trim();
    if (!read('name') || !read('subject') || !read('message')) {
      setError('Enter your name, subject and message. Fields containing only spaces are empty.');
      return;
    }
    const body = [read('message'), '', `From: ${read('name')}`, `Email: ${read('email')}`, `Company: ${read('company') || '—'}`].join('\r\n');
    setDraft(`mailto:info@margroup.com.pk?subject=${encodeURIComponent(read('subject'))}&body=${encodeURIComponent(body)}`);
  }
  return <form className="contact-form" onSubmit={prepare} onChange={() => { setError(''); setDraft(''); }}>
    <div className="fields">
      <label>Name <input name="name" autoComplete="name" required maxLength={100}/></label>
      <label>Email <input name="email" type="email" autoComplete="email" required maxLength={180}/></label>
      <label>Company <span>(optional)</span><input name="company" autoComplete="organization" maxLength={120}/></label>
      <label>Subject <input name="subject" required maxLength={120}/></label>
      <label className="full">Message <textarea name="message" rows={4} required maxLength={600}/></label>
    </div>
    <p className="form-note">Prepare a draft, then open it in your email app to send it.</p>
    <button className="btn primary" type="submit">Prepare email draft <span className="arrow-icon" aria-hidden="true"/></button>
    {error && <p className="error" role="alert">{error}</p>}
    {draft && <div className="draft"><p role="status">Your draft is ready.</p><a className="text-link" href={draft}>Open email app</a></div>}
  </form>;
}

type Venture = { name: string; category: string; text: string; href: string; image?: string };

function moveReflection(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse' ||
      !matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
  const surface = event.currentTarget;
  const bounds = surface.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
  surface.style.setProperty('--reflect-x', `${x * 100}%`);
  surface.style.setProperty('--reflect-y', `${y * 100}%`);
  surface.style.setProperty('--pitch', `${(0.5 - y) * 6}deg`);
  surface.style.setProperty('--yaw', `${(x - 0.5) * 6}deg`);
}

function resetReflection(event: PointerEvent<HTMLAnchorElement>) {
  for (const property of ['--reflect-x', '--reflect-y', '--pitch', '--yaw']) {
    event.currentTarget.style.removeProperty(property);
  }
}

export function VentureCards({ ventures }: { ventures: Venture[] }) {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!grid.current || !('IntersectionObserver' in window) ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('venture-enter');
        const delay = Number((entry.target as HTMLElement).dataset.revealIndex) * 0.075;
        animate(entry.target, { y: [12, 0] }, { type: 'spring', stiffness: 270, damping: 29, delay });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.14 });
    grid.current.querySelectorAll('.venture-item').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <div className="venture-grid" ref={grid}>
    {ventures.map((venture, index) => <article className="venture-item" key={venture.name} data-reveal-index={index} style={{ '--reveal-delay': `${index * 75}ms` } as CSSProperties}>
      <a className="venture-card" href={venture.href} onPointerMove={moveReflection} onPointerLeave={resetReflection} onPointerCancel={resetReflection}>
        <div className="venture-surface">
          {venture.image && <div className="venture-media"><Image src={venture.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw"/></div>}
          <div className="venture-content">
            <p className="category">{venture.category}</p>
            <h3>{venture.name}</h3>
            <p className="venture-description">{venture.text}</p>
            <span className="venture-cta">Explore <span className="arrow-icon" aria-hidden="true"/></span>
          </div>
        </div>
      </a>
    </article>)}
  </div>;
}
