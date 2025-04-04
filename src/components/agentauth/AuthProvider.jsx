import React, { createContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create the provider component
export const AuthProviderAgent = ({ children }) => {
  // Initialize state with values from localStorage if available
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [agentInfo, setAgentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedAgentInfo = localStorage.getItem('agentInfo');
    
    if (storedToken && storedAgentInfo) {
      setToken(storedToken);
      setAgentInfo(JSON.parse(storedAgentInfo));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (token, agentData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('agentInfo', JSON.stringify(agentData));
    
    setToken(token);
    setAgentInfo(agentData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('agentInfo');
    
    setToken(null);
    setAgentInfo(null);
    setIsAuthenticated(false);
  };

  // Update agent info function
  const updateAgentInfo = (updatedInfo) => {
    const updatedAgentInfo = { ...agentInfo, ...updatedInfo };
    localStorage.setItem('agentInfo', JSON.stringify(updatedAgentInfo));
    setAgentInfo(updatedAgentInfo);
  };

  // Context value
  const value = {
    isAuthenticated,
    token,
    agentInfo,
    loading,
    login,
    logout,
    updateAgentInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};