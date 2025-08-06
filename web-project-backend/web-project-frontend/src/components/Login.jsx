import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.username || !formData.password) {
            toast.error('لطفاً تمام فیلدها را پر کنید');
            return;
        }

        setLoading(true);
        
        try {
            const response = await authAPI.login(formData);
            const { user, token } = response.data;
            
            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Update app state
            onLogin(user);
            
            toast.success('با موفقیت وارد شدید!');
            
            // Navigate to home page using React Router
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'خطا در ورود به سیستم';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <motion.h3 
                className="text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <LogIn size={24} className="me-2" />
                ورود به حساب کاربری
            </motion.h3>
            
            <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="mb-3">
                    <label className="form-label">نام کاربری</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">رمز عبور</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <motion.button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </motion.button>
                    </div>
                </div>
                
                <motion.button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? (
                        <>
                            <div className="loading me-2"></div>
                            در حال ورود...
                        </>
                    ) : (
                        <>
                            <LogIn size={16} className="me-2" />
                            ورود
                        </>
                    )}
                </motion.button>
                
                <div className="text-center">
                    <span>حساب کاربری ندارید؟ </span>
                    <motion.a 
                        href="#" 
                        onClick={() => window.location.href = '/register'}
                        className="text-primary"
                        whileHover={{ scale: 1.05 }}
                    >
                        ثبت نام کنید
                    </motion.a>
                </div>
            </motion.form>
        </div>
    );
};

export default Login; 