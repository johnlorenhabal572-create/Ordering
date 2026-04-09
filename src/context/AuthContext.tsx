import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('capstone_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user to local storage whenever they log in or out
  useEffect(() => {
    if (user) {
      localStorage.setItem('capstone_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('capstone_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Hardcoded Test Accounts
    if (email === 'admin@store.com' && password === 'admin123') {
      setUser({ name: 'Store Admin', role: 'admin', email });
      return true;
    } else if (email === 'staff@store.com' && password === 'staff123') {
      setUser({ name: 'Store Staff', role: 'staff', email });
      return true;
    }
    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};