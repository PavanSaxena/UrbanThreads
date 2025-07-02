# 🏗 Architecture – UrbanThreads

## MERN Stack Implementation
- **Frontend:** React 18 + Vite + TailwindCSS + React Router
- **Backend:** Node.js + Express.js + JWT Authentication
- **Database:** MongoDB + Mongoose ODM
- **State Management:** React Context API (Auth, Cart, Theme)

## Detailed Folder Structure
```
UrbanThreads/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── BillReceipt.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/          # Route components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── contexts/       # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── server/                 # Express Backend
│   ├── models/             # MongoDB schemas
│   │   ├── User.js         # User authentication model
│   │   ├── Product.js      # Product catalog model
│   │   └── Order.js        # Order management model
│   ├── routes/             # API endpoints
│   │   ├── auth.js         # Authentication routes
│   │   ├── product.js      # Product CRUD routes
│   │   └── orders.js       # Order management routes
│   ├── middleware/
│   │   └── auth.js         # JWT middleware
│   ├── index.js            # Express server setup
│   └── package.json
└── Documentation/
    ├── APPLICATION_FLOW.md
    ├── ARCHITECTURE.md
    ├── FEATURE_CHECKLIST.md
    ├── IMPLEMENTATION_PLAN.md
    ├── PRD.md
    └── FULL_CONTEXT_PROMPT.md
```

## Security Architecture
- **JWT Authentication**: Secure token-based auth with 7-day expiry
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: express-validator for request validation
- **Protected Routes**: Middleware-based route protection
- **CORS Configuration**: Secure cross-origin requests

## Database Schema Design
- **Users**: Authentication, roles, profile management
- **Products**: Catalog with variants (size, color), pricing, categories
- **Orders**: Complete order lifecycle with payment tracking

## Frontend Architecture
- **Component-based**: Modular, reusable React components
- **Context API**: Global state management for auth, cart, theme
- **Responsive Design**: TailwindCSS for mobile-first approach
- **Route Protection**: HOC for authenticated routes

## Communication Patterns
- **RESTful APIs**: Standard HTTP methods for CRUD operations
- **JSON Data Exchange**: Structured request/response format
- **Error Handling**: Consistent error responses with proper status codes
- **Real-time Updates**: Context-based state synchronization