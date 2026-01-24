import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footercomponent";
import { motion } from "framer-motion";
import { FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function InfoCard({ icon, title, info }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center bg-[#1b1b1b]/60 backdrop-blur-xl p-6 rounded-2xl 
                 border border-white/10 hover:border-green-500/50 hover:shadow-[0_0_25px_#22c55e55] 
                 transition-all cursor-pointer text-center"
    >
      <div className="text-green-400 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{info}</p>
    </motion.div>
  );
}

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#0f0f0f] to-[#1e1e1e] text-white">
      <Navbar />

      <main className="grow px-6 py-20 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Have a question, feedback, or want to collaborate? Reach out to us through any of the options below.
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <InfoCard
            icon={<FaLinkedin />}
            title="LinkedIn"
            info="linkedin.com/in/abdulsalam"
          />
          <InfoCard
            icon={<FaPhone />}
            title="Phone"
            info="+92 312 459-7594"
          />
          <InfoCard
            icon={<FaMapMarkerAlt />}
            title="Address"
            info="Street #4, Academy Road, Cantt, Lahore"
          />
        </div>

        {/* Let’s Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#111111]/80 backdrop-blur-xl p-8 rounded-2xl text-center shadow-2xl border border-gray-700/50 max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4">
            Let’s Connect
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            I’m always open to discussing new projects, collaborations, or opportunities. 
            Feel free to reach out through any of the channels above!
          </p>
        </motion.div>
      </main>

    </div>
  );
};

export default ContactPage;
