import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import { authAPI } from './services/api';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('currentUser');
            
            if (token && storedUser) {
                // Set user from localStorage immediately
                setCurrentUser(JSON.parse(storedUser));
                
                // Verify token with backend
                try {
                    const response = await authAPI.getCurrentUser();
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error('Token verification failed:', error);
                    // Clear invalid token
                    localStorage.removeItem('token');
                    localStorage.removeItem('currentUser');
                    setCurrentUser(null);
                }
            }
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (user) => {
        console.log('Login successful:', user);
        setCurrentUser(user);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        setCurrentUser(null);
        setCart({});
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };

    const handleAddToCart = (productId) => {
        console.log('Adding to cart:', productId, 'User:', currentUser);
        setCart(prevCart => ({
            ...prevCart,
            [productId]: (prevCart[productId] || 0) + 1
        }));
    };

    const handleUpdateCart = () => {
        // This will be called when cart is updated from the Cart component
        // We could reload cart data here if needed
    };

    const handleViewDetails = (productId) => {
        // This function is now handled in ProductCard component
        console.log('View product details:', productId);
    };

    const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="loading"></div>
            </div>
        );
    }

    return (
        <Router>
            <div className="App">
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '15px',
                        },
                    }}
                />
                
                <Header 
                    currentUser={currentUser}
                    cartCount={cartCount}
                    onLogout={handleLogout}
                />
                
                <div className="container mt-4">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <Home 
                                    currentUser={currentUser}
                                    cart={cart}
                                    onAddToCart={handleAddToCart}
                                    onViewDetails={handleViewDetails}
                                />
                            } 
                        />
                        <Route 
                            path="/cart" 
                            element={
                                <Cart 
                                    currentUser={currentUser}
                                    cart={cart}
                                    onUpdateCart={handleUpdateCart}
                                />
                            } 
                        />
                        <Route 
                            path="/login" 
                            element={
                                currentUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={
                                currentUser ? <Navigate to="/" /> : <Register onLogin={handleLogin} />
                            } 
                        />
                        <Route 
                            path="/add-product" 
                            element={
                                <AddProduct currentUser={currentUser} />
                            } 
                        />
                        <Route 
                            path="/product/:id" 
                            element={
                                <ProductDetails 
                                    currentUser={currentUser}
                                    onAddToCart={handleAddToCart}
                                />
                            } 
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App; 