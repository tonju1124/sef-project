export const articlesByCategory = {
  journal: [
    'Machine Learning Fundamentals',
    'Data Science Review',
    'AI Ethics in 2026',
    'Advanced Neural Networks',
    'Computer Vision Applications',
    'Emerging Trends in Software Engineering'
  ],
  chapter: [
    'Introduction to Deep Learning',
    'Cloud Computing Strategies'
  ],
  book: [
    'Big Data Analytics Handbook',
    'Web Development Best Practices',
    'Cybersecurity Essentials'
  ],
  proceeding: [
    'Conference on AI and Robotics',
    'International Summit on Data Science',
    'Tech Innovation Forum 2026'
  ],
  article: [
    'Blockchain Technology Today',
    'IoT Solutions for Smart Cities',
    'Quantum Computing Progress',
    'Edge Computing Benefits'
  ],
};

export const getCategoryCount = (categoryId) => {
  return articlesByCategory[categoryId]?.length || 0;
};

export const getTotalPublications = () => {
  return Object.values(articlesByCategory).reduce((total, articles) => total + articles.length, 0);
};

export const categories = Object.keys(articlesByCategory).map(key => ({
  id: key,
  label: key.charAt(0).toUpperCase() + key.slice(1) // Capitalize first letter
}));
