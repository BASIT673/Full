import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   
  </StrictMode>,
)
// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux"; // Import Provider
// // import store from "./store"; // Import the Redux store
// // import App from "./App";
// import App from "./App.jsx";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider >
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );