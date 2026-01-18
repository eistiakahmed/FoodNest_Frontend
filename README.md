# FoodNest - Food Delivery Platform

A modern, full-stack food delivery platform built with Next.js 16 and Express.js, featuring authentication, CRUD operations, and a responsive design.

## 🚀 Project Description

FoodNest is a comprehensive food delivery application that allows users to browse food items, view detailed information, and manage restaurant menus. The platform includes user authentication, protected routes, and a complete admin dashboard for food management.

## ✨ Features

### Core Features
- **Landing Page**: 7 comprehensive sections showcasing the platform
- **Authentication System**: Mock login with hardcoded credentials stored in cookies
- **Item List Page**: Publicly accessible food browsing with advanced filtering
- **Item Details Page**: Detailed view of individual food items
- **Protected Admin Area**: Secure admin dashboard and food management
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Mobile-first approach with professional UI/UX

### Advanced Features
- **Route Protection**: Automatic redirection for unauthenticated users
- **Cookie-based Sessions**: Secure session management
- **Advanced Filtering**: Category, cuisine, price range, dietary preferences
- **Professional Animations**: Framer Motion integration
- **Modern Design**: Ubuntu font, gradient themes, React Icons

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Framer Motion** - Animation library
- **React Hot Toast** - Notification system
- **js-cookie** - Cookie management
- **React Icons** - Icon library

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

### Frontend Setup
```bash
# Navigate to frontend directory
cd foodnest_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd foodnest_backend

# Install dependencies
npm install

# Create .env file with your MongoDB URI
echo "URI=your_mongodb_connection_string" > .env

# Start the server
npm start
```

## 🗺️ Route Summary

### Public Routes
- `/` - Landing page with 7 sections
- `/foods` - Item list page (Items/Lists)
- `/foods/[id]` - Item details page
- `/about` - About page
- `/contact` - Contact page
- `/partner` - Partner registration
- `/login` - Authentication page
- `/signup` - User registration

### Protected Routes (Authentication Required)
- `/admin` - Admin dashboard
- `/admin/add-food` - Add new food items

### API Endpoints
- `GET /foods` - Fetch all food items with filtering
- `GET /foods/:id` - Fetch single food item
- `POST /add_foods` - Create new food item
- `PUT /foods/:id` - Update food item
- `DELETE /foods/:id` - Delete food item

## 🔐 Authentication

### Demo Credentials
- **Email**: `admin@foodnest.com`
- **Password**: `admin123`

### Authentication Flow
1. User enters credentials on login page
2. System validates against hardcoded credentials
3. On success, user data is stored in cookies
4. Protected routes check authentication status
5. Unauthenticated users are redirected to login

## 🎯 Implemented Requirements

### ✅ Completed Requirements

1. **Landing Page**
   - ✅ 7 relevant sections (Popular Categories, How It Works, Growing Community, Why Choose Us, Customer Testimonials, Call to Action, Banner)
   - ✅ Professional design with animations
   - ✅ Responsive layout

2. **Authentication**
   - ✅ Mock login with hardcoded credentials
   - ✅ Cookie-based session storage
   - ✅ Route protection for unauthenticated users
   - ✅ Automatic redirect after login

3. **Item List Page**
   - ✅ Publicly accessible
   - ✅ Fetches data from Express API
   - ✅ Professional card design
   - ✅ Advanced filtering and search
   - ✅ Responsive grid layout

4. **Item Details Page**
   - ✅ Full product details display
   - ✅ Image gallery
   - ✅ Nutritional information
   - ✅ Publicly accessible

5. **Protected Add Item Page**
   - ✅ Authentication required
   - ✅ Comprehensive form with validation
   - ✅ Stores data via Express.js API
   - ✅ Automatic redirect for unauthenticated users
   - ✅ Toast notifications on success

6. **Additional Enhancements**
   - ✅ Toast notifications throughout the app
   - ✅ Professional UI/UX design
   - ✅ Mobile-responsive layout
   - ✅ Error handling and validation

### Navigation Features
- ✅ Navbar includes Login link
- ✅ Navbar includes Items/Lists page link
- ✅ User authentication status display
- ✅ Logout functionality

## 🚀 Getting Started

1. **Clone the repository**
2. **Set up the backend** (MongoDB connection, install dependencies)
3. **Set up the frontend** (install dependencies)
4. **Start both servers**
5. **Visit** `http://localhost:3000`
6. **Login** with demo credentials to access protected features

## 📱 Usage

### For Regular Users
1. Browse food items on the Items/Lists page
2. View detailed information for any food item
3. Use filters to find specific types of food
4. No authentication required for browsing

### For Administrators
1. Login with provided credentials
2. Access the admin dashboard
3. Add new food items to the menu
4. Manage existing food items
5. View analytics and statistics

## 🔧 Development

### Project Structure
```
foodnest_frontend/
├── src/
│   ├── app/
│   │   ├── (pubilc)/          # Public routes
│   │   │   ├── foods/         # Food listing and details
│   │   │   ├── admin/         # Protected admin area
│   │   │   ├── login/         # Authentication
│   │   │   └── ...
│   │   ├── globals.css        # Global styles
│   │   └── layout.js          # Root layout
│   ├── components/            # Reusable components
│   └── lib/                   # Utilities and auth logic

foodnest_backend/
├── index.js                   # Express server
├── package.json              # Dependencies
└── .env                      # Environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**FoodNest** - Delivering delicious experiences, one meal at a time! 🍽️
