import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 text-gray-100 overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute -top-24 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-600 to-purple-500 opacity-25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-28 -right-40 w-96 h-96 bg-gradient-to-tr from-pink-500 to-cyan-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto text-center space-y-16">

          {/* Logo & Brand */}
          <div className="flex flex-col items-center space-y-5">
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 hover:bg-white/20 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-wide">CareerConnect</h3>
            </div>
            <p className="text-base md:text-lg text-gray-300 max-w-lg">
              Bridging the gap between top talent and leading companies globally. Your success, our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <a href="#" className="hover:text-white text-gray-400 transition-colors font-medium">About Us</a>
            <a href="#" className="hover:text-white text-gray-400 transition-colors font-medium">Services</a>
            <a href="#" className="hover:text-white text-gray-400 transition-colors font-medium">Careers</a>
            <a href="#" className="hover:text-white text-gray-400 transition-colors font-medium">Blog</a>
            <a href="#" className="hover:text-white text-gray-400 transition-colors font-medium">Contact</a>
          </div>

          {/* Newsletter Signup (Optional) */}
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-sm md:text-base">
              Subscribe to our newsletter for the latest career tips and opportunities.
            </p>
            <div className="flex max-w-md w-full gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-xl text-gray-900 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-white px-6 py-2 rounded-r-xl font-semibold hover:from-cyan-500 hover:via-pink-600 hover:to-purple-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="space-y-1 text-gray-500 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
            <p>Empowering careers and building opportunities worldwide.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
