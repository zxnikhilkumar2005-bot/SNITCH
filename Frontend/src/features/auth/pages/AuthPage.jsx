import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
    const [view, setView] = useState('login');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const toggleView = () => {
        setIsVisible(false);
        setTimeout(() => {
            setView(prev => prev === 'login' ? 'register' : 'login');
            setIsVisible(true);
        }, 300);
    };

    return (
        <div 
            className="min-h-screen w-full flex items-center justify-center p-4 relative font-['Inter',sans-serif]"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop')`, // Scenic mountains
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Soft gradient backdrop blur overlay for modern aesthetic */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a22]/80 to-transparent"></div>

            {/* Responsive container with custom scale/fade animation */}
            <div 
                className={`relative z-10 w-full ${
                    view === 'register' ? 'max-w-[540px]' : 'max-w-[440px]'
                } transition-all duration-500 ease-out transform ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                }`}
            >
                {view === 'login' ? (
                    <Login toggleView={toggleView} />
                ) : (
                    <Register toggleView={toggleView} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
