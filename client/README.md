# InterviewIQ Client Application 🎨

This folder contains the React frontend application built using **Vite**, **Tailwind CSS (v4)**, and **Redux Toolkit**.

For complete project-wide setup, documentation, API architecture, and guides, please refer to the main [Root README.md](../README.md).

## 🚀 Getting Started

### 📦 Installation
```bash
npm install
```

### ⚙️ Environment Variables
Create a `.env` file in this directory and populate the variables:
```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_DEMO_MODE=false
```

Set `VITE_DEMO_MODE=true` only for a local/demo frontend. In this mode, Start Interview skips Firebase sign-in and uses sample questions and illustrative, locally generated scores; resume analysis and checkout are disabled. Demo interviews are not saved, and Firebase/Razorpay credentials are not needed for this practice flow. The server-side authentication and payment endpoints remain protected. Restart Vite after changing this variable.

### 💻 Running Development Server
```bash
npm run dev
```
*Runs by default on `http://localhost:5173`*

### 🏗️ Build Production
```bash
npm run build
```

## 🛠️ Key Technologies Used
- **React 19 & Vite** (UI engine & compilation)
- **Tailwind CSS v4** (Utility styling)
- **Redux Toolkit & React-Redux** (State management)
- **Framer Motion (`motion`)** (Transitions and visual micro-interactions)
- **Recharts & React Circular Progressbar** (Dashboard charts & metrics)
- **jsPDF & jsPDF-AutoTable** (PDF generator utility)
- **Web Speech API** (Speech Recognition & Speech Synthesis)
