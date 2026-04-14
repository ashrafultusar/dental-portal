import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
  }

const MainLayout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Common Navbar */}
            <Navbar />

            {/* Main Page Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Common Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;