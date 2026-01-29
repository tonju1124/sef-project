// Admin User
export const adminUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  joinDate: "2023-06-15",
  bio: "Publishing researcher and content moderator",
  isAdmin: true,
  title: "Ms.",
  faculty: "FCM",
  phone: "+60 12-3456789",
  scholarLink: "https://scholar.google.com/citations?user=admin123",
  publications: [
    {
      id: 1,
      title: "Example Title",
      author: "John Doe",
      coauthor: "Jane Smith",
      uploadDate: "2024-01-15",
      description: "A comprehensive study on modern development practices",
      category: "journal",
      bookmarked: true,
    },
  ],
  analytics: {
    journal: [
      'Machine Learning Fundamentals',
      'Data Science Review',
      'AI Ethics in 2026',
    ],
    chapter: [
      'Introduction to Deep Learning',
      'Cloud Computing Strategies'
    ],
    book: [
      'Big Data Analytics Handbook',
      'Web Development Best Practices',
    ],
    proceeding: [
      'Conference on AI and Robotics',
      'International Summit on Data Science',
    ],
    article: [
      'Blockchain Technology Today',
      'IoT Solutions for Smart Cities',
    ],
  },
  bookmarks: [1, 5, 9],
  notifications: [
    {
      id: 1,
      message: "Your publication has been reviewed",
      date: "2024-01-25",
      read: false,
    },
    {
      id: 2,
      message: "New comment on your article",
      date: "2024-01-24",
      read: true,
    },
  ],
  verification: [
    {
      id: 1,
      publicationTitle: "Machine Learning Fundamentals",
      status: "verified",
      submissionDate: "2024-01-10",
      verificationDate: "2024-01-15",
    },
    {
      id: 2,
      publicationTitle: "Data Science Review",
      status: "pending",
      submissionDate: "2024-01-20",
      verificationDate: null,
    },
  ],
};

// Student User
export const studentUser = {
  id: 2,
  name: "Jane Smith",
  email: "jane.smith@example.com",
  role: "student",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  joinDate: "2024-01-10",
  bio: "Student researcher",
  isAdmin: false,
  title: "Ms.",
  faculty: "FCI",
  phone: "+60 14-5678901",
  scholarLink: "https://scholar.google.com/citations?user=student123",
  publications: [
    {
      id: 2,
      title: "Example Title",
      author: "Jane Smith",
      coauthor: "Bob Johnson",
      uploadDate: "2024-01-10",
      description: "Research findings on technology trends",
      category: "journal",
      bookmarked: false,
    },
  ],
  analytics: {
    journal: [
      'Data Science Review',
    ],
    chapter: [
      'Introduction to Deep Learning',
    ],
    book: [],
    proceeding: [
      'International Summit on Data Science',
    ],
    article: [
      'Blockchain Technology Today',
    ],
  },
  bookmarks: [2, 6],
  notifications: [
    {
      id: 1,
      message: "Your submission has been received",
      date: "2024-01-25",
      read: false,
    },
  ],
  verification: [
    {
      id: 1,
      publicationTitle: "Data Science Review",
      status: "verified",
      submissionDate: "2024-01-05",
      verificationDate: "2024-01-12",
    },
    {
      id: 2,
      publicationTitle: "Introduction to Deep Learning",
      status: "rejected",
      submissionDate: "2024-01-05",
      verificationDate: "2024-01-12",
    },
  ],
};

// Default current user (set to student by default)
export const currentUser = studentUser;

// Helper functions
export const getUserPublicationCount = (user, category) => {
  return user.analytics[category]?.length || 0;
};

export const getTotalUserPublications = (user) => {
  return Object.values(user.analytics).reduce((total, items) => total + items.length, 0);
};

export const getUserAnalytics = (user) => {
  return user.analytics;
};

export const isUserAdmin = (user) => {
  return user.isAdmin;
};

export const getUserRole = (user) => {
  return user.role;
};

export const getCurrentUserName = (user) => {
  return user.name;
};
