import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { draftAPI, DraftTemplate, FormField } from '../services/draft';
import { ArrowLeft, FileText, CreditCard, Eye } from 'lucide-react';

const DraftForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<DraftTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      
      try {
        const data = await draftAPI.getTemplate(id);
        setTemplate(data);
        
        // Initialize form data with empty values
        const initialData: Record<string, string> = {};
        data.fields.forEach(field => {
          initialData[field.id] = '';
        });
        setFormData(initialData);
      } catch (error) {
        console.error('Failed to fetch template:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, navigate]);

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const generatePreview = (): string => {
    if (!template) return '';
    
    let preview = template.preview;
    template.fields.forEach(field => {
      const value = formData[field.id] || `[${field.label.toUpperCase()}]`;
      const placeholder = `[${field.id.toUpperCase()}]`;
      preview = preview.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return preview;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!template) return;

    // Validate required fields
    const requiredFields = template.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.id]?.trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    setSubmitting(true);
    try {
      await draftAPI.submitCustomization(template.id, formData);
      navigate('/payment', { 
        state: { 
          templateId: template.id, 
          templateTitle: template.title,
          price: template.price,
          formData 
        } 
      });
    } catch (error) {
      console.error('Failed to submit customization:', error);
      alert('Failed to save your customization. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      name: field.id,
      required: field.required,
      value: formData[field.id] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        handleInputChange(field.id, e.target.value),
      className: 'w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500',
      placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      case 'select':
        return (
          <select {...commonProps} value={formData[field.id] || ''}>
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return <input {...commonProps} type="date" />;
      case 'email':
        return <input {...commonProps} type="email" />;
      case 'tel':
        return <input {...commonProps} type="tel" />;
      default:
        return <input {...commonProps} type="text" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Template Not Found</h2>
          <p className="text-gray-600 mb-6">The requested template could not be loaded.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Templates
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{template.title}</h1>
                <p className="text-gray-600">{template.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-800">${template.price}</p>
              <p className="text-sm text-gray-600">{template.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Customize Your Document
                </h2>
                <p className="text-gray-600">
                  Fill in the required information to generate your personalized legal document.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {template.fields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}

                <div className="flex items-center justify-between pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center text-blue-800 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center bg-blue-800 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Document Preview
                </h3>
                
                {showPreview ? (
                  <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 leading-relaxed max-h-96 overflow-y-auto">
                    {generatePreview().split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Click "Show Preview" to see your document as you fill it out
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-blue-800 mb-2">What's Included</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Professional legal document</li>
                  <li>• Instant download after payment</li>
                  <li>• Print-ready PDF format</li>
                  <li>• 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftForm;