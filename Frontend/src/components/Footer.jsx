import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Blog Info / Logo */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">
              <span>Blog</span>App
            </h3>
            <p className="text-gray-700">
              Sharing insights on web development, technology trends, and coding best practices. Join our community!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">All Posts</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">Categories</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">Author Bio</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">API Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">Support Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                {/* Twitter SVG */}
                <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M22.24 5.92c-.62.27-1.28.45-1.97.53a4.06 4.06 0 001.78-1.9c-.66.4-1.4.69-2.18.85A4.05 4.05 0 0014.28 4c-2.45 0-4.44 1.99-4.44 4.44 0 .35.04.7.13 1.03C6.73 9.2 3.58 7.42 1.45 4.79c-.38.65-.58 1.4-.58 2.22 0 1.54.78 2.9 1.96 3.7A4.43 4.43 0 011 10.3c0 1.93 1.37 3.5 3.19 3.86a4.4 4.4 0 01-1.96.07c.5 1.57 1.95 2.7 3.67 2.74A8.99 8.99 0 013 18.25c-1.39 0-2.7-.09-3.95-.27A12.56 12.56 0 007.82 20c9.38 0 14.5-7.76 14.5-14.5 0-.22 0-.44-.01-.65.99-.72 1.84-1.63 2.52-2.65z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                {/* LinkedIn SVG */}
                <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M20.447 20.452h-3.568v-5.602c0-1.332-.023-3.047-1.854-3.047-1.857 0-2.143 1.448-2.143 2.949v5.7h-3.568V9.593h3.424v1.577h.047c.473-.896 1.625-1.84 3.374-1.84 3.601 0 4.267 2.378 4.267 5.483l-.001 6.049zM6.331 8.877c-1.144 0-2.071-.929-2.071-2.071s.927-2.071 2.071-2.071 2.071.929 2.071 2.071-.927 2.071-2.071 2.071zm1.751 11.575H4.58v-11.5H8.08v11.5zM22.25 0H1.75C.783 0 0 .778 0 1.75v20.5C0 23.217.783 24 1.75 24h20.5c.967 0 1.75-.783 1.75-1.75V1.75c0-.972-.783-1.75-1.75-1.75z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                {/* GitHub SVG */}
                <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577 0-.285-.01-1.04-.015-2.03-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.332-1.75-1.332-1.75-1.087-.74.082-.725.082-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.833 2.807 1.304 3.492.997.108-.775.419-1.304.762-1.604-2.665-.3-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.237-3.22-.124-.303-.537-1.52.117-3.175 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.3-.873 3.3-.873.654 1.655.242 2.872.118 3.175.772.84 1.237 1.91 1.237 3.22 0 4.604-2.805 5.623-5.479 5.922.43.37.823 1.107.823 2.222 0 1.604-.015 2.898-.015 3.287 0 .319.217.691.825.575C20.565 22.181 24 17.675 24 12 24 5.373 18.627 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} CodeBlog Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition">Sitemap</a>
            <span>|</span>
            <a href="#" className="hover:text-indigo-600 transition">Affiliates</a>
            <span>|</span>
            <a href="#" className="hover:text-indigo-600 transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
