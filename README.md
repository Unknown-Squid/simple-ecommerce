# Simple E-commerce

A full-stack e-commerce application built with Next.js (frontend) and Node.js/Express with Sequelize (backend).

## Project Structure

### Frontend (`ecommerce-frontend`)

The frontend is built with **Next.js 16** using the App Router pattern. The component structure is organized by type for better scalability and maintainability.

#### Component Organization

Components are organized into folders by their type/functionality. While it's not strictly necessary to separate each component type into different folders, this structure was chosen to support scalability as the project grows:

```
app/
├── components/
│   ├── Buttons/
│   │   └── PrimaryButton.js      # Reusable button component with variants
│   ├── Cards/
│   │   └── ProductCard.js        # Card component for displaying products
│   ├── Fields/
│   │   └── InputField.js         # Form input field with validation
│   ├── Modals/
│   │   └── Modal.js              # Modal/dialog component
│   └── Tabs/
│       └── Tabs.js               # Tab navigation component
├── (pages)/
│   ├── (public)/
│   │   └── login/
│   │       └── page.js           # Public login page
│   └── (restricted)/
│       └── dashboard/
│           └── page.js           # Protected dashboard page
├── page.js                        # Landing page
└── layout.js                      # Root layout
```

#### Why This Structure?

**Scalability Benefits:**
- **Easy to Find Components**: When you need a button, you know exactly where to look (`components/Buttons/`)
- **Prevents Folder Clutter**: As components grow, having them all in one folder becomes unmanageable
- **Clear Separation of Concerns**: Each component type has its own space
- **Team Collaboration**: Multiple developers can work on different component types without conflicts
- **Future Expansion**: Easy to add new component types (e.g., `Dropdowns/`, `Charts/`, `Tables/`)

**Import Pattern:**
All components use absolute imports with the `@/app/` prefix:
```javascript
import PrimaryButton from '@/app/components/Buttons/PrimaryButton';
import ProductCard from '@/app/components/Cards/ProductCard';
```

This makes imports consistent and easy to refactor if folder structure changes.

#### API Client & Hooks

The API client and hooks are separated for better organization. The `apiClient` folder is responsible for **processing API requests**, while the `hooks` folder handles **data processing and state management**:

```
app/
├── apiClient/
│   ├── Auth/
│   │   └── authAPI.js         # Authentication API requests
│   ├── Product/
│   │   └── productAPI.js      # Product API requests
│   ├── Order/
│   │   └── orderAPI.js        # Order API requests
│   ├── Payment/
│   │   └── paymentAPI.js     # Payment API requests
│   ├── config.js              # API configuration and base request function
│   └── index.js               # Main API client entry point
└── hooks/
    ├── useAuth.js             # Authentication data processing hooks
    ├── useProducts.js         # Product data processing hooks
    ├── useOrders.js           # Order data processing hooks
    ├── usePayment.js          # Payment data processing hooks
    └── index.js               # Hooks barrel export
```

**API Client (Processing API Requests):**
The `apiClient` folder is organized by domain (Auth, Product, Order, Payment) and handles all HTTP requests to the backend:

- **Domain Organization**: Each domain has its own folder for better scalability
- **Centralized Configuration**: Base URL, authentication token management in `config.js`
- **Automatic Token Handling**: Automatically adds JWT tokens to requests
- **Error Handling**: Consistent error handling across all API calls
- **Structured Responses**: Standardized response format

**Example API Usage:**
```javascript
import { authAPI, productAPI } from '@/app/apiClient';

// Direct API calls
await authAPI.login(email, password);
await productAPI.getAll({ category: 'handicraft' });
```

**Custom Hooks (Processing Data):**
Hooks are located in the `hooks` folder and provide a clean interface for **data processing and state management**. They wrap API calls with React state management:

```javascript
import { useAuth, useProducts, useOrders, usePayment } from '@/app/hooks';

// Authentication - handles login state, errors, loading
const { login, logout, loading, error } = useAuth();

// Products - automatically fetches and manages product data
const { products, loading, error, refetch } = useProducts();
const { product, loading } = useProduct(productId);
const { createProduct, updateProduct } = useProductMutation();

// Orders - manages order data and state
const { orders, loading, refetch } = useOrders();
const { createOrder } = useOrderMutation();

// Payments - handles payment processing
const { createPayment, loading } = usePayment();
```

