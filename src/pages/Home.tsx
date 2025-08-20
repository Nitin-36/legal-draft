import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, CreditCard, FileText, Users, Award, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your documents are protected with bank-level security encryption.',
    },
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Generate professional legal documents in minutes, not hours.',
    },
    {
      icon: CreditCard,
      title: 'Affordable Pricing',
      description: 'Get quality legal documents at a fraction of attorney costs.',
    },
    {
      icon: FileText,
      title: 'Professional Templates',
      description: 'Legally vetted templates crafted by experienced attorneys.',
    },
  ];

  const stats = [
    { label: 'Documents Generated', value: '50,000+' },
    { label: 'Happy Customers', value: '12,000+' },
    { label: 'Template Categories', value: '25+' },
    { label: 'Customer Satisfaction', value: '99%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Professional Legal Documents 
                <span className="text-yellow-400"> Made Simple</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Create, customize, and download professional legal documents instantly. 
                No legal expertise required – our platform guides you through every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional legal consultation"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-lg shadow-xl">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-bold">Trusted by 12,000+</p>
                    <p className="text-sm text-gray-600">Happy customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose LegalDocs Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine legal expertise with modern technology to deliver 
              exceptional document preparation services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Get your legal documents ready in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Choose Template',
                description: 'Browse our extensive library of professional legal document templates.',
              },
              {
                step: '02',
                title: 'Customize Details',
                description: 'Fill in your specific information with our guided form interface.',
              },
              {
                step: '03',
                title: 'Download & Print',
                description: 'Pay securely and instantly download your professional document.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust LegalDocs Pro 
            for their legal document needs.
          </p>
          <Link
            to="/signup"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-12 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center"
          >
            Start Creating Documents
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;