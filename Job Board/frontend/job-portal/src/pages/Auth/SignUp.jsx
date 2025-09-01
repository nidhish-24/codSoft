import React, { useState } from 'react';
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Upload,
    Eye,
    EyeOff,
    UserCheck,
    Building2,
    CheckCircle,
    AlertCircle,
    Loader,
} from "lucide-react";
import { validateAvatar, validateEmail, validatePassword } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadingImage';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "",
        avatar: null,
    });

    const [formState, setFormState] = useState({
        loading: false,
        errors: {},
        showPassword: false,
        avatarPreview: null,
        success: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (formState.errors[name]) {
            setFormState(prev => ({ ...prev, errors: { ...prev.errors, [name]: '' } }));
        }
    };

    const handleRoleChange = (role) => {
        setFormData(prev => ({ ...prev, role }));
        if (formState.errors.role) {
            setFormState(prev => ({ ...prev, errors: { ...prev.errors, role: '' } }));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateAvatar(file);
            if (error) {
                setFormState(prev => ({ ...prev, errors: { ...prev.errors, avatar: error } }));
                return;
            }
            setFormData(prev => ({ ...prev, avatar: file }));
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormState(prev => ({ ...prev, avatarPreview: e.target.result, errors: { ...prev.errors, avatar: '' } }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const errors = {
            fullName: !formData.fullName ? "Please enter your name" : "",
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            role: !formData.role ? "Select a role" : "",
            avatar: "",
        };
        Object.keys(errors).forEach(key => { if (!errors[key]) delete errors[key]; });
        setFormState(prev => ({ ...prev, errors }));
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormState(prev => ({ ...prev, loading: true }));

        try {
            let avatarUrl = "";
            if (formData.avatar) {
                const imgUploadRes = await uploadImage(formData.avatar);
                avatarUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                avatar: avatarUrl || "",
            });

            setFormState(prev => ({ ...prev, loading: false, success: true, errors: {} }));

            const { token } = response.data;
            if (token) {
                login(response.data, token);
                setTimeout(() => {
                    window.location.href = formData.role === "employer" ? "/employer-dashboard" : "/find-jobs";
                }, 2000);
            }
        } catch (error) {
            setFormState(prev => ({
                ...prev,
                loading: false,
                errors: { submit: error.response?.data?.message || "Registration failed." },
            }));
        }
    };

    if (formState.success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center"
                >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                    <p className="text-gray-300 mb-4">Welcome! Redirecting to your dashboard...</p>
                    <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto"></div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
                    <p className="text-gray-400 text-sm">Join thousands of professionals finding their dream jobs</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.fullName ? "border-red-500" : "border-gray-600"} bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                            />
                        </div>
                        {formState.errors.fullName && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" /> {formState.errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.email ? "border-red-500" : "border-gray-600"} bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                            />
                        </div>
                        {formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" /> {formState.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={formState.showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a strong password"
                                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${formState.errors.password ? "border-red-500" : "border-gray-600"} bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                            />
                            <button
                                type="button"
                                onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                {formState.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {formState.errors.password && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" /> {formState.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">I am a</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => handleRoleChange("jobseeker")}
                                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "jobseeker" ? "border-cyan-500 bg-cyan-900 text-white" : "border-gray-700 hover:border-gray-500"}`}
                            >
                                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                                <div className="font-medium">Job Seeker</div>
                                <div className="text-xs text-gray-400">Looking for Opportunities</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRoleChange("employer")}
                                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "employer" ? "border-cyan-500 bg-cyan-900 text-white" : "border-gray-700 hover:border-gray-500"}`}
                            >
                                <Building2 className="w-8 h-8 mx-auto mb-2" />
                                <div className="font-medium">Employer</div>
                                <div className="text-xs text-gray-400">Hiring Talent</div>
                            </button>
                        </div>
                        {formState.errors.role && (
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" /> {formState.errors.role}
                            </p>
                        )}
                    </div>

                    {/* Submit Error */}
                    {formState.errors.submit && (
                        <div className="bg-red-900/30 border border-red-600 rounded-lg p-3">
                            <p className="text-red-400 text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" /> {formState.errors.submit}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={formState.loading}
                        className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {formState.loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign in here</a>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default SignUp;
