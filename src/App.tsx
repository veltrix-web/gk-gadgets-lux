import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/store/StoreContext';
import { ToastProvider } from '@/store/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import HomePage from '@/components/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ToastProvider>
          <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1 pb-28 lg:pb-0">
              <HomePage />
            </main>
            <Footer />
            <FloatingButtons />
          </div>
        </ToastProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}
