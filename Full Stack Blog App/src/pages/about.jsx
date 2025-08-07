import Navbar from '../components/navbar';
import { FiCode, FiPenTool, FiShare2, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-16 text-gray-800">
        <div className="max-w-6xl mx-auto">
          
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-purple-600 mb-4">About Lamalog</h1>
            <p className="text-xl text-gray-600">Where creativity meets technology in perfect harmony</p>
          </div>

          {/* Intro Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Your <span className="text-purple-600">creative</span> sanctuary</h2>
              <p className="text-lg mb-4">
                <strong className="text-gray-900">Lamalog</strong> is more than a platform — it's a space where 
                <span className="text-purple-600 font-medium"> developers</span>, 
                <span className="text-pink-600 font-medium"> designers</span>, and 
                <span className="text-indigo-600 font-medium"> storytellers</span> come together.
              </p>
              <p className="text-lg">
                We blend cutting-edge tech with thoughtful design to give your content the spotlight it deserves.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="flex justify-center items-center gap-6 text-5xl text-gray-300">
                <FiCode className="text-purple-500" />
                <FiPenTool className="text-pink-500" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">Why creators love us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <FiZap className="text-3xl text-purple-600" />, title: "Lightning Fast", desc: "Built with React.js and a fast backend" },
                { icon: <FiPenTool className="text-3xl text-pink-600" />, title: "Elegant Design", desc: "Minimalist layout that highlights your work" },
                { icon: <FiCode className="text-3xl text-indigo-600" />, title: "Developer Friendly", desc: "Supports markdown, code, and APIs" },
                { icon: <FiShare2 className="text-3xl text-blue-600" />, title: "Reach Readers", desc: "Connect with a growing tech audience" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow border text-center">
                  <div className="mb-3 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-purple-600 text-white rounded-xl p-10 text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Join the creative revolution</h2>
            <p className="mb-6">Lamalog isn’t just a platform—it’s a movement. Share your voice today.</p>
            <Link to="/write">
              <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-md shadow hover:bg-gray-100">
                Start Writing Now
              </button>
            </Link>
          </div>

          {/* Footer Quote */}
          <div className="text-center">
            <p className="text-gray-600 italic">
              "Lamalog — Where every pixel and line of code tells a story."
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
