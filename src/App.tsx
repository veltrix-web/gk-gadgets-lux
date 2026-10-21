import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from '@/store/StoreContext';
import { ToastProvider } from '@/store/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import HomePage from '@/components/HomePage';
import ProductPage from '@/components/ProductPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ToastProvider>
          <div className="flex min-h-screen flex-col bg-white">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1 pb-28 lg:pb-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <FloatingButtons />
          </div>
        </ToastProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}
