import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react';

const Analytics = () => {
  const stats = [
    { 
      icon: Users, 
      title: 'Registered Users', 
      value: '3.1M+', 
      growth: '+12%', 
      color: 'from-blue-400 to-blue-600',
      description: 'Professionals signed up and actively looking for opportunities.'
    },
    { 
      icon: Briefcase, 
      title: 'Jobs Available', 
      value: '200K+', 
      growth: '+18%', 
      color: 'from-pink-400 to-pink-600',
      description: 'Open positions listed across multiple industries.'
    },
    { 
      icon: Target, 
      title: 'Successful Hires', 
      value: '102K+', 
      growth: '+20%', 
      color: 'from-green-400 to-green-600',
      description: 'Candidates successfully placed in companies through our platform.'
    },
    { 
      icon: TrendingUp, 
      title: 'Average Match Rate', 
      value: '92%', 
      growth: '+7%', 
      color: 'from-purple-400 to-purple-600',
      description: 'The percentage of job listings matched with qualified candidates.'
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Platform{' '}
            <span className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Track your growth and performance with real-time analytics and data-driven insights designed to optimize recruitment and engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.7, type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
              className="relative bg-white/70 backdrop-blur-md rounded-3xl p-6 flex flex-col items-start shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-200"
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-xl mb-4 bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-700 text-sm mb-3">{stat.title}</p>
              <p className="text-gray-500 text-xs mb-2">{stat.description}</p>
              <span className="text-white bg-gradient-to-r from-green-400 to-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                {stat.growth}
              </span>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r opacity-30 blur-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
