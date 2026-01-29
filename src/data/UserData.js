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
  title: "Mr.",
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
      'Advances in Computer Vision',
      'Cybersecurity Trends',
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

// Lecturer User
export const lecturerUser = {
  id: 3,
  name: "Michael Chen",
  email: "michael.chen@example.com",
  role: "lecturer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  joinDate: "2023-03-20",
  bio: "Senior lecturer in Computer Science",
  isAdmin: false,
  title: "Dr.",
  faculty: "FCI",
  phone: "+60 16-7890123",
  scholarLink: "https://scholar.google.com/citations?user=lecturer123",
  publications: [
    {
      id: 3,
      title: "Advanced Algorithms in Modern Computing",
      author: "Dr. Michael Chen",
      coauthor: "Sarah Williams",
      uploadDate: "2024-01-18",
      description: "A detailed exploration of advanced algorithms and their applications",
      category: "journal",
      bookmarked: true,
    },
    {
      id: 4,
      title: "Teaching Programming to Generation Z",
      author: "Dr. Michael Chen",
      coauthor: "Dr. Emily Rodriguez",
      uploadDate: "2024-01-12",
      description: "Pedagogical approaches for modern programming education",
      category: "proceeding",
      bookmarked: false,
    },
  ],
  analytics: {
    journal: [
      'Advanced Algorithms in Modern Computing',
      'Software Engineering Best Practices',
      'Computer Architecture Trends',
    ],
    chapter: [
      'Object-Oriented Design Patterns',
      'Web Development Frameworks',
    ],
    book: [
      'The Art of Algorithm Design',
    ],
    proceeding: [
      'Teaching Programming to Generation Z',
      'International Conference on CS Education',
    ],
    article: [
      'Future of Programming Languages',
    ],
  },
  bookmarks: [3, 4, 10],
  notifications: [
    {
      id: 1,
      message: "Your publication has been accepted",
      date: "2024-01-26",
      read: false,
    },
    {
      id: 2,
      message: "Congratulations on 100 citations",
      date: "2024-01-23",
      read: true,
    },
  ],
  verification: [
    {
      id: 1,
      publicationTitle: "Advanced Algorithms in Modern Computing",
      status: "verified",
      submissionDate: "2024-01-10",
      verificationDate: "2024-01-15",
    },
    {
      id: 2,
      publicationTitle: "Teaching Programming to Generation Z",
      status: "verified",
      submissionDate: "2024-01-08",
      verificationDate: "2024-01-14",
    },
  ],
};

// Coordinator User
export const coordinatorUser = {
  id: 4,
  name: "Amelia Johnson",
  email: "amelia.johnson@example.com",
  role: "coordinator",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia",
  joinDate: "2022-08-10",
  bio: "Program coordinator and academic advisor",
  isAdmin: false,
  title: "Prof.",
  faculty: "FAS",
  phone: "+60 18-9012345",
  scholarLink: "https://scholar.google.com/citations?user=coordinator123",
  publications: [
    {
      id: 5,
      title: "Curriculum Development in Higher Education",
      author: "Prof. Amelia Johnson",
      coauthor: "Dr. James Wilson",
      uploadDate: "2024-01-22",
      description: "Guidelines for effective curriculum design and implementation",
      category: "journal",
      bookmarked: true,
    },
    {
      id: 6,
      title: "Student Mentorship Programs: A Case Study",
      author: "Prof. Amelia Johnson",
      coauthor: "Dr. Lisa Anderson",
      uploadDate: "2024-01-20",
      description: "Analysis of successful mentorship programs in academic institutions",
      category: "article",
      bookmarked: false,
    },
    {
      id: 7,
      title: "Interdisciplinary Collaboration in Academia",
      author: "Prof. Amelia Johnson",
      uploadDate: "2024-01-15",
      description: "Strategies for fostering collaboration across departments",
      category: "chapter",
      bookmarked: true,
    },
  ],
  analytics: {
    journal: [
      'Curriculum Development in Higher Education',
      'Academic Excellence Initiatives',
      'Student Success Metrics',
    ],
    chapter: [
      'Interdisciplinary Collaboration in Academia',
      'Educational Leadership Practices',
    ],
    book: [
      'Higher Education Management Handbook',
    ],
    proceeding: [
      'International Conference on Academic Leadership',
      'Workshop on Program Development',
    ],
    article: [
      'Student Mentorship Programs: A Case Study',
      'Building Effective Academic Communities',
    ],
  },
  bookmarks: [5, 7, 11, 15],
  notifications: [
    {
      id: 1,
      message: "New publication submission for review",
      date: "2024-01-27",
      read: false,
    },
    {
      id: 2,
      message: "Academic committee meeting scheduled",
      date: "2024-01-25",
      read: false,
    },
    {
      id: 3,
      message: "Your research proposal has been approved",
      date: "2024-01-21",
      read: true,
    },
  ],
  verification: [
    {
      id: 1,
      publicationTitle: "Curriculum Development in Higher Education",
      status: "verified",
      submissionDate: "2024-01-12",
      verificationDate: "2024-01-18",
    },
    {
      id: 2,
      publicationTitle: "Student Mentorship Programs: A Case Study",
      status: "verified",
      submissionDate: "2024-01-15",
      verificationDate: "2024-01-20",
    },
    {
      id: 3,
      publicationTitle: "Interdisciplinary Collaboration in Academia",
      status: "pending",
      submissionDate: "2024-01-25",
      verificationDate: null,
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
