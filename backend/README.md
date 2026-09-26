# Antivirus Digital E-Commerce Backend & License Key Engine

Production-ready backend built with **Node.js, Express, TypeScript, and MongoDB (Mongoose)** for digital antivirus software licenses delivery and admin management.

---

## 🚀 Key Features

1. **Digital License Key Vault**:
   - Stores batches of unique software activation keys mapped to specific product variants (e.g. `1 PC / 1 Year`, `3 PCs / 2 Years`).
   - Atomic FIFO key reservation and allocation upon successful checkout (`findOneAndUpdate` prevents double-allocation).
   - Real-time stock calculation based on `AVAILABLE` keys count.
2. **Admin-Only Catalog Management**:
   - All products, categories, variants, MRP/selling prices, download URLs, and promotional coupons are managed strictly by Admin.
   - Bulk upload license keys (line-by-line / CSV / comma-separated).
3. **Admin Authentication (.env Based - No Signup)**:
   - Credentials configured in `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_ID`).
   - Strict `requireAdmin` JWT middleware.
4. **Customer Storefront Authentication (Email Only)**:
   - Strictly Email + Password. No phone number login.
   - Customer profile with permanent access to purchased license keys & order history.

---

## 🛠️ Environment Variables (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/antivirus_ecommerce

# Admin Credentials (strictly .env based)
ADMIN_EMAIL=admin@antivirus.com
ADMIN_PASSWORD=Admin@Security2026!
ADMIN_ID=admin_master_01

# JWT Secrets
JWT_SECRET=super_secret_jwt_customer_key_2026_antivirus
JWT_ADMIN_SECRET=super_secret_jwt_admin_master_key_2026_antivirus
JWT_EXPIRES_IN=7d

# CORS Allowed Origins
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Initial Products & License Key Stock
```bash
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

---

## 📡 API Endpoints

### Public / Customer Storefront (`/api/...`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Get products with search, multi-filters (brand, category, OS, price) |
| `GET` | `/api/products/:slug` | Get product details with live stock availability |
| `GET` | `/api/products/deals/top` | Get Hot Deals & Best Sellers |
| `POST` | `/api/coupons/validate` | Validate promo code and calculate savings |
| `POST` | `/api/orders/checkout` | Process order and atomically allocate license keys |
| `GET` | `/api/orders/:id` | Get order details & revealed license keys |
| `POST` | `/api/auth/register` | Register customer account (Email + Password) |
| `POST` | `/api/auth/login` | Login customer (Email + Password) |
| `GET` | `/api/auth/me` | Fetch customer profile and purchased keys history |

### Admin Suite (`/api/admin/...`) [Requires Admin Bearer Token]
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/auth/login` | Login using `.env` credentials -> Returns Admin JWT |
| `GET` | `/api/admin/auth/me` | Verify Admin session |
| `GET` | `/api/admin/dashboard/stats` | Analytics, total revenue, key stock, low-stock alerts |
| `GET` | `/api/admin/products` | List all products with variant stock counts |
| `POST` | `/api/admin/products` | Create new antivirus product & variants |
| `PUT` | `/api/admin/products/:id` | Update product details & prices |
| `DELETE` | `/api/admin/products/:id` | Delete product & unused keys |
| `GET` | `/api/admin/keys` | List license keys with filters and pagination |
| `GET` | `/api/admin/keys/stats` | Stock levels per variant & low-stock alerts |
| `POST` | `/api/admin/keys/bulk` | Bulk import license keys into vault |
| `DELETE` | `/api/admin/keys/:id` | Delete available license key |
| `GET` | `/api/admin/orders` | View all customer orders & allocated keys |
| `GET` | `/api/admin/orders/:id` | View specific order details |
| `GET` | `/api/admin/coupons` | List promo discount coupons |
| `POST` | `/api/admin/coupons` | Create new coupon |
| `PUT` | `/api/admin/coupons/:id` | Update coupon |
| `DELETE` | `/api/admin/coupons/:id` | Delete coupon |
| `GET` | `/api/admin/customers` | Customer lifetime spend and order metrics |
