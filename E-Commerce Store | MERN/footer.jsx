function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-16 w-full">
      <p className="text-[15px] sm:text-[17px] font-semibold px-4">
        © {new Date().getFullYear()} WooCommerce. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
