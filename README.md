# 🚀 TaskFlow

**TaskFlow** is a full-stack productivity web application designed to help users manage their daily tasks, maintain notes, track consistency with GitHub-like streaks, and store important links all in one place. It combines simplicity with powerful features, offering a focused and organized experience for everyday productivity.

---

## 🌟 Features

-   🔐 **User Authentication** (JWT-based)
-   ✅ **Task Management**: Create, update, complete, and organize tasks.
-   🔁 **Streak System**: GitHub-like contribution streak view.
-   📌 **Keep Section**: Save and categorize important links for quick access.
-   📆 **Day-based Structure**: Data is stored and visualized per day.
-   🧠 **Auto Status Syncing**: Automatically updates daily task status (None, Partial, Completed).
-   💡 **Modern UI**

---

## 🔗 Live Link
- Please open this on a larger screen (e.g., laptop or monitor). This is not yet optimized for mobile (❌ Not responsive on mobile).
- Sorry for the slightly late response — my server isn't very powerful.
   ### https://taskflow-dev.vercel.app

## 🛠️ Tech Stack

**Frontend:**

-   React
-   Tailwind CSS
-   Zustand (for global state)
-   Axios

**Backend:**

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT for authentication
-   Cookie-based sessions

**Other Tools:**

-   React Router

---

## 📷 Demo Screenshots

### LandingPage View

![LandingPage](https://res.cloudinary.com/tea-aur-backend/image/upload/v1752778369/Send_emails_with_Node.js_-_Resend_-_Google_Chrome_18-07-2025_00_18_07_aguvwv.png)

### Dashboard View

![Dashboard](https://res.cloudinary.com/tea-aur-backend/image/upload/v1752778369/Send_emails_with_Node.js_-_Resend_-_Google_Chrome_18-07-2025_00_17_56_on8cry.png)

### Task View

![Task View](https://res.cloudinary.com/tea-aur-backend/image/upload/v1752778369/Send_emails_with_Node.js_-_Resend_-_Google_Chrome_18-07-2025_00_17_18_gd33h2.png)

### Keep View

![Keep View](https://res.cloudinary.com/tea-aur-backend/image/upload/v1752778369/Send_emails_with_Node.js_-_Resend_-_Google_Chrome_18-07-2025_00_17_45_bwatgl.png)

### Streak Graph

![Streak Graph](https://res.cloudinary.com/tea-aur-backend/image/upload/v1752778369/Send_emails_with_Node.js_-_Resend_-_Google_Chrome_18-07-2025_00_17_30_gpbxe8.png)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow

# Backend
cd Backend
npm install

# Frontend
cd Frontend
npm install

```

### Setup Environment Variables (for backend)

```bash

PORT=
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=

// Just for testing purpose
MAILTRAP_HOST=
MAILTRAP_PORT=
MAILTRAP_USERNAME=
MAILTRAP_PASSWORD=
MAILTRAP_SENDEREMAIL=

// Backend Url
BASE_URI=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```
