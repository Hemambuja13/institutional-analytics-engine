# institutional-analytics-engine


## ER DIAGRAM
<img width="1691" height="731" alt="intelligent_institutional_analytics drawio" src="https://github.com/user-attachments/assets/487ae6c5-b9c7-47c2-a232-2c27fb5c9a82"  />

<b><b>

















## ARCHITECTURE
<img width="1343" height="619" alt="Architecture drawio" src="https://github.com/user-attachments/assets/5708387d-d0e7-48ce-a278-36b30121c6a0" />



## BOILERPLATE

IIAE/
│
├── frontend/                          # React Frontend
│   ├── public/
│   │   └── index.html                 # Main HTML template
│   ├── src/
│   │   ├── assets/                    # Images, icons, static files
│   │   │   └── logo.png
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Sidebar.js             # Sidebar navigation
│   │   │   ├── Navbar.js              # Top navigation bar
│   │   │   ├── StatCard.js            # Stats display card
│   │   │   ├── RiskMeter.js           # Dropout risk meter
│   │   │   └── Toast.js               # Toast notifications
│   │   ├── pages/                     # Full page components
│   │   │   ├── Login.js               # Login page (Student/Faculty/Admin)
│   │   │   ├── AdminDashboard.js      # Admin dashboard
│   │   │   ├── StudentDashboard.js    # Student dashboard
│   │   │   └── FacultyDashboard.js    # Faculty dashboard
│   │   ├── services/                  # API service layer
│   │   │   └── api.js                 # All API calls with JWT
│   │   ├── context/                   # React context
│   │   │   └── AuthContext.js         # Auth state management
│   │   ├── App.js                     # Main app with routes
│   │   └── index.js                   # React entry point
│   ├── package.json                   # Frontend dependencies
│   ├── package-lock.json              # Dependency lock file
│   └── .env                           # Frontend env variables
│
├── backend/                           # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                      # MySQL connection pool
│   ├── controllers/                   # Business logic
│   │   ├── authController.js          # Login / JWT generation
│   │   ├── studentController.js       # Add / Delete students
│   │   ├── facultyController.js       # Add / Delete faculty
│   │   └── analyticsController.js     # Analytics data logic
│   ├── middleware/                    # Express middleware
│   │   └── auth.js                    # JWT verify + role check
│   ├── routes/                        # API route definitions
│   │   ├── auth_route.js              # /api/auth
│   │   ├── students_route.js          # /api/students
│   │   ├── faculty_route.js           # /api/faculty
│   │   └── analytics_route.js         # /api/analytics
│   ├── server.js                      # Express entry point
│   ├── package.json                   # Backend dependencies
│   ├── package-lock.json              # Dependency lock file
│   └── .env                           # DB config + JWT secret
│
├── database/
│   └── iiae_db.sql                    # MySQL schema + seed data
│
├── .gitignore                         # Files to ignore in git
└── README.md                          # Project documentation




