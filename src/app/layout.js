import { Ubuntu } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import CartProvider from '@/components/CartProvider';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
});

export const metadata = {
  title: 'FoodNest - Delicious Food Delivery',
  description: 'Order fresh, delicious meals delivered straight to your door',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} font-ubuntu antialiased bg-black text-white`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #374151',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                style: {
                  background: '#10B981',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#EF4444',
                },
              },
              loading: {
                style: {
                  background: '#F59E0B',
                  color: '#fff',
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
