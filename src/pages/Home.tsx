import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Download, Zap, Star, ArrowRight, GraduationCap, FileText } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI-Powered Generation',
      description: 'Describe what you need in plain English. Our AI creates curriculum-aligned worksheets in seconds.',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Professional PDFs',
      description: 'Beautiful, print-ready worksheets with consistent formatting and professional typography.',
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Standards Aligned',
      description: 'Worksheets aligned to Common Core standards from Pre-K through 8th grade.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Preview',
      description: 'See your worksheet come to life in real-time before downloading the final PDF.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Worksheets' },
    { value: '50,000+', label: 'Teachers' },
    { value: '5M+', label: 'Downloads' },
    { value: '4.9', label: 'Rating', icon: <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 inline" /> },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl">📐</div>
          <div className="absolute top-40 right-20 text-6xl">📝</div>
          <div className="absolute bottom-20 left-1/3 text-7xl">🎨</div>
          <div className="absolute top-10 right-1/3 text-5xl">🔬</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Powered by AI Curriculum Design
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Create Perfect Worksheets
              <span className="block text-yellow-300">in Seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              The intelligent worksheet platform for educators. Generate high-quality,
              printable PDF worksheets using natural language prompts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/generator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                <Sparkles className="h-5 w-5" />
                Try AI Generator
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/library"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Browse Library
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value} {stat.icon}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From idea to printable worksheet in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Describe Your Worksheet', desc: 'Type a natural language prompt like "Create a 3rd-grade math worksheet about fractions with a pizza theme."', icon: '✏️' },
            { step: '2', title: 'AI Generates Content', desc: 'Our AI curriculum designer creates age-appropriate, standards-aligned problems tailored to your specifications.', icon: '🤖' },
            { step: '3', title: 'Download & Print', desc: 'Preview your worksheet, make adjustments, and download a beautifully formatted PDF ready for printing.', icon: '🖨️' },
          ].map(item => (
            <div key={item.step} className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A complete platform for creating and managing educational worksheets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(feature => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-primary-50 text-primary-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of educators creating amazing worksheets with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              Start Creating Free
            </Link>
            <Link
              to="/library"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              <Download className="h-5 w-5" />
              Browse Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
