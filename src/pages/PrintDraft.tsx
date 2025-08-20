import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Download, Printer as Print, CheckCircle, ArrowLeft, Mail } from 'lucide-react';
import { draftAPI } from '../services/draft';
import jsPDF from 'jspdf';

const PrintDraft: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { success, templateTitle, formData } = location.state || {};

  useEffect(() => {
    if (!success || !templateTitle) {
      navigate('/dashboard');
      return;
    }

    const fetchTemplate = async () => {
      if (!id) return;
      try {
        const data = await draftAPI.getTemplate(id);
        setTemplate(data);
      } catch (error) {
        console.error('Failed to fetch template:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, success, templateTitle, navigate]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: templateTitle || 'Legal Document',
  });

  const downloadPDF = () => {
    if (!printRef.current || !template) return;

    const pdf = new jsPDF();
    const content = generateDocumentContent();
    
    // Split content into lines that fit the page width
    const lines = pdf.splitTextToSize(content, 180);
    
    pdf.setFontSize(16);
    pdf.text(templateTitle || 'Legal Document', 20, 20);
    
    pdf.setFontSize(12);
    let yPosition = 40;
    
    lines.forEach((line: string) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line, 20, yPosition);
      yPosition += 7;
    });
    
    pdf.save(`${templateTitle || 'document'}.pdf`);
  };

  const generateDocumentContent = (): string => {
    if (!template || !formData) return '';
    
    let content = template.preview;
    
    // Replace placeholders with actual data
    template.fields.forEach((field: any) => {
      const value = formData[field.id] || `[${field.label.toUpperCase()}]`;
      const placeholder = `[${field.id.toUpperCase()}]`;
      content = content.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return content;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Preparing your document...</p>
        </div>
      </div>
    );
  }

  if (!success || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please complete the payment process to access your document.</p>
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
      {/* Success Header */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-800">Payment Successful!</h1>
              <p className="text-green-600">Your legal document is ready for download and printing.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Print className="h-5 w-5 mr-2" />
              Print Document
            </button>
            
            <button
              onClick={downloadPDF}
              className="flex items-center bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg">
              <div
                ref={printRef}
                className="p-12 max-w-none"
                style={{
                  fontFamily: 'Times, serif',
                  lineHeight: '1.8',
                  fontSize: '14px',
                }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {templateTitle}
                  </h1>
                  <div className="w-24 h-1 bg-blue-800 mx-auto"></div>
                </div>

                <div className="space-y-6">
                  {generateDocumentContent().split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="text-justify leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>

                <div className="mt-16 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="border-b border-gray-400 pb-2 mb-2">
                        <p className="text-sm text-gray-600">Signature</p>
                      </div>
                      <div className="h-12"></div>
                      <p className="text-sm text-gray-600">Date: _______________</p>
                    </div>
                    
                    {template.fields.some((field: any) => field.id.includes('witness')) && (
                      <div>
                        <div className="border-b border-gray-400 pb-2 mb-2">
                          <p className="text-sm text-gray-600">Witness Signature</p>
                        </div>
                        <div className="h-12"></div>
                        <p className="text-sm text-gray-600">Date: _______________</p>
                      </div>
                    )}
                  </div>

                  <div className="text-center text-xs text-gray-500 border-t pt-4">
                    <p>This document was generated by LegalDocs Pro</p>
                    <p>Generated on: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-blue-800 text-xs font-bold mr-3 mt-1">1</div>
                    <div>
                      <p className="font-medium">Review the document</p>
                      <p className="text-sm text-gray-600">Ensure all information is correct before signing</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-blue-800 text-xs font-bold mr-3 mt-1">2</div>
                    <div>
                      <p className="font-medium">Print and sign</p>
                      <p className="text-sm text-gray-600">Print the document and sign where indicated</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-blue-800 text-xs font-bold mr-3 mt-1">3</div>
                    <div>
                      <p className="font-medium">Get notarized (if required)</p>
                      <p className="text-sm text-gray-600">Some documents may require notarization</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-sm text-yellow-700">
                  This document is for informational purposes. For complex legal matters, 
                  consider consulting with a qualified attorney.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="/contact"
                    className="flex items-center text-blue-800 hover:text-blue-900"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </a>
                  <p className="text-sm text-gray-600">
                    Questions about your document? Our support team is here to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintDraft;