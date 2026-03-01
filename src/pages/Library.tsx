import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import WorksheetCard from '../components/WorksheetCard';
import WorksheetPreviewModal from '../components/WorksheetPreviewModal';
import { mockWorksheets } from '../data/mockWorksheets';
import type { Worksheet, Subject, GradeLevel, Difficulty } from '../types';

const subjects: Subject[] = ['Math', 'ELA', 'Science', 'Social Studies', 'Art'];
const gradeLevels: GradeLevel[] = ['Pre-K', 'K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export default function Library() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | ''>('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [previewWorksheet, setPreviewWorksheet] = useState<Worksheet | null>(null);

  const filteredWorksheets = useMemo(() => {
    return mockWorksheets.filter(w => {
      if (search && !w.title.toLowerCase().includes(search.toLowerCase()) &&
          !w.topic.toLowerCase().includes(search.toLowerCase()) &&
          !w.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedSubject && w.subject !== selectedSubject) return false;
      if (selectedGrade && w.gradeLevel !== selectedGrade) return false;
      if (selectedDifficulty && w.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [search, selectedSubject, selectedGrade, selectedDifficulty]);

  const hasFilters = selectedSubject || selectedGrade || selectedDifficulty;

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedDifficulty('');
    setSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Worksheet Library</h1>
        <p className="text-gray-500">Browse our collection of high-quality educational worksheets</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search worksheets by title, topic, or keyword..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors ${
              showFilters || hasFilters
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasFilters && (
              <span className="bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {[selectedSubject, selectedGrade, selectedDifficulty].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSubject(selectedSubject === s ? '' : s)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedSubject === s
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Grade Level</label>
              <div className="flex flex-wrap gap-2">
                {gradeLevels.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(selectedGrade === g ? '' : g)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedGrade === g
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === d ? '' : d)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedDifficulty === d
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{filteredWorksheets.length}</span> worksheets
        </p>
      </div>

      {/* Grid */}
      {filteredWorksheets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorksheets.map((worksheet, index) => (
            <WorksheetCard
              key={worksheet.id}
              worksheet={worksheet}
              index={index}
              onPreview={setPreviewWorksheet}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">📭</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No worksheets found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {previewWorksheet && (
        <WorksheetPreviewModal
          worksheet={previewWorksheet}
          onClose={() => setPreviewWorksheet(null)}
        />
      )}
    </div>
  );
}
