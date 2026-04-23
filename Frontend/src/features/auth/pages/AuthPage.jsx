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
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-['Inter',sans-serif] text-black">
            {/* LEFT SIDE (FORM SECTION 40%) */}
            <div className="w-full md:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative">
                {/* Top-left label */}
                <div className="absolute top-8 left-8 sm:left-16 lg:left-24 font-semibold tracking-tight text-gray-900 flex items-center gap-2">
                    <span className="text-xl">///</span>
                    <span className="text-sm uppercase tracking-widest font-bold">Untitled UI</span>
                </div>

                <div className="w-full max-w-md mx-auto relative h-full flex flex-col justify-center">
                    <div 
                        className={`transition-all duration-500 ease-out transform ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                    >
                        {view === 'login' ? (
                            <Login toggleView={toggleView} />
                        ) : (
                            <Register toggleView={toggleView} />
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE (IMAGE SECTION 60%) */}
            <div className="hidden md:flex w-full md:w-[60%] p-4">
                <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2670&auto=format&fit=crop" 
                        alt="Aesthetic workspace or person outdoors" 
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Testimonial Card */}
                    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white max-w-xl">
                            <p className="text-xl font-medium leading-relaxed mb-6">
                                "This platform has completely transformed how our team manages onboarding. The clean interface and seamless experience are unmatched."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                                    <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Sarah Jenkins</h4>
                                    <p className="text-white/70 text-sm">Product Manager, TechFlow</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-3 mb-2">
                            <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
