import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth.js';
import { useNavigate } from 'react-router';
import GoogleAuthButton from '../components/GoogleAuthButton';
const Register = ({ toggleView }) => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        password: '',
        isSeller: false,
    });
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({
            email: formData.email,
            contact: formData.contactNumber,
            password: formData.password,
            fullname: formData.fullName,
            isSeller: formData.isSeller
        });
        navigate('/')
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-[500px]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-white mb-2 tracking-tight">Register</h1>
                <p className="text-white/80 text-sm">Create an account to join us</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 hover:bg-black/30 transition-all font-medium"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            required
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 hover:bg-black/30 transition-all font-medium"
                        />
                    </div>
                    {/* Contact Number */}
                    <div>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            placeholder="Contact Number"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 hover:bg-black/30 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 pr-12 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 hover:bg-black/30 transition-all font-medium"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 rounded transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Register as Seller */}
                <div className={`mt-4 p-4 rounded-xl border transition-all duration-300 ${formData.isSeller ? 'bg-[#a3e635]/10 border-[#a3e635]/50' : 'bg-black/10 border-white/10'}`}>
                    <label className="flex items-center space-x-3 cursor-pointer group w-max">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="checkbox" 
                                name="isSeller"
                                checked={formData.isSeller}
                                onChange={handleInputChange}
                                className="peer sr-only" 
                            />
                            <div className="w-5 h-5 border border-white/40 rounded bg-white/5 peer-checked:bg-[#a3e635] peer-checked:border-[#a3e635] transition-colors shadow-sm"></div>
                            <svg className="absolute w-3.5 h-3.5 text-[#064e3b] opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className={`font-medium transition-colors ${formData.isSeller ? 'text-[#d9f99d]' : 'text-white/80 group-hover:text-white'}`}>
                            Register as seller
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-3.5 mt-4 bg-gradient-to-r from-emerald-500 to-[#a3e635] hover:from-emerald-400 hover:to-[#bef264] text-[#064e3b] font-bold tracking-wide rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.5)] transform transition-all active:scale-[0.98]"
                >
                    Create Account
                </button>

                <div className="mt-6 flex items-center justify-between">
                    <span className="border-b border-white/20 w-1/4"></span>
                    <span className="text-xs text-center text-white/50 uppercase">Or</span>
                    <span className="border-b border-white/20 w-1/4"></span>
                </div>

                <div className="mt-6">
                    <GoogleAuthButton actionText="Continue with Google" />
                </div>

                <p className="text-center text-white/80 text-sm mt-6">
                    Already have an account?{' '}
                    <button type="button" onClick={toggleView} className="text-[#d9f99d] hover:text-[#bef264] font-semibold transition-colors">
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;