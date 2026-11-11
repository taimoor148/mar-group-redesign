import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = {
  title: 'MAR Group of Companies | Corporate Website Concept',
  description: 'Explore the businesses and technology services of MAR Group of Companies in this corporate website redesign concept.',
  robots: { index: false, follow: false },
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
