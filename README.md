# 💻 Sphere: Building a Social Media Platform with React

Sphere is a modern social media web application built with **React**, focused on real user experience, clean frontend architecture, and polished interaction design.

The project emphasizes intentional UI flows, responsive interactions, and scalable code structure rather than rushed feature implementation.

---

## 🚀 Live Demo

🔗 **Live Preview:** https://sphere-media-xi.vercel.app  
💻 **GitHub Repository:** https://github.com/diaaeldeenn/SocialMediaApp  

---

## 🧠 Project Overview

Sphere was designed to simulate a real-world social media experience with thoughtful user interactions and clear feedback for every action.

### Key Goals

- Build realistic posting and interaction flows
- Focus on UX clarity and responsiveness
- Maintain clean, scalable frontend architecture
- Centralize API communication and state handling
- Deliver a smooth and predictable user experience

---

## 🧩 Features

### 🧠 Posting Experience

- Dedicated post creation modal (not a basic input)
- Image upload with instant preview before publishing
- Integrated emoji picker for expressive content
- Smooth transitions and subtle animations
- Clear feedback for loading, success, and error states

Designed to feel intentional and distraction-free.

---

### 💬 Comments & Interaction

- Add, edit, and delete comments with ownership-based permissions
- Live comment count updates without breaking the UI flow
- Expandable comment sections for better readability
- Clean comment UI with avatars and smart timestamps

Every interaction is built to feel responsive and predictable.

---

### 👤 Profile Experience

- Dedicated profile page with a personal post feed
- Change profile picture with live preview
- Secure password change inside the profile
- Clear separation between global feed and personal content

The profile is treated as a personal space, not just another page.

---

### 🎨 UI / UX Highlights

- Fully responsive layout (mobile → desktop)
- Dark / Light mode with persistent preference
- Skeleton loaders instead of empty states
- Toast notifications for real-time feedback
- Subtle micro-interactions enhancing usability

Every UI decision aims to reduce friction and improve clarity.

---

## ⚙️ Frontend Architecture & Implementation

- **React 19** with modern hooks  
  `useState`, `useEffect`, `useContext`, `useRef`
- **Context API** for authentication and theme management
- **Protected routing** with clear auth boundaries
- **React Hook Form + Zod** for strict, user-friendly validation
- **Axios instance & interceptors** for centralized API communication
- **Service-based API layer** for separation of concerns
- Reusable and modular component structure

Built with scalability, readability, and long-term maintainability in mind.

---

## 🗂️ Project Structure

```text
sphere/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── DiaaEldeen.ico
│   │
│   ├── components/
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── Posts/
│   │   │   ├── CreatePost/
│   │   │   │   ├── CreatePost.jsx
│   │   │   │   ├── CreatePostProfile/
│   │   │   │   │   └── CreatePostProfile.jsx
│   │   │   │   └── PostModal.jsx
│   │   │   │
│   │   │   ├── PostCard/
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostHeader/
│   │   │   │   │   └── PostHeader.jsx
│   │   │   │   ├── PostBody/
│   │   │   │   │   └── PostBody.jsx
│   │   │   │   ├── PostFooter/
│   │   │   │   │   ├── PostFooter.jsx
│   │   │   │   │   └── PostAllcomment.jsx
│   │   │   │   └── MyPost/
│   │   │   │       ├── MyPost.jsx
│   │   │   │       ├── MyPostCard.jsx
│   │   │   │       ├── MyPostDetails.jsx
│   │   │   │       ├── PostHeader/
│   │   │   │       │   └── MyPostHeader.jsx
│   │   │   │       ├── PostBody/
│   │   │   │       │   └── MyPostBody.jsx
│   │   │   │       └── PostFooter/
│   │   │   │           ├── MyPostFooter.jsx
│   │   │   │           └── MyPostAllComments.jsx
│   │   │   │
│   │   │   ├── PostDetails/
│   │   │   │   ├── PostDetails.jsx
│   │   │   │   └── CommentIconDetails.jsx
│   │   │   │
│   │   │   ├── PostSkeleton/
│   │   │   │   └── PostSkeleton.jsx
│   │   │   │
│   │   │   └── postDate.js
│   │   │
│   │   └── ProtectedRoutes/
│   │       ├── AppProtectedRoutes.jsx
│   │       └── AuthProtectedRoutes.jsx
│   │
│   ├── context/
│   │   ├── Theme/
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   └── UserContext/
│   │       └── UserContext.jsx
│   │
│   ├── Layouts/
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   │
│   ├── lib/
│   │   └── schema/
│   │       └── authSchema.js
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login/
│   │   │   │   └── Login.jsx
│   │   │   └── Register/
│   │   │       └── Register.jsx
│   │   │
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── Profile/
│   │   │   └── Profile.jsx
│   │   │
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   │
│   ├── services/
│   │   └── api/
│   │       ├── axiosInstance.js
│   │       ├── auth.api.js
│   │       ├── post.api.js
│   │       ├── comment.api.js
│   │       └── profile.api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

---

## 🛠 Tech Stack

### Core Technologies
- **React 19** — Modern React with Hooks
- **React Router v6** — Client-side routing
- **Vite** — Lightning-fast build tool
- **Axios** — HTTP client for API requests


### State & Forms
- **Context API**
- **React Hook Form**
- **Zod validation**

### Styling
- **Hero UI**
- **Framer motion**
- **Tailwind CSS**
- **Dark / Light theme support**
- **Skeleton loaders**
- **Toast notifications (toastify)**

---

### 🎯 Design Philosophy
Sphere was built with attention to interaction details.
How posting feels, how loading states are handled, and how feedback is delivered were all treated as core features, not afterthoughts.

---

# 👨‍💻 Developer

**Diaa Eldeen**
- Front-End Developer
- Mern-Stack Coming Soon!
