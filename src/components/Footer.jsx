import React from 'react';
import { Link } from 'react-router-dom';
import xicon from '../assets/xicon.png'
import linkedin from '../assets/linkedin.png'
import fb from '../assets/fb.png'

const Footer = () => {
    return (
        <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 mt-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold text-white dark:text-white mb-4">eTuitionBD</h3>
                        <p className="text-sm">
                            A modern platform connecting students with verified tutors in a safe, transparent, and efficient way.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/tuitions" className="hover:text-white transition-colors">Tuitions</Link></li>
                            <li><Link to="/tutors" className="hover:text-white transition-colors">Tutors</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="/help" className="hover:text-white transition-colors">Help & Support</Link></li>
                            <li>📧 Email: contact@etuitionbd.com</li>
                            <li>📱 Phone: +88 01XXXXXXXXX</li>
                        </ul>
                    </div>
                </div>

                {/* Social Media */}
                <div className="border-t border-gray-700 dark:border-gray-800 pt-8 pb-8">
                    <h4 className="text-lg font-semibold text-white dark:text-white mb-4">Follow Us</h4>
                    <div className="flex gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <img src={xicon} alt="social icon" className='max-h-10'/>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <img src={linkedin} alt="social icon" className='max-h-20'/>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <img src={fb} alt="social icon" className='max-h-5 max-w-5'/>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center text-sm">
                    <p>&copy; 2025 eTuitionBD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;