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
                background: '#363636',
                color: '#fff',
                borderRadius: '10px',
                padding: '16px',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
