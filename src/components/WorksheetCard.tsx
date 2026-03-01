import { Download, Star, Eye, Lock } from 'lucide-react';
import type { Worksheet } from '../types';
import { getSubjectIcon, getThumbnailGradient } from '../data/mockWorksheets';

interface WorksheetCardProps {
  worksheet: Worksheet;
  index: number;
  onPreview?: (worksheet: Worksheet) => void;
}

export default function WorksheetCard({ worksheet, index, onPreview }: WorksheetCardProps) {
  const gradient = getThumbnailGradient(index);
  const icon = getSubjectIcon(worksheet.subject);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`relative h-48 bg-gradient-to-br ${gradient} p-6 flex items-center justify-center`}>
        <span className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        {worksheet.isPremium && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Premium
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
          {worksheet.gradeLevel} Grade
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <button
            onClick={() => onPreview?.(worksheet)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg hover:bg-gray-50"
          >
            <Eye className="h-4 w-4" />
            Quick Look
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
            {worksheet.subject}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            {worksheet.questionType}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {worksheet.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{worksheet.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{worksheet.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Download className="h-4 w-4" />
            <span>{worksheet.downloadCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
