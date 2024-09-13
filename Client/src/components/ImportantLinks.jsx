import React from 'react';
import { Link } from 'react-router-dom'; // For internal routing (if needed)

const links = [
  { name: 'Cisco', url: 'https://www.netacad.com/', icon: '🖥️' },
  { name: 'Rgpv Student login', url: 'https://www.rgpv.ac.in/Login/StudentLogin.aspx', icon: '🏫' },
  { name: 'Rgpv Results ', url: 'http://result.rgpv.ac.in/Result/ProgramSelect.aspx', icon: '📉' },
  { name: 'Gyan ganga Fees', url: 'https://gyangangagroupfees.in/', icon: '💸' },
  { name: 'Moodle', url: 'https://gyangangamoodle.in/', icon: '📝' },
  { name: 'DocXify', url: 'https://doc-xify.vercel.app/', icon: '📄' },
  { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: '🔗' },
];

const ImportantLinks = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <div className="bg-indigo-600 ml-44 mr-44 text-white py-6 px-4 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-center">Quick links</h1>
        <p className="text-center text-lg mt-2">
          
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="text-lg font-semibold text-gray-700">{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ImportantLinks;
