import { BookOpen, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-xl">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">EduPrint AI</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              The intelligent worksheet platform powered by AI. Generate high-quality,
              printable educational worksheets in seconds.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/library" className="hover:text-white transition-colors">Worksheet Library</Link></li>
              <li><Link to="/generator" className="hover:text-white transition-colors">AI Generator</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2025 EduPrint AI. All rights reserved.</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