**Benefits of This Separation:**
- **Clear Responsibilities**: API client handles requests, hooks handle data processing
- **Reusable Logic**: Share data fetching and processing logic across components
- **Automatic State Management**: Loading, error, and data states handled automatically
- **Easy Refetching**: Built-in refetch capabilities
- **Separation of Concerns**: API request logic separated from data processing logic
- **Domain Organization**: Easy to find and maintain API functions by domain

#### Pages Organization

Pages are organized into `(public)` and `(restricted)` folders within the `(pages)` route group. This structure provides clear separation between pages that require authentication and those that don't:

```
app/
├── (pages)/
│   ├── (public)/
│   │   └── login/
│   │       └── page.js           # Public pages - no authentication required
│   └── (restricted)/
│       └── dashboard/
│           └── page.js           # Protected pages - authentication required
└── page.js                        # Landing page (public)
```

**Why This Organization?**

**Separation of Concerns:**
- **Clear Authentication Boundaries**: Immediately know which pages need auth protection
- **Easy Route Protection**: Can apply middleware/guards at the folder level
- **Better Code Organization**: Public and restricted pages are logically separated
- **Scalability**: As the app grows, you can easily add more public pages (about, contact, products listing) or restricted pages (settings, orders, profile)
- **Team Collaboration**: Frontend and backend teams can clearly see which routes need authentication

**Route Groups:**
The parentheses `()` in folder names are Next.js route groups - they organize files without affecting the URL structure. This means:
- `(pages)/(public)/login/page.js` → `/login` (not `/public/login`)
- `(pages)/(restricted)/dashboard/page.js` → `/dashboard` (not `/restricted/dashboard`)

**Pages:**
- **Landing Page** (`/`) - Public product showcase and promotion
- **Login Page** (`/login`) - Public authentication page
- **Dashboard** (`/dashboard`) - Protected user dashboard with tabs (Overview, Orders, Profile)

### Backend (`ecommerce-backend`)

The backend follows a **Model-Service-Controller (MSC)** architecture pattern with Sequelize ORM.

#### Architecture

```
src/
├── Account/
│   ├── Models/
│   │   └── User.js
│   ├── Services/
│   │   └── AccountService.js
│   ├── Controllers/
│   │   └── AccountController.js
│   └── Routes/
│       └── AccountRoutes.js
├── Store/
│   ├── Models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── OrderItem.js
│   ├── Services/
│   │   └── StoreService.js
│   ├── Controllers/
│   │   └── StoreController.js
│   └── Routes/
│       └── StoreRoutes.js
├── Payment/
│   ├── Models/
│   │   └── Payment.js
│   ├── Services/
│   │   └── PaymentService.js
│   ├── Controllers/
│   │   └── PaymentController.js
│   └── Routes/
│       └── PaymentRoutes.js
└── System/
    ├── ModelsRelationship/
    │   └── models.js              # Model associations and relationships
    ├── Middlewares/
    │   └── authMiddleware.js      # JWT authentication
    ├── Seeders/
    │   ├── seedTestAccounts.js    # Test account seeder
    │   ├── seedTestProducts.js    # Test product seeder
    │   ├── seedTestOrders.js      # Test order seeder
    │   └── seedAll.js             # Runs all seeders
    ├── Utils/
    └── Validators/
```

#### Database Models

- **User** - User accounts with authentication
- **Product** - Handicraft products
- **Order** - Customer orders
- **OrderItem** - Items within orders
- **Payment** - Payment transactions

All model relationships are defined in `src/System/ModelsRelationship/models.js` with proper cascade options for data integrity.

#### Database Seeders

Test data seeders are located in `src/System/Seeders/` for development and testing:

