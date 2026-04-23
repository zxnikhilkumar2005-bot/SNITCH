import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth.js';
import { useNavigate } from 'react-router';
import GoogleAuthButton from '../components/GoogleAuthButton';

const Register = ({ toggleView }) => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        password: '',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Validation for contact number: only digits
        if (name === 'contactNumber') {
            const onlyDigits = value.replace(/\D/g, '');
            if (onlyDigits.length <= 15) { // Assuming max 15 digits for international numbers
                setFormData(prev => ({ ...prev, [name]: onlyDigits }));
            }
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.contactNumber && formData.contactNumber.length < 10) {
            setError('Please enter a valid contact number (at least 10 digits).');
            return;
        }

        await handleRegister({
            email: formData.email,
            contact: formData.contactNumber,
            password: formData.password,
            fullname: formData.fullName,
            isSeller: false // Default to false as requested
        });
        navigate('/');
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create an account</h1>
                <p className="text-gray-500 text-sm">Start your 30-day free trial.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-200">{error}</div>}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 1234567890"
                        required
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a password"
                            required
                            className="w-full px-4 py-2.5 pr-12 bg-white border border-gray-200 rounded-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
                </div>

                <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-black hover:bg-gray-800 text-white font-medium rounded-[14px] shadow-lg shadow-black/10 transition-all active:scale-[0.98]"
                >
                    Create account
                </button>

                <div className="mt-6 flex items-center justify-between">
                    <span className="border-b border-gray-200 w-1/4"></span>
                    <span className="text-xs text-center text-gray-500 uppercase">Or</span>
                    <span className="border-b border-gray-200 w-1/4"></span>
                </div>

                <div className="mt-6">
                    <GoogleAuthButton actionText="Sign up with Google" />
                </div>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{' '}
                    <button type="button" onClick={toggleView} className="text-black font-semibold hover:underline">
                        Log in
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;