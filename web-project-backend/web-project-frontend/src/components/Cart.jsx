import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { cartAPI } from '../services/api';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const Cart = ({ currentUser, cart, onUpdateCart }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            loadCart();
        }
    }, [currentUser]);

    const loadCart = async () => {
        try {
            setLoading(true);
            const response = await cartAPI.getCart();
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error('Error loading cart:', error);
            toast.error('خطا در بارگذاری سبد خرید');
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            if (newQuantity <= 0) {
                await cartAPI.removeFromCart(productId);
            } else {
                await cartAPI.updateQuantity(productId, newQuantity);
            }
            await loadCart();
            onUpdateCart();
            toast.success('سبد خرید به‌روزرسانی شد');
        } catch (error) {
            console.error('Error updating cart:', error);
            toast.error('خطا در به‌روزرسانی سبد خرید');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await cartAPI.removeFromCart(productId);
            await loadCart();
            onUpdateCart();
            toast.success('محصول از سبد خرید حذف شد');
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('خطا در حذف محصول');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <div className="container-main text-center">
                <div className="loading"></div>
                <p className="text-white mt-3">در حال بارگذاری سبد خرید...</p>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="container-main text-center">
                <i className="fas fa-user-lock fa-3x mb-3 text-white-50"></i>
                <h4 className="text-white">برای مشاهده سبد خرید ابتدا وارد شوید</h4>
                <p className="text-white-50">لطفاً وارد حساب کاربری خود شوید</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container-main">
                <h2 className="text-white mb-4">
                    <ShoppingCart size={24} className="me-2" />
                    سبد خرید
                </h2>
                <div className="text-center text-white">
                    <i className="fas fa-shopping-cart fa-3x mb-3 opacity-50"></i>
                    <h4>سبد خرید شما خالی است</h4>
                    <p>محصولی برای نمایش وجود ندارد</p>
                    <motion.button 
                        className="btn btn-primary btn-lg mt-3"
                        onClick={() => window.location.href = '/'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <i className="fas fa-arrow-right me-2"></i>ادامه خرید
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-main">
            <h2 className="text-white mb-4">
                <ShoppingCart size={24} className="me-2" />
                سبد خرید
            </h2>
            
            {cartItems.map((item) => (
                <motion.div 
                    key={item.productId} 
                    className="card mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <div className="product-image" style={{ height: '80px', fontSize: '2rem' }}>
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="mb-1">{item.name}</h6>
                                <small className="text-muted">{formatPrice(item.price)} تومان</small>
                            </div>
                            <div className="col-md-3">
                                <div className="quantity-control">
                                    <motion.button 
                                        className="quantity-btn" 
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Minus size={16} />
                                    </motion.button>
                                    <span className="mx-2 fw-bold">{item.quantity}</span>
                                    <motion.button 
                                        className="quantity-btn" 
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Plus size={16} />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="price">{formatPrice(item.price * item.quantity)} تومان</div>
                            </div>
                            <div className="col-md-1">
                                <motion.button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => removeFromCart(item.productId)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Trash2 size={16} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
            
            <motion.div 
                className="card bg-primary text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h5 className="mb-0">مجموع کل:</h5>
                        </div>
                        <div className="col-md-4 text-end">
                            <h4 className="mb-0">{formatPrice(calculateTotal())} تومان</h4>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <div className="text-center mt-4">
                <motion.button 
                    className="btn btn-primary btn-lg me-3"
                    onClick={() => window.location.href = '/'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="fas fa-arrow-right me-2"></i>ادامه خرید
                </motion.button>
                <motion.button 
                    className="btn btn-success btn-lg"
                    onClick={() => toast.success('سفارش شما با موفقیت ثبت شد!')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="fas fa-check me-2"></i>تکمیل خرید
                </motion.button>
            </div>
        </div>
    );
};

export default Cart; 