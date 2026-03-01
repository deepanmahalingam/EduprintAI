import { useState } from 'react';
import { Sparkles, Download, Heart, Clock, FileText, TrendingUp, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorksheetCard from '../components/WorksheetCard';
import WorksheetPreviewModal from '../components/WorksheetPreviewModal';
import { mockWorksheets } from '../data/mockWorksheets';
import type { Worksheet } from '../types';

type DashboardTab = 'overview' | 'generated' | 'favorites';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [previewWorksheet, setPreviewWorksheet] = useState<Worksheet | null>(null);

  const favoriteWorksheets = mockWorksheets.slice(0, 4);
  const generatedWorksheets = mockWorksheets.slice(4, 8);
  const recentWorksheets = mockWorksheets.slice(0, 6);

  const stats = [
    { label: 'Worksheets Generated', value: '24', icon: <FileText className="h-5 w-5" />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Downloads', value: '156', icon: <Download className="h-5 w-5" />, color: 'bg-green-50 text-green-600' },
    { label: 'Favorites Saved', value: '12', icon: <Heart className="h-5 w-5" />, color: 'bg-pink-50 text-pink-600' },
    { label: 'This Month', value: '8', icon: <TrendingUp className="h-5 w-5" />, color: 'bg-purple-50 text-purple-600' },
  ];

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'generated' as const, label: 'My Generated' },
    { key: 'favorites' as const, label: 'Favorites' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's your teaching toolkit.</p>
        </div>
        <Link
          to="/generator"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <Sparkles className="h-5 w-5" />
          New Worksheet
        </Link>
      </div>

      {/* Subscription Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-xl">
              <Crown className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Free Plan</h3>
              <p className="text-sm text-gray-600">3 of 5 free generations used this month</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <Star className="h-4 w-4" />
            Upgrade to Premium
          </button>
        </div>
        <div className="mt-4 bg-yellow-100 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full" style={{ width: '60%' }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                Recent Activity
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentWorksheets.map((worksheet, index) => (
                <WorksheetCard
                  key={worksheet.id}
                  worksheet={worksheet}
                  index={index}
                  onPreview={setPreviewWorksheet}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'generated' && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-500" />
            My Generated Worksheets
          </h2>
          {generatedWorksheets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {generatedWorksheets.map((worksheet, index) => (
                <WorksheetCard
                  key={worksheet.id}
                  worksheet={worksheet}
                  index={index + 4}
                  onPreview={setPreviewWorksheet}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <span className="text-5xl mb-4 block">🤖</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No generated worksheets yet</h3>
              <p className="text-gray-500 mb-4">Create your first AI-powered worksheet</p>
              <Link
                to="/generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Generate Worksheet
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            My Favorites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteWorksheets.map((worksheet, index) => (
              <WorksheetCard
                key={worksheet.id}
                worksheet={worksheet}
                index={index}
                onPreview={setPreviewWorksheet}
              />
            ))}
          </div>
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
