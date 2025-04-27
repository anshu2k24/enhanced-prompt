
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CallToAction2 from "@/components/CallToAction2";
import About from "@/components/About";
import Feedback from "@/components/Feedback";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <CallToAction2/>
        <About />
        <Feedback />
        <Vision />
       
      </main>
      <Footer />
    </div>
  );
};

export default Index;