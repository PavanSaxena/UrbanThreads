# UrbanThreads

UrbanThreads is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application for modern clothing brands. It offers a seamless user shopping experience and efficient admin control for inventory and order management.

---

## 📁 Project Structure

```
UrbanThreads/
├── client/                 # Frontend (React + Vite + Tailwind CSS)
│   ├── public/
│   └── src/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── .env                    # Environment config for server
├── README.md
├── PRD.md
├── ARCHITECTURE.md
├── APPLICATION_FLOW.md
├── FEATURE_CHECKLIST.md
└── IMPLEMENTATION_PLAN.md
```

---

## 🛠 Tech Stack

### Frontend:

- React.js
- Vite
- Tailwind CSS

### Backend:

- Node.js
- Express.js
- MongoDB + Mongoose

### Others:

- dotenv
- CORS

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (Atlas or Local)

### Steps

```bash
git clone <repo-url>
cd UrbanThreads

# Setup backend
cd server
npm install

# Setup frontend
cd ../client
npm install
```

---

## 🚀 Running the Application

### Start Backend

```bash
cd server
node index.js
```

Ensure your `.env` file in `server/` has the following:

```
PORT=5000
MONGO_URI=your_mongodb_uri_here
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)  
Backend runs on [http://localhost:5000](http://localhost:5000)

---

## 📌 Important Project Docs

- [Product Requirements Document (PRD)](./PRD.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Application Flow](./APPLICATION_FLOW.md)
- [Feature Checklist](./FEATURE_CHECKLIST.md)
- [Implementation Plan](./IMPLEMENTATION_PLAN.md)

---

## 👨‍💻 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---
