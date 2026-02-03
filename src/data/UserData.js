// Admin User
export const adminUser = {
  id: 1,
  userID: "admin001",
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
};

// Student User
export const studentUser = {
  id: 2,
  userID: "student001",
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
  notifications: [
    {
      id: 1,
      message: "Your submission has been received",
      date: "2024-01-25",
      read: false,
    },
  ],
};

// Lecturer User
export const lecturerUser = {
  id: 3,
  userID: "lecturer001",
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
};

// Coordinator User
export const coordinatorUser = {
  id: 4,
  userID: "coordinator001",
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
};

// Default current user (set to student by default)
export const currentUser = studentUser;
