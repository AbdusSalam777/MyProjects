function Footer (){
  return (
    <footer className="bg-slate-900 px-8 py-12 font-sans text-gray-800 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Ederny Section */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-xl font-bold text-white mb-4">Edemy</h3>
          <p className="text-white leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        
        {/* Company Links */}
        <div className="flex-1 min-w-[250px]">
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-black transition-colors">Home</a></li>
            <li><a href="#" className="text-white hover:text-black transition-colors">About us</a></li>
            <li><a href="#" className="text-white hover:text-black transition-colors">Contact us</a></li>
            <li><a href="#" className="text-white hover:text-black transition-colors">Privacy policy</a></li>
          </ul>
        </div>
        
        {/* Newsletter Section */}
        <div className="flex-1 min-w-[250px]">
          <h4 className="text-lg font-semibold text-white mb-4">Subscribe to our newsletter</h4>
          <p className="text-white mb-4 leading-relaxed">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="px-3 py-2 border border-gray-300 rounded w-full max-w-xs text-white"
          />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-white">
          Copyright {new Date().getFullYear()} © GreatShock. All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;