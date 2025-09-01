import React from 'react';
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  // New content for job seekers
  const newJobSeekerFeatures = [
    {
      icon: jobSeekerFeatures[0].icon,
      title: 'Personalized Job Recommendations',
      description: 'Receive tailored job listings based on your skills, experience, and career goals.'
    },
    {
      icon: jobSeekerFeatures[1].icon,
      title: 'Resume Builder & Optimization',
      description: 'Create a professional resume that stands out and increases your chances of landing interviews.'
    },
    {
      icon: jobSeekerFeatures[2].icon,
      title: 'Career Insights & Guidance',
      description: 'Access expert advice, interview tips, and industry trends to advance your career.'
    },
    {
      icon: jobSeekerFeatures[3].icon,
      title: 'Application Tracking',
      description: 'Keep track of all your job applications in one place and get notified about updates.'
    },
  ];

  // New content for employers
  const newEmployerFeatures = [
    {
      icon: employerFeatures[0].icon,
      title: 'Smart Candidate Matching',
      description: 'Automatically find the most qualified candidates for your job openings.'
    },
    {
      icon: employerFeatures[1].icon,
      title: 'Job Posting Management',
      description: 'Easily create, update, and manage your job postings with a few clicks.'
    },
    {
      icon: employerFeatures[2].icon,
      title: 'Analytics & Reporting',
      description: 'Get actionable insights about your hiring process and applicant pool.'
    },
    {
      icon: employerFeatures[3].icon,
      title: 'Employer Branding',
      description: 'Showcase your company culture and attract top talent with custom profiles.'
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Empower Your Career and Hiring{' '}
            <span className="block bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              With Ease
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Our platform is designed to help job seekers find their dream roles and employers connect with top talent effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Job Seekers Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                For Job Seekers
              </h3>
              <div className="mx-auto w-28 h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
            </div>

            <div className="space-y-8">
              {newJobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-3xl bg-white/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                >
                  <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-3xl"></div>
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl transition-all duration-500 group-hover:scale-110">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employers Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                For Employers
              </h3>
              <div className="mx-auto w-28 h-1 rounded-full bg-gradient-to-r from-pink-400 via-teal-400 to-purple-500" />
            </div>

            <div className="space-y-8">
              {newEmployerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-3xl bg-white/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                >
                  <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-teal-400 opacity-20 blur-3xl"></div>
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-teal-400 flex items-center justify-center text-white text-2xl transition-all duration-500 group-hover:scale-110">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
