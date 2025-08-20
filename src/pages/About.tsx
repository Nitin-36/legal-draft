import React from 'react';
import { Shield, Users, Award, Target } from 'lucide-react';
import img1 from "../images/img_1.jpg"
import img2 from "../images/img_2.jpg"





const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We protect your sensitive information with enterprise-grade security measures.',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Our platform is designed with user experience and accessibility at the forefront.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'All templates are reviewed by experienced legal professionals.',
    },
    {
      icon: Target,
      title: 'Precision & Accuracy',
      description: 'Every document meets the highest standards of legal compliance.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About LegalDocs Pro
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're democratizing access to professional legal document preparation, 
              making quality legal services accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, LegalDocs Pro emerged from a simple observation: 
                  quality legal document preparation was expensive and time-consuming, 
                  putting it out of reach for many individuals and small businesses.
                </p>
                <p>
                  Our team of legal experts and technology professionals came together 
                  to create a platform that combines legal expertise with modern technology. 
                  We've streamlined the document creation process while maintaining the 
                  highest standards of legal accuracy and compliance.
                </p>
                <p>
                  Today, we've helped over 12,000 customers create professional legal 
                  documents, saving them time and money while ensuring their legal needs 
                  are met with precision and care.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/7731328/pexels-photo-7731328.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Legal team working"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              To make professional legal document preparation accessible, affordable, 
              and efficient for individuals and businesses of all sizes. We believe 
              everyone deserves access to quality legal tools without the complexity 
              and expense of traditional legal services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">50,000+</div>
                <div className="text-blue-100">Documents Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">99%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-blue-100">Platform Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600">
              Legal professionals and technology experts working together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Chief Legal Officer',
                image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: '15+ years in corporate law and document drafting',
              },
              {
                name: 'Michael Chen',
                role: 'Head of Technology',
                image: img1,
                description: 'Former tech lead at major fintech companies',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Customer Success Director',
                image: img2,
                description: 'Dedicated to ensuring exceptional user experience',
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-800 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;