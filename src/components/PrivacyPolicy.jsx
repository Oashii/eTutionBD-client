import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - Privacy Policy';
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Privacy Policy</h1>

        <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 space-y-6'>
          <section>
            <h2 className='text-2xl font-bold mb-4'>1. Introduction</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              eTuitionBD ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>2. Information We Collect</h2>
            <div className='space-y-3 text-gray-700 dark:text-gray-300'>
              <p>
                <strong>Personal Information:</strong> We collect information you voluntarily provide, such as your name, email address, phone number, profile information, and academic details when you register, create a profile, or use our services.
              </p>
              <p>
                <strong>Usage Data:</strong> We automatically collect information about your interactions with our platform, including your IP address, browser type, pages visited, and time spent on our platform.
              </p>
              <p>
                <strong>Payment Information:</strong> When you make payments through our platform, we use secure third-party payment processors. We do not store full credit card information.
              </p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>3. How We Use Your Information</h2>
            <ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
              <li>To provide and maintain our services</li>
              <li>To process transactions and send notifications</li>
              <li>To improve and personalize your experience</li>
              <li>To send promotional emails (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>4. Data Security</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>5. Sharing of Information</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and conducting our business, under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>6. Your Rights</h2>
            <ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>7. Changes to This Policy</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or by posting the new Privacy Policy on our website.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>8. Contact Us</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className='mt-3 text-gray-700 dark:text-gray-300'>
              <p>Email: privacy@etuitionbd.com</p>
              <p>Address: Dhaka, Bangladesh</p>
            </div>
          </section>

          <div className='mt-8'>
            <Link to='/' className='btn btn-primary'>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
