const defaultServerUrl = import.meta.env.DEV
  ? "http://localhost:6000"
  : "https://interviewiq-server-ztrz.onrender.com";

export const ServerUrl = import.meta.env.VITE_SERVER_URL || defaultServerUrl;
