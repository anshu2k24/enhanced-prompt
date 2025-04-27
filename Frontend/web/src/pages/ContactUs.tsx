import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const ContactUs = () => {
  return (
    <>
     <div className="min-h-screen bg-background pt-20 pb-10">
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
     <Navbar />
    <div className="p-6 md:p-10 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold mb-9 text-center bg-gradient text-white text-transparent bg-clip-text">Contact Us</h1>

      {/* Flex Container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Contact Form */}
        <form className="flex-1 bg-muted p-6 rounded-xl shadow-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-100 placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-100 placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-100 placeholder-gray-400"
          />
          <textarea
            placeholder="Your Message"
            
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-100 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Send Message
          </button>

          {/* Contact Info */}
          <div className="text-muted-foreground mt-4 space-y-2 text-sm">
            <p><strong>Email:</strong>  <div className=" text-blue-500">support@example.com</div></p>
            <p><strong>Phone:</strong> +1 234 567 8901</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-2 text-sm">
            <a href="https://twitter.com" className="hover:underline text-blue-500">Twitter</a>
            <a href="https://linkedin.com" className="hover:underline text-blue-700">LinkedIn</a>
            <a href="https://instagram.com" className="hover:underline text-pink-600">Instagram</a>
          </div>
        </form>

        {/* Google Map */}
        <div className="flex-1 rounded-xl overflow-hidden shadow opacity-65">
          <iframe
            src="https://www.google.com/maps?q=DSATM,+Bangalore,+India&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ minHeight: "400px", border: 0 }}
            allowFullScreen
            loading="lazy"
            title="DSATM Location"
          />
        </div>
      </div>
    </div>
    <Footer/>
 </div>
    </div>
    </>
  );
};

export default ContactUs;


