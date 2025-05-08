import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProfileProvider } from './context/profileContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />

//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>

)
