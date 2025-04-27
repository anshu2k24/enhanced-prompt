
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import person1 from './images.png';


const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here is where you would connect to Firebase
    console.log({ name, email, message });
    alert('Thanks for your feedback! (Firebase integration would go here)');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="feedback" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] text-transparent bg-clip-text">User Feedback</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9]  rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-[800px]">
            Hear what our users have to say about their experience with our sustainable AI solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-card p-6 rounded-xl border border-border shadow-lg animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                  <img src={person1} alt="Digital Sustainability" className='"w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4"'/>

                  {/* <span className="text-lg font-semibold">{testimonial.name.charAt(0)}</span> */}
                  </div>
                
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-1">Name</label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-1">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Your email" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-1">Message</label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Share your experience..." 
                  className="min-h-[120px]"
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 glow-effect">
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Emma Thompson",
    role: "Data Scientist",
    comment: "I've reduced my model training carbon emissions by 40% since switching to EcoAI for my projects. The transparency in carbon tracking is incredibly valuable."
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    comment: "The performance is just as good as other AI platforms, but knowing my work has a smaller environmental impact makes a huge difference to me."
  },
  {
    name: "Alex Carry",
    role: "Sustainability Officer",
    comment: "EcoAI has been instrumental in helping our company meet our environmental goals while still leveraging cutting-edge AI technology."
  }
];

export default Feedback;
