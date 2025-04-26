

import { Button } from "@/components/ui/button";
import img3 from './img2.png'

const Vision = () => {
  return (
    <section id="vision" className="py-12 md:py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-slide-in">
            <div className="absolute -inset-4 bg-gradient-to-br from-eco-500/20 to-cyan-500/20 rounded-2xl blur-lg"></div>
            <img src={img3} alt="Digital Sustainability" className="relative rounded-xl object-cover w-full h-full aspect-square md:aspect-[4/3] mix-blend-luminosity"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] text-transparent bg-clip-text">Our Vision</h2>
            <p className="text-lg text-muted-foreground animate-slide-in" style={{ animationDelay: '0.2s' }}>
              We envision a future where technological advancement and environmental responsibility go hand in hand. EcoAI is committed to pioneering sustainable AI practices.
            </p>
            
            <div className="space-y-4">
              {visionPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 animate-slide-in" 
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-eco-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-eco-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-center items-center  animate-slide-in" style={{ animationDelay: '0.8s' }}>
           
               <Button 
                className="  bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 animate-glow text-lg px-8 py-6 h-auto"
              >
                Try Now
              </Button> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const visionPoints = [
  {
    title: "Carbon Neutrality",
    description: "We aim to achieve carbon-neutral AI operations through efficient algorithms and renewable energy."
  },
  {
    title: "Transparent Reporting",
    description: "Providing clear metrics on energy usage and carbon emissions for every AI interaction."
  },
  {
    title: "Industry Standards",
    description: "Developing and promoting industry-wide standards for sustainable AI practices."
  },
];

export default Vision;