import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { draftAPI, DraftTemplate } from '../services/draft';
import { Search, FileText, DollarSign, Clock, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [templates, setTemplates] = useState<DraftTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await draftAPI.getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading legal document templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Legal Document Templates
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Choose from our professionally crafted legal document templates. 
            Each template is attorney-reviewed and ready for customization.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-800" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Starting Price</p>
                <p className="text-2xl font-bold text-gray-900">$29.99</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Completion Time</p>
                <p className="text-2xl font-bold text-gray-900">5 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {template.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {template.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 italic">
                    {template.preview.substring(0, 100)}...
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    ${template.price}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{template.fields.length}</span> customizable fields
                  </p>
                  
                  <Link
                    to={`/draft/${template.id}`}
                    className="block w-full bg-blue-800 hover:bg-blue-900 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Start Customizing
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;