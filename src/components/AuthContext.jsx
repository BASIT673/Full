// AuthContext.js

// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//       // Optionally fetch user details here
//     }
//   }, []);

//   const login = (token, userData) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedAgent = localStorage.getItem("agent");
    
//     if (token) {
//       setIsAuthenticated(true);
      
//       // If we have stored agent data, parse and set it
//       if (storedAgent) {
//         try {
//           const parsedAgent = JSON.parse(storedAgent);
//           setAgent(parsedAgent);
//           setUser(parsedAgent); // For backward compatibility
//         } catch (error) {
//           console.error("Failed to parse stored agent data:", error);
//         }
//       }
//     }
    
//     setLoading(false);
//   }, []);

//   const login = (token, agentData) => {
//     localStorage.setItem("token", token);
    
//     // Store agent data in localStorage
//     if (agentData) {
//       localStorage.setItem("agent", JSON.stringify(agentData));
//       setAgent(agentData);
//       setUser(agentData); // For backward compatibility
//     }
    
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("agent");
//     setIsAuthenticated(false);
//     setAgent(null);
//     setUser(null);
//   };

//   const updateAgent = (newAgentData) => {
//     const updatedAgent = { ...agent, ...newAgentData };
//     localStorage.setItem("agent", JSON.stringify(updatedAgent));
//     setAgent(updatedAgent);
//     setUser(updatedAgent); // For backward compatibility
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         agent,
//         login,
//         logout,
//         updateAgent,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage for a token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAgent = localStorage.getItem("agent");
    
    if (token) {
      setIsAuthenticated(true);
      
      // If we have stored agent data, parse and set it
      if (storedAgent) {
        try {
          const parsedAgent = JSON.parse(storedAgent);
          setAgent(parsedAgent);
          setUser(parsedAgent); // For backward compatibility
        } catch (error) {
          console.error("Failed to parse stored agent data:", error);
          // Clear invalid data
          localStorage.removeItem("agent");
        }
      }
    } else {
      // If no token exists, ensure user is properly logged out
      setIsAuthenticated(false);
      setAgent(null);
      setUser(null);
    }
    
    setLoading(false);
  }, []);

  const login = (token, agentData) => {
    if (!token) {
      console.error("Attempted to login without a token");
      return;
    }
    
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    
    // Store agent data in localStorage
    if (agentData) {
      localStorage.setItem("agent", JSON.stringify(agentData));
      setAgent(agentData);
      setUser(agentData); // For backward compatibility
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("agent");
    setIsAuthenticated(false);
    setAgent(null);
    setUser(null);
  };

  const updateAgent = (newAgentData) => {
    if (!agent) {
      console.error("Attempted to update agent data when no agent exists");
      return;
    }
    
    const updatedAgent = { ...agent, ...newAgentData };
    localStorage.setItem("agent", JSON.stringify(updatedAgent));
    setAgent(updatedAgent);
    setUser(updatedAgent); // For backward compatibility
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        agent,
        login,
        logout,
        updateAgent,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;


// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedAgent = localStorage.getItem("agent");
    
//     if (token) {
//       setIsAuthenticated(true);
      
//       // If we have stored agent data, parse and set it
//       if (storedAgent) {
//         try {
//           const parsedAgent = JSON.parse(storedAgent);
          
//           // Make sure we set isAgent flag if it doesn't exist
//           if (parsedAgent.role === 'agent' && !parsedAgent.isAgent) {
//             parsedAgent.isAgent = true;
//           }
          
//           setAgent(parsedAgent);
//           setUser(parsedAgent); // For backward compatibility
//         } catch (error) {
//           console.error("Failed to parse stored agent data:", error);
//           // Clear invalid data
//           localStorage.removeItem("agent");
//         }
//       }
//     } else {
//       // If no token exists, ensure user is properly logged out
//       setIsAuthenticated(false);
//       setAgent(null);
//       setUser(null);
//     }
    
//     setLoading(false);
//   }, []);

//   const login = (token, agentData) => {
//     if (!token) {
//       console.error("Attempted to login without a token");
//       return;
//     }
    
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
    
//     // Store agent data in localStorage
//     if (agentData) {
//       // Ensure agent has isAgent flag if they have the agent role
//       if (agentData.role === 'agent' && !agentData.isAgent) {
//         agentData.isAgent = true;
//       }
      
//       localStorage.setItem("agent", JSON.stringify(agentData));
//       setAgent(agentData);
//       setUser(agentData); // For backward compatibility
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("agent");
//     setIsAuthenticated(false);
//     setAgent(null);
//     setUser(null);
//   };

//   const updateAgent = (newAgentData) => {
//     if (!agent) {
//       console.error("Attempted to update agent data when no agent exists");
//       return;
//     }
    
//     const updatedAgent = { ...agent, ...newAgentData };
    
//     // Ensure agent has isAgent flag if they have the agent role
//     if (updatedAgent.role === 'agent' && !updatedAgent.isAgent) {
//       updatedAgent.isAgent = true;
//     }
    
//     localStorage.setItem("agent", JSON.stringify(updatedAgent));
//     setAgent(updatedAgent);
//     setUser(updatedAgent); // For backward compatibility
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         agent,
//         login,
//         logout,
//         updateAgent,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// import React, { createContext, useState, useEffect } from "react";

// ✅ Export the AuthContext
// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedAgent = localStorage.getItem("agent");

//     if (token) {
//       setIsAuthenticated(true);

//       // If we have stored agent data, parse and set it
//       if (storedAgent) {
//         try {
//           const parsedAgent = JSON.parse(storedAgent);

//           if (parsedAgent.role === "agent" && !parsedAgent.isAgent) {
//             parsedAgent.isAgent = true;
//           }

//           setAgent(parsedAgent);
//           setUser(parsedAgent);
//         } catch (error) {
//           console.error("Failed to parse stored agent data:", error);
//           localStorage.removeItem("agent");
//         }
//       }
//     } else {
//       setIsAuthenticated(false);
//       setAgent(null);
//       setUser(null);
//     }

//     setLoading(false);
//   }, []);

//   // Login Function
//   const login = (token, agentData) => {
//     if (!token) {
//       console.error("Attempted to login without a token");
//       return;
//     }

//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);

//     if (agentData) {
//       if (agentData.role === "agent" && !agentData.isAgent) {
//         agentData.isAgent = true;
//       }

//       localStorage.setItem("agent", JSON.stringify(agentData));
//       setAgent(agentData);
//       setUser(agentData);
//     }
//   };

//   // Logout Function
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("agent");
//     setIsAuthenticated(false);
//     setAgent(null);
//     setUser(null);
//   };

//   // Update Agent Data
//   const updateAgent = (newAgentData) => {
//     if (!agent) {
//       console.error("Attempted to update agent data when no agent exists");
//       return;
//     }

//     const updatedAgent = { ...agent, ...newAgentData };

//     if (updatedAgent.role === "agent" && !updatedAgent.isAgent) {
//       updatedAgent.isAgent = true;
//     }

//     localStorage.setItem("agent", JSON.stringify(updatedAgent));
//     setAgent(updatedAgent);
//     setUser(updatedAgent);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         agent,
//         login,
//         logout,
//         updateAgent,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Export AuthProvider
export default AuthProvider;
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedAgent = localStorage.getItem("agent");
//     const storedUser = localStorage.getItem("user");
    
//     if (token) {
//       setIsAuthenticated(true);
      
//       // If we have stored agent data, parse and set it
//       if (storedAgent) {
//         try {
//           const parsedAgent = JSON.parse(storedAgent);
          
//           // Make sure we set isAgent flag if it doesn't exist
//           if (parsedAgent.role === 'agent' && !parsedAgent.isAgent) {
//             parsedAgent.isAgent = true;
//           }
          
//           setAgent(parsedAgent);
//           // Important: If agent data is found, ensure user is null to avoid confusion
//           setUser(null);
//         } catch (error) {
//           console.error("Failed to parse stored agent data:", error);
//           // Clear invalid data
//           localStorage.removeItem("agent");
//         }
//       }
      
//       // If we have stored user data and no agent data, parse and set it
//       else if (storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
//           // Important: If user data is found, ensure agent is null to avoid confusion
//           setAgent(null);
//         } catch (error) {
//           console.error("Failed to parse stored user data:", error);
//           // Clear invalid data
//           localStorage.removeItem("user");
//         }
//       }
//     } else {
//       // If no token exists, ensure user is properly logged out
//       setIsAuthenticated(false);
//       setAgent(null);
//       setUser(null);
//     }
    
//     setLoading(false);
//   }, []);
  
//   const login = (token, userData) => {
//     if (!token) {
//       console.error("Attempted to login without a token");
//       return;
//     }
    
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
    
//     // Determine if user is an agent or regular user and ONLY set one of them
//     if (userData) {
//       if (userData.role === 'agent') {
//         // Ensure agent has isAgent flag
//         if (!userData.isAgent) {
//           userData.isAgent = true;
//         }
        
//         localStorage.setItem("agent", JSON.stringify(userData));
//         setAgent(userData);
//         // Important: Clear any existing user data to avoid confusion
//         localStorage.removeItem("user");
//         setUser(null);
//       } else {
//         // This is a regular user
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//         // Important: Clear any existing agent data to avoid confusion
//         localStorage.removeItem("agent");
//         setAgent(null);
//       }
//     }
//   };
  
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("agent");
//     localStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setAgent(null);
//     setUser(null);
//   };

//   const updateAgent = (newAgentData) => {
//     if (!agent) {
//       console.error("Attempted to update agent data when no agent exists");
//       return;
//     }
    
//     const updatedAgent = { ...agent, ...newAgentData };
    
//     // Ensure agent has isAgent flag if they have the agent role
//     if (updatedAgent.role === 'agent' && !updatedAgent.isAgent) {
//       updatedAgent.isAgent = true;
//     }
    
//     localStorage.setItem("agent", JSON.stringify(updatedAgent));
//     setAgent(updatedAgent);
//   };
  
//   const updateUser = (newUserData) => {
//     if (!user) {
//       console.error("Attempted to update user data when no user exists");
//       return;
//     }
    
//     const updatedUser = { ...user, ...newUserData };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };
  
//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         agent,
//         login,
//         logout,
//         updateAgent,
//         updateUser,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // We'll use a single state object to track the authentication state
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     userType: null, // 'agent' or 'user'
//     userData: null,
//     loading: true
//   });
  
//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userType = localStorage.getItem("userType");
//     const userData = localStorage.getItem("userData");
    
//     if (token && userType && userData) {
//       try {
//         const parsedUserData = JSON.parse(userData);
        
//         // Set the authentication state
//         setAuthState({
//           isAuthenticated: true,
//           userType: userType, // 'agent' or 'user'
//           userData: parsedUserData,
//           loading: false
//         });
//       } catch (error) {
//         console.error("Failed to parse stored user data:", error);
//         // Clear invalid data and reset auth state
//         localStorage.removeItem("token");
//         localStorage.removeItem("userType");
//         localStorage.removeItem("userData");
        
//         setAuthState({
//           isAuthenticated: false,
//           userType: null,
//           userData: null,
//           loading: false
//         });
//       }
//     } else {
//       // If any required data is missing, ensure user is properly logged out
//       localStorage.removeItem("token");
//       localStorage.removeItem("userType");
//       localStorage.removeItem("userData");
      
//       setAuthState({
//         isAuthenticated: false,
//         userType: null,
//         userData: null,
//         loading: false
//       });
//     }
//   }, []);
  
//   const login = (token, userData) => {
//     if (!token || !userData) {
//       console.error("Attempted to login without token or user data");
//       return;
//     }
    
//     // Determine user type based on role or explicit properties
//     const userType = userData.role === 'agent' || userData.isAgent ? 'agent' : 'user';
    
//     // Store everything in localStorage
//     localStorage.setItem("token", token);
//     localStorage.setItem("userType", userType);
//     localStorage.setItem("userData", JSON.stringify(userData));
    
//     // Update state
//     setAuthState({
//       isAuthenticated: true,
//       userType: userType,
//       userData: userData,
//       loading: false
//     });
    
//     // Log the login for debugging
//     console.log("Logged in as:", userType, userData);
//   };
  
//   const logout = () => {
//     // Clear localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("userType");
//     localStorage.removeItem("userData");
    
//     // Update state
//     setAuthState({
//       isAuthenticated: false,
//       userType: null,
//       userData: null,
//       loading: false
//     });
    
//     console.log("Logged out");
//   };

//   const updateUserData = (newData) => {
//     if (!authState.isAuthenticated || !authState.userData) {
//       console.error("Attempted to update user data when not authenticated");
//       return;
//     }
    
//     const updatedUserData = { ...authState.userData, ...newData };
    
//     // Update localStorage
//     localStorage.setItem("userData", JSON.stringify(updatedUserData));
    
//     // Update state
//     setAuthState(prevState => ({
//       ...prevState,
//       userData: updatedUserData
//     }));
    
//     console.log("Updated user data:", updatedUserData);
//   };
  
//   // Create a simplified API for components to use
//   const contextValue = {
//     isAuthenticated: authState.isAuthenticated,
//     userType: authState.userType,
//     userData: authState.userData,
//     isAgent: authState.userType === 'agent',
//     isUser: authState.userType === 'user',
//     login,
//     logout,
//     updateUserData,
//     loading: authState.loading
//   };
  
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // Check localStorage for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedAgent = localStorage.getItem("agent");
//     const storedUser = localStorage.getItem("user");
    
//     if (token) {
//       setIsAuthenticated(true);
      
//       // If we have stored agent data, parse and set it
//       if (storedAgent) {
//         try {
//           const parsedAgent = JSON.parse(storedAgent);
          
//           // Make sure we set isAgent flag if it doesn't exist
//           if (parsedAgent.role === 'agent' && !parsedAgent.isAgent) {
//             parsedAgent.isAgent = true;
//           }
          
//           setAgent(parsedAgent);
//         } catch (error) {
//           console.error("Failed to parse stored agent data:", error);
//           // Clear invalid data
//           localStorage.removeItem("agent");
//         }
//       }
      
//       // If we have stored user data, parse and set it
//       if (storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           setUser(parsedUser);
//         } catch (error) {
//           console.error("Failed to parse stored user data:", error);
//           // Clear invalid data
//           localStorage.removeItem("user");
//         }
//       }
//     } else {
//       // If no token exists, ensure user is properly logged out
//       setIsAuthenticated(false);
//       setAgent(null);
//       setUser(null);
//     }
    
//     setLoading(false);
//   }, []);
  
//   const login = (token, userData) => {
//     if (!token) {
//       console.error("Attempted to login without a token");
//       return;
//     }
    
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
    
//     // Determine if user is an agent or regular user
//     if (userData) {
//       if (userData.role === 'agent') {
//         // Ensure agent has isAgent flag
//         if (!userData.isAgent) {
//           userData.isAgent = true;
//         }
        
//         localStorage.setItem("agent", JSON.stringify(userData));
//         setAgent(userData);
//       } else {
//         // This is a regular user
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//       }
//     }
//   };
  
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("agent");
//     localStorage.removeItem("user");
//     setIsAuthenticated(false);
//     setAgent(null);
//     setUser(null);
//   };
  
//   const updateAgent = (newAgentData) => {
//     if (!agent) {
//       console.error("Attempted to update agent data when no agent exists");
//       return;
//     }
    
//     const updatedAgent = { ...agent, ...newAgentData };
    
//     // Ensure agent has isAgent flag if they have the agent role
//     if (updatedAgent.role === 'agent' && !updatedAgent.isAgent) {
//       updatedAgent.isAgent = true;
//     }
    
//     localStorage.setItem("agent", JSON.stringify(updatedAgent));
//     setAgent(updatedAgent);
//   };
  
//   const updateUser = (newUserData) => {
//     if (!user) {
//       console.error("Attempted to update user data when no user exists");
//       return;
//     }
    
//     const updatedUser = { ...user, ...newUserData };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };
  
//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         agent,
//         login,
//         logout,
//         updateAgent,
//         updateUser,
//         loading
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export default AuthProvider;