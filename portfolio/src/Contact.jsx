import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:abdusalam0381@gmail.com";
  };

  return (<>
    <Helmet>
        <title>Contact | Abdus Portfolio</title>
      </Helmet>
    <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/30 transition-all">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Contact Me Directly</h3>
              
              <div className="space-y-5">
                <div 
                  className="flex items-start cursor-pointer group"
                  onClick={handleEmailClick}
                >
                  <div className="p-3 rounded-full bg-gray-700 mr-4 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-white transition-colors">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-medium">Email</h4>
                    <p className="text-white group-hover:text-cyan-400 transition-colors text-lg">
                      abdusalam0381@gmail.com
                    </p>
                    <p className="text-cyan-400 text-sm mt-1">(Click to compose email)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-gray-700 mr-4 text-cyan-400">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-medium">Location</h4>
                    <p className="text-white text-lg">Lahore , Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-gray-700 mr-4 text-cyan-400">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-medium">Phone</h4>
                    <p className="text-white text-lg">+92 312 459 7594</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-gray-400 text-sm font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/AbdusSalam777/MyProjects" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/abdus-salam-a42a57341/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/30 transition-all">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Availability</h3>
              <p className="text-gray-300 mb-4">
                I'm currently available for freelance work and full-time positions. 
                If you have a project that needs creative solutions, feel free to reach out!
              </p>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-green-400">Available for new opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-400/30 transition-all"
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Quick Contact</h3>
            <p className="text-gray-300 mb-6">
              Prefer to send a quick message? Copy my email or connect through my social profiles.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-400 text-sm font-medium mb-2">Email Address</h4>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    readOnly
                    value="abdusalam0381@gmail.com" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white mr-2"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('abdusalam0381@gmail.com');
                      alert('Email copied to clipboard!');
                    }}
                    className="px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-gray-400 text-sm font-medium mb-4">Social Profiles</h4>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/AbdusSalam777/MyProjects" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <FaGithub className="text-xl mr-3" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/abdus-salam-a42a57341/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <FaLinkedin className="text-xl mr-3" />
                    <span>LinkedIn</span>
                  </a>
                  <button 
                    onClick={handleEmailClick}
                    className="flex items-center p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
                  >
                    <FaEnvelope className="text-xl mr-3" />
                    <span>Email Me</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;