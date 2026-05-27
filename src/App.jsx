import './App.css';
import { useReveal } from './hooks/useReveal';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import FixedUI from './components/FixedUI';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Contact from './components/Contact';

export default function App() {
  useReveal('.reveal');

  return (
    <>
      <Cursor />
      <Navbar />
      <FixedUI />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