**Seeder Features:**
- **Idempotent**: Uses `findOrCreate` to avoid duplicates
- **Separate Files**: Each seeder handles one type of data
- **Dependencies**: Orders seeder depends on accounts and products
- **Test Data**: Includes realistic test accounts, products, and orders
- **Shared Process**: Located in System folder as it's a shared utility

## Getting Started

### Frontend Setup

```bash
cd ecommerce-frontend
npm install
npm run dev
```

### Backend Setup

1. Create a `.env` file in `ecommerce-backend/`:
```
DB_NAME=ecommerce_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
NODE_ENV=development
JWT_SECRET=your-secret-key-here
PORT=5000
```

2. Install dependencies and run:
```bash
cd ecommerce-backend
npm install
npm start
```

3. Seed test data (optional):
```bash
# Seed all test data (accounts, products, orders)
npm run seed

# Or seed individually:
npm run seed:accounts   # Seed test accounts
npm run seed:products   # Seed test products
npm run seed:orders     # Seed test orders
```

**Test Accounts:**
- Admin: `admin@test.com` / `admin123`
- Customer: `customer@test.com` / `customer123`
- Customer: `jane@test.com` / `jane123`

## Adding New Pages

### Frontend Pages

To add new pages consistently, follow the organization pattern:

**Public Pages** (No authentication required):
1. Create page in `app/(pages)/(public)/your-page-name/page.js`
2. Example: `app/(pages)/(public)/about/page.js` → `/about`

**Protected Pages** (Authentication required):
1. Create page in `app/(pages)/(restricted)/your-page-name/page.js`
2. Add authentication check in the page component
3. Example: `app/(pages)/(restricted)/settings/page.js` → `/settings`

**Page Template:**
```javascript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Import your components and hooks

export default function YourPage() {
  const router = useRouter();
  
  // For protected pages, add auth check:
  // useEffect(() => {
  //   const auth = localStorage.getItem('isAuthenticated');
  //   if (auth !== 'true') {
  //     router.push('/login');
  //   }
  // }, [router]);

  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

### Backend Routes

To add new backend routes consistently:

1. **Create Model** (if needed): `src/YourModule/Models/YourModel.js`
2. **Create Service**: `src/YourModule/Services/YourService.js`
3. **Create Controller**: `src/YourModule/Controllers/YourController.js`
4. **Create Routes**: `src/YourModule/Routes/YourRoutes.js`
5. **Register in server.js**: `app.use('/api/your-module', yourRoutes);`

**Route Template:**
```javascript
const express = require('express');
const router = express.Router();
const yourController = require('../Controllers/YourController');
const { authenticateToken } = require('../../System/Middlewares/authMiddleware');

// Public routes
router.get('/', yourController.getAll.bind(yourController));

// Protected routes
router.post('/', authenticateToken, yourController.create.bind(yourController));

module.exports = router;
```

## Deployment

### Current Setup

The project is ready for deployment with the following structure:

**Frontend:**
- Next.js application ready for Vercel, Netlify, or any Node.js hosting
- Environment variables: `NEXT_PUBLIC_API_URL` (backend API URL)

**Backend:**
- Express server ready for deployment
- Environment variables configured via `.env` file
- Database migrations handled via Sequelize sync

### Future Deployment Options

Once you start working on deployment, you can add:

**CI/CD Pipelines:**
- **GitHub Actions** / **GitLab CI** for continuous integration
- Automated testing and building
- Automatic deployment on push to main branch
- Example workflow:
  ```yaml
  # .github/workflows/deploy.yml
  - Run tests
  - Build frontend/backend
  - Deploy to staging/production
  ```

**Docker:**
- **Dockerfile** for consistent environments
- **docker-compose.yml** for local development with database
- Container orchestration for production
- Example structure:
  ```
  docker-compose.yml
  ├── Frontend service
  ├── Backend service
  └── Database service
  ```

**Deployment Platforms:**
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Railway, Render, AWS EC2, Heroku
- **Database**: AWS RDS, PlanetScale, Railway PostgreSQL

These deployment configurations can be added when you're ready to deploy the application.

## Tech Stack

**Frontend:**
- Next.js 16
- React 19
- Tailwind CSS 4

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
