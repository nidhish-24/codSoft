import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Building2, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../../context/AuthContext';

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Global Talent', value: '3.2M+' },
    { icon: Building2, label: 'Partner Companies', value: '72k+' },
    { icon: Globe, label: 'Countries Reached', value: '120+' }
  ];

  return (
    <section className='relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden py-28'>
      {/* Background gradients & shapes */}
      <div className='absolute inset-0'>
        <div className='absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-500 via-pink-500 to-cyan-500 opacity-25 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-purple-500 via-teal-400 to-pink-400 opacity-20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 container mx-auto px-6 text-center'>
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight'
        >
          Unlock Your Career Potential
          <span className='block bg-gradient-to-r from-indigo-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mt-3'>
            Connect. Grow. Succeed.
          </span>
        </motion.h1>

        {/* SubHeading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className='text-lg md:text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed'
        >
          Explore thousands of opportunities worldwide, find top talent, and take your career or company to the next level.
        </motion.p> 

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-20'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='group bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl flex items-center space-x-2 transition-all duration-500'
            onClick={() => navigate("/jobs")}
          >
            <Search className='w-5 h-5'/>
            <span>Explore Jobs</span>
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'/>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='bg-gray-800 text-white border-2 border-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-300 shadow-md hover:shadow-lg'
            onClick={() => navigate(
              isAuthenticated && user?.role === "employer"
                ? "/employer-dashboard"
                : "/login"
            )}
          >
            Post a Job
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className='flex flex-col items-center p-6 rounded-3xl bg-gray-800/70 backdrop-blur-md hover:bg-gray-700/50 transition-all duration-500 shadow-xl'
            >
              <div className='w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 flex items-center justify-center mb-3'>
                <stat.icon className='w-7 h-7 text-white'/>
              </div>
              <div className='text-2xl font-bold text-white mb-1'>{stat.value}</div>
              <div className='text-sm text-gray-300 font-medium'>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
