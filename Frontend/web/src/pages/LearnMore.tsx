import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LearnMore = () => {
  const handleDownload = () => {
    // This will trigger the download
    window.open('/EcoAi.zip', '_blank');
  };
  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] text-transparent bg-clip-text mb-8">
            How EcoPrompt Works
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-[#8B5CF6]/10 to-[#0EA5E9]/10 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-3">Architecture Overview</h2>
                <ul className="space-y-3 list-disc pl-5">
                  <li>Chrome Extension (Client-side)</li>
                  <li>Node.js Server (Gemini API Gateway)</li>
                  <li>Python Carbon Analytics Engine</li>
                  <li>Real-time Dashboard</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-[#8B5CF6]/10 to-[#0EA5E9]/10 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-3">System Requirements</h2>
                <ul className="space-y-3 list-disc pl-5">
                  <li>Chrome Browser v102+</li>
                  <li>Node.js v18+ for server</li>
                  <li>Python 3.9+ for carbon analytics</li>
                  <li>Google Cloud API key</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-[#8B5CF6]/10 to-[#0EA5E9]/10 rounded-xl border border-border flex justify-evenly flex-col">
                <h2 className="text-2xl font-bold mb-3">Installation Guide</h2>
                <ol className="space-y-4 list-decimal pl-5">
                  <li>Download the extension package</li>
                  <li>Unzip in your preferred directory</li>
                  <li>Enable Developer Mode in Chrome</li>
                  <li>Load unpacked extension</li>
                  <li> Check for Errors</li>
                  <li>Pin the extension</li>
                  <li>Test the Fuctionality</li>
                  <li>upadate your Extension Carefully</li>
                </ol>
                <Button 
                  onClick={handleDownload}
                  className="mt-9  bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] hover:from-[#7C3AED] hover:to-[#0284C7] text-white"
                >
                 Try Now
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#0EA5E9]/10 rounded-xl border border-border p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">Technical Implementation</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#8B5CF6]">Node.js Server</h3>
                <p className="mb-4">Handles all Gemini API requests with token optimization:</p>
                <pre className="bg-black/50 rounded p-4 text-sm overflow-x-auto">
                  {`// Example optimized request
router.post('/optimize', async (req, res) => {
  const { prompt } = req.body;
  const optimized = await optimizePrompt(prompt);
  const response = await gemini.generate(optimized);
  trackCarbonUsage(optimized, response);
  res.json({ response, carbonCost });
});`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#0EA5E9]">Python Analytics</h3>
                <p className="mb-4">Calculates carbon footprint based on:</p>
                <pre className="bg-black/50 rounded p-4 text-sm overflow-x-auto">
                  {`# Carbon calculation example
def calculate_carbon(tokens, model_size):
    energy = tokens * 0.0001 * model_size
    carbon = energy * 0.0004  # kgCO2eq
    return {
        'tokens': tokens,
        'energy_kWh': energy,
        'carbon_kg': carbon
    }`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <Button 
              onClick={handleDownload}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] hover:from-[#7C3AED] hover:to-[#0284C7] text-white px-8 py-6 text-lg"
            >
              Download EcoPrompt Extension
            </Button>
            <p className="mt-4 text-muted-foreground">Zip file includes all required assets and documentation</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;