import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';
import { productsAPI } from '../services/api';
import toast from 'react-hot-toast';

const AddProduct = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.price || !formData.description) {
            toast.error('لطفاً تمام فیلدها را پر کنید');
            return;
        }

        if (isNaN(formData.price) || formData.price <= 0) {
            toast.error('لطفاً قیمت معتبر وارد کنید');
            return;
        }

        setLoading(true);
        
        try {
            const productData = {
                ...formData,
                price: parseInt(formData.price),
                image: 'default.jpg'
            };
            
            await productsAPI.create(productData);
            toast.success('محصول با موفقیت اضافه شد!');
            
            // Reset form
            setFormData({ name: '', price: '', description: '' });
            
            // Redirect to products page
            window.location.href = '/';
        } catch (error) {
            console.error('Error adding product:', error);
            const message = error.response?.data?.message || 'خطا در افزودن محصول';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="container-main text-center">
                <i className="fas fa-user-lock fa-3x mb-3 text-white-50"></i>
                <h4 className="text-white">دسترسی محدود</h4>
                <p className="text-white-50">فقط مدیران می‌توانند محصول اضافه کنند</p>
            </div>
        );
    }

    return (
        <div className="container-main">
            <div className="admin-panel">
                <div className="d-flex align-items-center mb-4">
                    <motion.button 
                        className="btn btn-secondary me-3"
                        onClick={() => window.location.href = '/'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft size={16} className="me-2" />
                        بازگشت
                    </motion.button>
                    <h3 className="mb-0">
                        <Plus size={24} className="me-2" />
                        افزودن محصول جدید
                    </h3>
                </div>
                
                <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">نام محصول</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">قیمت (تومان)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                min="0"
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">توضیحات محصول</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="col-12 text-center">
                            <motion.button 
                                type="submit" 
                                className="btn btn-success btn-lg"
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? (
                                    <>
                                        <div className="loading me-2"></div>
                                        در حال افزودن...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} className="me-2" />
                                        افزودن محصول
                                    </>
                                )}
                            </motion.button>
                            <motion.button 
                                type="button" 
                                className="btn btn-secondary btn-lg ms-3"
                                onClick={() => window.location.href = '/'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                انصراف
                            </motion.button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default AddProduct; 