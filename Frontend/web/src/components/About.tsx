
const About = () => {
  return (
    <section id="about" className="py-12 md:py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] text-transparent bg-clip-text mb-4">Our Concept</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-[800px]">
            We're on a mission to make artificial intelligence more sustainable and environmentally conscious.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl border border-border shadow-lg hover:shadow-eco-900/5 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-eco-500/10 mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const aboutCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-eco-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Efficient Computing",
    description: "Our algorithms are designed to use minimal computing resources while maintaining high performance, reducing energy consumption and carbon footprint."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-eco-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Carbon Tracking",
    description: "We track and report the carbon impact of every AI operation, giving you complete transparency and control over your environmental impact."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-eco-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Green Infrastructure",
    description: "Our services run on data centers powered by renewable energy, ensuring that your AI usage has minimal impact on the environment."
  }
];

export default About;
