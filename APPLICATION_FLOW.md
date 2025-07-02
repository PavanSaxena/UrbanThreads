# 🔄 Application Flow – UrbanThreads

## 👥 User Flow
1. **Homepage**: User visits UrbanThreads with light/dark theme toggle
2. **Browse Products**: Views product catalog with filtering options
3. **Product Details**: Selects products with size and color variants
4. **Cart Management**: Adds/removes items using CartSidebar
5. **Authentication**: Registers/logs in with JWT-based auth
6. **Checkout Process**: Fills shipping details and payment method
7. **Order Confirmation**: Receives order confirmation and receipt
8. **Order Tracking**: Views order history and status

## 👨‍💻 Admin Flow
1. **Admin Login**: Authenticates with admin role
2. **Product Management**: CRUD operations on products
3. **Order Management**: Views and updates order status
4. **Dashboard Analytics**: Monitors sales and inventory

## � Complete API Flow

### Authentication APIs
- `POST /api/auth/register` → User registration with validation
- `POST /api/auth/login` → User login with JWT token
- `GET /api/auth/profile` → Get user profile (protected)
- `PUT /api/auth/profile` → Update user profile (protected)

### Product APIs
- `GET /api/products` → Get all products with filters
- `GET /api/products/:productId` → Get specific product
- `POST /api/products` → Create new product (admin)
- `PUT /api/products/:productId` → Update product (admin)
- `DELETE /api/products/:productId` → Delete product (admin)

### Order APIs
- `POST /api/orders` → Create new order (protected)
- `GET /api/orders/my-orders` → Get user's orders (protected)
- `GET /api/orders/:id` → Get specific order (protected)
- `PUT /api/orders/:id/pay` → Update payment status (protected)

## 🎯 State Management Flow
1. **AuthContext**: Manages user authentication state
2. **CartContext**: Handles cart items and calculations
3. **ThemeContext**: Controls light/dark mode preferences