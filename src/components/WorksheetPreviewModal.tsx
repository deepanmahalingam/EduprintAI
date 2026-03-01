import { X, Download, Star, Bookmark } from 'lucide-react';
import type { Worksheet } from '../types';
import { getSubjectIcon } from '../data/mockWorksheets';

interface WorksheetPreviewModalProps {
  worksheet: Worksheet;
  onClose: () => void;
}

export default function WorksheetPreviewModal({ worksheet, onClose }: WorksheetPreviewModalProps) {
  const icon = getSubjectIcon(worksheet.subject);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="bg-gradient-to-br from-primary-400 to-accent-500 p-8 rounded-t-2xl text-center">
          <span className="text-7xl">{icon}</span>
          <h2 className="text-2xl font-bold text-white mt-4">{worksheet.title}</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
              {worksheet.subject}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              {worksheet.gradeLevel} Grade
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
              {worksheet.questionType}
            </span>
            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
              {worksheet.difficulty}
            </span>
          </div>

          <p className="text-gray-600">{worksheet.description}</p>

          {worksheet.commonCoreStandard && (
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-sm font-medium text-gray-700">Common Core Standard: </span>
              <span className="text-sm text-gray-600">{worksheet.commonCoreStandard}</span>
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{worksheet.rating}</span>
              <span>rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{worksheet.downloadCount.toLocaleString()} downloads</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
              <Download className="h-5 w-5" />
              Download PDF
            </button>
            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Bookmark className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
