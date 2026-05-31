import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import VisionMission from './components/VisionMission';
import OurValues from './components/OurValues';
import VideoShowcase from './components/VideoShowcase';
import Services from './components/Services';
import SectorsInfographic from './components/SectorsInfographic';
import WhyKafel from './components/WhyKafel';
import CvsDirectory from './components/CvsDirectory';
import LatestNews from './components/LatestNews';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CandidateDetailsPage from './components/CandidateDetailsPage';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <VisionMission />
      <OurValues />
      <VideoShowcase />
      <Services />
      <SectorsInfographic />
      <WhyKafel />
      <CvsDirectory />
      <LatestNews />
      <ContactUs />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv/:id" element={<CandidateDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
