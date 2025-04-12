const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/auth');

/**
 * Admin Dashboard
 * Only accessible to users with Admin role
 * Returns admin-specific data for the dashboard
 */
router.get('/admin/dashboard', 
    verifyToken, 
    checkRole(['Admin']), 
    (req, res) => {
        res.json({ 
            success: true,
            message: 'Admin Dashboard Data', 
            data: {
                userRole: req.user.role,
                userId: req.user.userId,
                dashboardType: 'admin',
                features: [
                    'User Management',
                    'Service Management',
                    'Reports',
                    'System Settings'
                ],
                redirect: '/admin'
            }
        });
    }
);

/**
 * Service Provider Dashboard
 * Only accessible to users with ServiceProvider role
 * Returns service provider specific data for the dashboard
 */
router.get('/service/dashboard', 
    verifyToken, 
    checkRole(['ServiceProvider']), 
    (req, res) => {
        res.json({ 
            success: true,
            message: 'Service Provider Dashboard Data', 
            data: {
                userRole: req.user.role,
                userId: req.user.userId,
                dashboardType: 'service_provider',
                features: [
                    'Appointment Management',
                    'Service Offerings',
                    'Customer Management',
                    'Earnings'
                ],
                redirect: '/service-provider'
            }
        });
    }
);

/**
 * Customer Dashboard
 * Only accessible to users with Customer role
 * Returns customer specific data for the dashboard
 */
router.get('/customer/dashboard', 
    verifyToken, 
    checkRole(['Customer']), 
    (req, res) => {
        res.json({ 
            success: true,
            message: 'Customer Dashboard Data', 
            data: {
                userRole: req.user.role,
                userId: req.user.userId,
                dashboardType: 'customer',
                features: [
                    'Book Services',
                    'View Appointments',
                    'Payment History',
                    'Profile Settings'
                ],
                redirect: '/customer'
            }
        });
    }
);

/**
 * User Profile
 * Accessible to all authenticated users
 * Returns user-specific profile data
 */
router.get('/profile', 
    verifyToken, 
    (req, res) => {
        res.json({ 
            success: true,
            message: 'User Profile Data',
            data: {
                userId: req.user.userId,
                role: req.user.role
            }
        });
    }
);

/**
 * Dashboard Redirect
 * Helper endpoint that returns the correct redirect URL based on user role
 * Frontend can call this to determine where to redirect after login
 */
router.get('/redirect', 
    verifyToken, 
    (req, res) => {
        let redirectUrl = '/';
        
        switch(req.user.role) {
            case 'Admin':
                redirectUrl = '/admin';
                break;
            case 'ServiceProvider':
                redirectUrl = '/service-provider';
                break;
            case 'Customer':
                redirectUrl = '/customer';
                break;
        }
        
        res.json({
            success: true,
            redirectUrl
        });
    }
);

module.exports = router; 