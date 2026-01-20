import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - Blog';
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Finding the Right Tutor",
      excerpt: "Learn how to identify a tutor that matches your learning style and academic goals. We share practical tips to help you make the best choice.",
      author: "Sarah Khan",
      date: "January 15, 2026",
      image: "📚",
      category: "Education"
    },
    {
      id: 2,
      title: "How to Maximize Your Learning Sessions",
      excerpt: "Discover effective strategies to make the most out of your tuition sessions. From preparation to follow-up, we cover everything.",
      author: "Ahmed Hassan",
      date: "January 12, 2026",
      image: "💡",
      category: "Learning Tips"
    },
    {
      id: 3,
      title: "Understanding the Role of Online Tutoring",
      excerpt: "Explore the benefits and challenges of online tutoring. Is online education right for you? We discuss the advantages in detail.",
      author: "Fatima Islam",
      date: "January 10, 2026",
      image: "🌐",
      category: "Online Education"
    },
    {
      id: 4,
      title: "Success Stories: Students Who Achieved Their Goals",
      excerpt: "Read inspiring stories from students who used eTuitionBD to improve their academic performance and achieve remarkable results.",
      author: "Karim Uddin",
      date: "January 8, 2026",
      image: "⭐",
      category: "Success Stories"
    },
    {
      id: 5,
      title: "Subject-Wise Tuition Pricing Guide 2026",
      excerpt: "A comprehensive guide to tuition pricing for different subjects and levels. Understand market rates and budget accordingly.",
      author: "Noor Ahmed",
      date: "January 5, 2026",
      image: "💰",
      category: "Pricing"
    },
    {
      id: 6,
      title: "Career Growth: From Student to Tutor",
      excerpt: "Interested in becoming a tutor? Learn about the opportunities and how to build a successful tutoring career on eTuitionBD.",
      author: "Rashed Ali",
      date: "January 1, 2026",
      image: "🚀",
      category: "Career"
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold mb-4'>eTuitionBD Blog</h1>
          <p className='text-xl text-gray-600 dark:text-gray-400'>
            Insights, tips, and stories about education and tutoring
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {blogPosts.map((post) => (
            <article key={post.id} className='bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
              <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-8 flex items-center justify-center text-4xl h-40'>
                {post.image}
              </div>
              
              <div className='p-6'>
                <div className='flex items-center justify-between mb-3'>
                  <span className='inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold'>
                    {post.category}
                  </span>
                  <time className='text-sm text-gray-500 dark:text-gray-400'>{post.date}</time>
                </div>
                
                <h3 className='text-xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                  <Link to={`#blog-${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className='text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
                  {post.excerpt}
                </p>
                
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>By {post.author}</span>
                  <Link 
                    to={`#blog-${post.id}`}
                    className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors'
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center mb-12'>
          <h3 className='text-2xl font-bold mb-4'>Stay Updated</h3>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Subscribe to our newsletter for the latest tips and updates about online tutoring
          </p>
          <div className='flex gap-2 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 input dark:bg-gray-800 dark:border-gray-700'
            />
            <button className='btn btn-primary'>Subscribe</button>
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

export default Blog;
