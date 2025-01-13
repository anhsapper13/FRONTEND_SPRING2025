const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-gray-300"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
