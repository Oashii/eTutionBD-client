import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - Terms of Service';
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Terms of Service</h1>

        <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 space-y-6'>
          <section>
            <h2 className='text-2xl font-bold mb-4'>1. Acceptance of Terms</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              By accessing and using eTuitionBD, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>2. User Accounts</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              When you create an account on eTuitionBD, you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your password and account information. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>3. User Conduct</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-3'>You agree not to:</p>
            <ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
              <li>Use the platform for illegal or harmful purposes</li>
              <li>Post offensive, abusive, or defamatory content</li>
              <li>Engage in harassment or bullying</li>
              <li>Violate intellectual property rights</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Spam or send unsolicited messages</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>4. Content and Intellectual Property</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              All content on eTuitionBD, including text, graphics, logos, images, and software, is the property of eTuitionBD or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>5. Payment and Refunds</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-3'>
              All payments on eTuitionBD are processed securely. Prices are subject to change without notice. Refund policies are subject to the specific terms of each tuition or service agreement between students and tutors.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>6. Disclaimer of Warranties</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              eTuitionBD provides the platform "as is" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or that any defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>7. Limitation of Liability</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              eTuitionBD shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>8. Termination</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              eTuitionBD reserves the right to suspend or terminate your account if you violate these terms of service or engage in prohibited conduct.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>9. Changes to Terms</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              We may update these terms at any time. Your continued use of the service constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>10. Governing Law</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              These terms shall be governed by and construed in accordance with the laws of Bangladesh.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold mb-4'>11. Contact Us</h2>
            <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className='mt-3 text-gray-700 dark:text-gray-300'>
              <p>Email: support@etuitionbd.com</p>
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

export default TermsOfService;
