import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import NotFound from "./Pages/NotFound";
import Loading from "./Components/Loading";

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    // Simulasi loading setiap kali berpindah halaman
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loading muncul selama 1.5 detik setiap berpindah halaman

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading ? <Loading /> : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/anime/:id" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
