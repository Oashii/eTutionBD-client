import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HelpSupport = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - Help & Support';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the support request to a backend
    console.log('Support ticket submitted:', formData);
    alert('Thank you for contacting support. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const supportCategories = [
    {
      icon: '🆘',
      title: 'Technical Issues',
      description: 'Having trouble accessing the platform or using features?',
      link: '#'
    },
    {
      icon: '💳',
      title: 'Payment & Billing',
      description: 'Questions about payments, refunds, or billing?',
      link: '#'
    },
    {
      icon: '👥',
      title: 'Account & Profile',
      description: 'Help with account settings, profile, or verification?',
      link: '#'
    },
    {
      icon: '📚',
      title: 'Tuition & Learning',
      description: 'Questions about finding tutors or tuition features?',
      link: '#'
    },
    {
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'Concerns about your data or account security?',
      link: '#'
    },
    {
      icon: '📧',
      title: 'Email & Notifications',
      description: 'Issues with emails or notification preferences?',
      link: '#'
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-4 text-center'>Help & Support</h1>
        <p className='text-xl text-gray-600 dark:text-gray-400 text-center mb-12'>
          We're here to help. Find answers and get support quickly.
        </p>

        {/* Support Categories */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {supportCategories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer'
            >
              <div className='text-4xl mb-4'>{category.icon}</div>
              <h3 className='text-lg font-bold mb-2'>{category.title}</h3>
              <p className='text-gray-600 dark:text-gray-400'>{category.description}</p>
            </a>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12'>
          {/* Contact Form */}
          <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-8'>
            <h2 className='text-2xl font-bold mb-6'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  className='input input-bordered w-full dark:bg-gray-800 dark:border-gray-700'
                  required
                />
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your email'
                  className='input input-bordered w-full dark:bg-gray-800 dark:border-gray-700'
                  required
                />
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>Subject</span>
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder='Message subject'
                  className='input input-bordered w-full dark:bg-gray-800 dark:border-gray-700'
                  required
                />
              </div>

              <div>
                <label className='label'>
                  <span className='label-text'>Message</span>
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Please describe your issue in detail...'
                  className='textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-700 h-32'
                  required
                ></textarea>
              </div>

              <button type='submit' className='btn btn-primary w-full'>
                Send Support Request
              </button>
            </form>
          </div>

          {/* Quick Links & Info */}
          <div className='space-y-6'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-8'>
              <h2 className='text-2xl font-bold mb-6'>Helpful Resources</h2>
              <ul className='space-y-3'>
                <li>
                  <Link to='/faq' className='text-blue-600 dark:text-blue-400 hover:underline font-semibold'>
                    → Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link to='/blog' className='text-blue-600 dark:text-blue-400 hover:underline font-semibold'>
                    → Read Our Blog
                  </Link>
                </li>
                <li>
                  <Link to='/privacy' className='text-blue-600 dark:text-blue-400 hover:underline font-semibold'>
                    → Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to='/terms' className='text-blue-600 dark:text-blue-400 hover:underline font-semibold'>
                    → Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-8 text-white'>
              <h3 className='text-2xl font-bold mb-4'>Contact Information</h3>
              <div className='space-y-3'>
                <div>
                  <p className='font-semibold mb-1'>📧 Email</p>
                  <p>support@etuitionbd.com</p>
                </div>
                <div>
                  <p className='font-semibold mb-1'>📱 Phone</p>
                  <p>+88 01XXXXXXXXX</p>
                </div>
                <div>
                  <p className='font-semibold mb-1'>🕐 Business Hours</p>
                  <p>Monday - Friday: 9 AM - 6 PM</p>
                  <p>Saturday: 10 AM - 4 PM</p>
                </div>
                <div>
                  <p className='font-semibold mb-1'>📍 Location</p>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <Link to='/' className='btn btn-outline'>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
