import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { HomePage, AboutPage } from "./pages/HomePage"

export default function App() {
  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/forgot-password" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
