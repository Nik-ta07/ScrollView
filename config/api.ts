// API Configuration
export const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  TIMEOUT: 10000, // 10 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: "/health",
  USERS: "/users",
  TODOS: "/todos",
} as const;

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
