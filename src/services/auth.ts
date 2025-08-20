// Mock authentication service
export const authAPI = {
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@example.com' && password === 'password') {
      return {
        user: {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    
    throw new Error('Invalid credentials');
  },

  signup: async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      return {
        user: {
          id: '1',
          email,
          name,
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    
    throw new Error('Invalid signup data');
  },
};