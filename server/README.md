# InterviewIQ Backend API Server ⚙️

This folder contains the Node.js / Express backend server that serves the REST API endpoints and integrates with MongoDB, OpenRouter, and Razorpay.

For complete project-wide setup, documentation, API architecture, and guides, please refer to the main [Root README.md](../README.md).

## 🚀 Getting Started

### 📦 Installation
```bash
npm install
```

### ⚙️ Environment Variables
Create a `.env` file in this directory and populate the variables:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 💻 Running Development Server
```bash
npm run dev
```
*Runs by default on `http://localhost:8000` (or configured port)*

## 🛠️ Key Technologies Used: 
- **Express.js (v5)** (API routing)
- **Mongoose ODM** (MongoDB models)
- **Multer** (Resume uploads)
- **PDFJS-Dist** (PDF extraction)
- **Razorpay Node SDK** (Payments verification)
- **Axios** (OpenRouter GPT API calls)
