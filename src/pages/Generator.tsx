import { useState, useCallback } from 'react';
import { Sparkles, Download, RefreshCw, Wand2, ChevronDown } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import WorksheetPDF from '../components/WorksheetPDF';
import { sampleGeneratedWorksheet } from '../data/mockWorksheets';
import type { Subject, GradeLevel, QuestionType, Difficulty, GeneratedWorksheet } from '../types';

const subjects: Subject[] = ['Math', 'ELA', 'Science', 'Social Studies', 'Art'];
const gradeLevels: GradeLevel[] = ['Pre-K', 'K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const questionTypes: QuestionType[] = ['Multiple Choice', 'Fill in the Blank', 'Matching', 'Short Answer', 'Word Problem'];
const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

const examplePrompts = [
  'Create a 2nd-grade math worksheet about space-themed addition with 10 problems',
  'Make a 4th-grade science worksheet about the water cycle with fill-in-the-blank questions',
  'Design a 3rd-grade reading comprehension worksheet about dinosaurs',
  'Generate a kindergarten counting worksheet with animal pictures theme',
];

export default function Generator() {
  const [prompt, setPrompt] = useState('');
  const [subject, setSubject] = useState<Subject>('Math');
  const [grade, setGrade] = useState<GradeLevel>('2nd');
  const [questionType, setQuestionType] = useState<QuestionType>('Word Problem');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [theme, setTheme] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedWorksheet | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerated(sampleGeneratedWorksheet);
    setIsGenerating(false);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!generated) return;
    setIsDownloading(true);
    try {
      const blob = await pdf(<WorksheetPDF worksheet={generated} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${generated.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation error:', err);
    }
    setIsDownloading(false);
  }, [generated]);

  const setExamplePrompt = (p: string) => {
    setPrompt(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-xl">
            <Wand2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Worksheet Generator</h1>
        </div>
        <p className="text-gray-500">Describe your ideal worksheet and let AI create it for you</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Describe Your Worksheet
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Create a 2nd-grade math worksheet about space-themed addition with 10 problems and an answer key..."
              className="w-full h-32 p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm resize-none transition-colors"
            />
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-2">Try an example:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((ep, i) => (
                  <button
                    key={i}
                    onClick={() => setExamplePrompt(ep)}
                    className="text-xs px-3 py-1.5 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors truncate max-w-xs"
                  >
                    {ep.substring(0, 50)}...
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Options Grid */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Worksheet Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Subject</label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as Subject)}
                    className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm appearance-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                  >
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Grade Level</label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as GradeLevel)}
                    className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm appearance-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                  >
                    {gradeLevels.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Question Type</label>
                <div className="relative">
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm appearance-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                  >
                    {questionTypes.map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Difficulty</label>
                <div className="relative">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm appearance-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                  >
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Theme (Optional)</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g., Space, Pirates, Animals"
                  className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Number of Questions</label>
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value) || 10)}
                  min={1}
                  max={20}
                  className="w-full px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-primary-500/25"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Generating Worksheet...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Worksheet
              </>
            )}
          </button>
        </div>

        {/* Right: Preview */}
        <div>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Live Preview</h3>
              {generated && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {isDownloading ? 'Preparing...' : 'Download PDF'}
                </button>
              )}
            </div>

            <div className="worksheet-paper rounded-lg border border-gray-200 p-8 overflow-y-auto max-h-[80vh]">
              {generated ? (
                <div className="animate-fade-in-up">
                  {/* Header */}
                  <div className="border-b-2 border-blue-500 pb-3 mb-5">
                    <h2 className="text-xl font-bold text-blue-900">{generated.title}</h2>
                    <p className="text-xs text-gray-400 mt-1">EduPrint AI - Intelligent Worksheet Platform</p>
                    <div className="flex justify-between mt-3 pt-2">
                      <p className="text-xs text-gray-600">Name: ____________________________</p>
                      <p className="text-xs text-gray-600">Date: ____________________________</p>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Instructions</p>
                    <p className="text-xs text-blue-800">{generated.instructions}</p>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {generated.content.map((item) => (
                      <div key={item.number}>
                        <p className="text-xs font-bold text-blue-500 mb-1">Question {item.number}</p>
                        <p className="text-sm text-gray-800 leading-relaxed">{item.question}</p>
                        {item.options ? (
                          <div className="ml-4 mt-1 space-y-0.5">
                            {item.options.map((opt, i) => (
                              <p key={i} className="text-xs text-gray-600">
                                {String.fromCharCode(65 + i)}) {opt}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <div className="border-b border-gray-300 mt-2 w-3/4 h-5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Answer Key */}
                  <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                    <h3 className="text-sm font-bold text-blue-900 mb-2">Answer Key</h3>
                    <div className="grid grid-cols-2 gap-1">
                      {generated.answer_key.map((item) => (
                        <p key={item.number} className="text-xs text-gray-500">
                          {item.number}. {item.answer}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="animate-float">
                    <span className="text-6xl">📝</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-400 mt-6 mb-2">
                    Your Worksheet Preview
                  </h3>
                  <p className="text-sm text-gray-300 max-w-xs">
                    Fill in the options and click "Generate Worksheet" to see a live preview here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
