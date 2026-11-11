'use client';
import { useEffect, useState, type FormEvent } from 'react';

const links = [['About', '#about'], ['Businesses', '#businesses'], ['Approach', '#approach'], ['Projects', '#projects']];
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); document.getElementById('menu-toggle')?.focus(); } }}>
    <div className="wrap nav">
      <a className="wordmark" href="#top" onClick={() => setOpen(false)} aria-label="MAR Group home"><span className="brand-icon" aria-hidden="true">M</span><span>MAR GROUP<small>OF COMPANIES</small></span></a>
      <button id="menu-toggle" className="menu-toggle" type="button" aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="main-nav" aria-label="Main navigation" data-open={open}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s Talk <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
export function Reveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate([{ opacity: 0.7, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 560, easing: 'ease-out' });
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
    <button className="btn primary" type="submit">Prepare email draft <span aria-hidden="true">↗</span></button>
    {error && <p className="error" role="alert">{error}</p>}
    {draft && <div className="draft"><p role="status">Your draft is ready.</p><a className="text-link" href={draft}>Open email app ↗</a></div>}
  </form>;
}

export function LoadingIntro() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = document.querySelector<HTMLImageElement>('.hero-architecture img');
    let disposed = false;
    const finish = () => {
      if (!disposed) setReady(true);
    };
    const deadline = window.setTimeout(finish, 1500);
    if (image?.decode) void image.decode().then(finish, finish);
    else finish();
    return () => {
      disposed = true;
      window.clearTimeout(deadline);
    };
  }, []);

  return <div className="loading-intro" data-ready={ready} aria-hidden="true">
    <div className="loading-lockup">
      <span className="loading-brand">MAR GROUP<small>OF COMPANIES</small></span>
      <span className="loading-rule"/>
    </div>
  </div>;
}
