import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - FAQ';
  }, []);

  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I find a tutor on eTuitionBD?",
      answer: "You can browse our tutors page to see available tutors. Use filters to find tutors based on subjects, experience, and location. Click on a tutor's profile to view their details and send them an application."
    },
    {
      id: 2,
      question: "How much does it cost to use eTuitionBD?",
      answer: "eTuitionBD is free to join. Tuition fees are determined between students and tutors and depend on the subject, level, and other factors. Our platform takes a small commission from completed transactions."
    },
    {
      id: 3,
      question: "How do I post a tuition requirement?",
      answer: "Log in to your student dashboard, go to 'Post Tuition', fill in your requirements including subject, class, location, budget, and schedule. Once posted, tutors can apply to your tuition."
    },
    {
      id: 4,
      question: "Can I edit my tuition post after posting?",
      answer: "Yes, you can edit your tuition post anytime before a tutor is hired. Go to your dashboard, find the post, and click the edit button."
    },
    {
      id: 5,
      question: "How are payments processed?",
      answer: "Payments are processed securely through our platform. You can make payments when hiring a tutor. We support multiple payment methods including credit cards and digital wallets."
    },
    {
      id: 6,
      question: "What if I want to cancel a tuition?",
      answer: "You can cancel a tuition from your dashboard. Cancellation policies may vary based on when the tuition starts. Check our terms for detailed refund policies."
    },
    {
      id: 7,
      question: "How do I verify a tutor's credentials?",
      answer: "All tutors on eTuitionBD go through a verification process. You can see their qualifications, experience, and reviews on their profile. Student reviews help you make informed decisions."
    },
    {
      id: 8,
      question: "Is my personal information safe?",
      answer: "Yes, we take data security seriously. All personal information is encrypted and protected. Please refer to our Privacy Policy for detailed information about how we handle your data."
    },
    {
      id: 9,
      question: "How do I register as a tutor?",
      answer: "Click on 'Register' and select 'Tutor' as your role. Fill in your information including qualifications, subjects you teach, experience, and hourly rate. Your profile will be reviewed before going live."
    },
    {
      id: 10,
      question: "Can I apply for multiple tuitions?",
      answer: "Yes, as a tutor, you can apply for multiple tuitions. However, ensure you can manage all ongoing sessions effectively. You can track all your applications and ongoing tuitions in your tutor dashboard."
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-4 text-center'>Frequently Asked Questions</h1>
        <p className='text-center text-gray-600 dark:text-gray-400 mb-12'>
          Find answers to common questions about eTuitionBD
        </p>

        <div className='space-y-4'>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className='bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all'
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                <h3 className='text-lg font-semibold text-left'>{faq.question}</h3>
                <span className={`text-2xl transition-transform ${expandedId === faq.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {expandedId === faq.id && (
                <div className='px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700'>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center'>
          <h3 className='text-2xl font-bold mb-4'>Still have questions?</h3>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <Link to='/contact' className='btn btn-primary'>
            Contact Us
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Link to='/' className='btn btn-outline'>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
