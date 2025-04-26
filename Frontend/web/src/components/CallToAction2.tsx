import { Button } from "@/components/ui/button";

const CallToAction2 = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-secondary to-background p-8 md:p-12 shadow-xl">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-eco-500/10 to-cyan-500/10 mix-blend-soft-light"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eco-500/30 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 bg-eco-500/5 blur-[100px] rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Reduce Your AI Carbon Footprint?</h2>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Join us in making artificial intelligence more sustainable while maintaining high performance.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Button 
                className="bg-gradient-to-r from-eco-500 to-eco-600 hover:from-eco-600 hover:to-eco-700 animate-glow text-lg px-8 py-6 h-auto font-semibold"
                size="lg"
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

export default CallToAction2;