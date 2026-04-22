import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ChatPage from './pages/ChatPage.jsx';
import FindLawyer from './pages/FindLawyer.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import VerticalNavbar from './components/VerticalNAvbar.jsx';

const App = () => {
  const location = useLocation();
  const isChatRoute = location.pathname === '/chat';

  return (
    <div className="flex">
      {isChatRoute ? (
        <>
          <VerticalNavbar />
          <div className="ml-0 md:ml-64 w-full min-h-screen bg-gray-100">
            <Routes>
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="w-full">
          <Navbar />
          <div className="pt-16 min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/findlawyers" element={<FindLawyer />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
