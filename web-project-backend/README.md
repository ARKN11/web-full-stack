# فروشگاه موبایل - Full Stack Project

این پروژه یک فروشگاه آنلاین موبایل است که شامل backend (Node.js + Express + MongoDB) و frontend (React) می‌باشد.

## ساختار پروژه

```
web-project-backend/     # Backend (Node.js + Express + MongoDB)
web-project-frontend/    # Frontend (React)
```

## ویژگی‌های پروژه

### Backend
- **Node.js + Express.js**: سرور API
- **MongoDB + Mongoose**: پایگاه داده
- **JWT Authentication**: احراز هویت کاربران
- **bcrypt**: رمزگذاری پسوردها
- **Static File Serving**: سرو فایل‌های تصویری
- **CORS Support**: پشتیبانی از درخواست‌های cross-origin

### Frontend
- **React 18**: کتابخانه اصلی
- **React Router DOM**: مسیریابی
- **Framer Motion**: انیمیشن‌ها
- **Axios**: درخواست‌های HTTP
- **React Hot Toast**: اعلان‌ها
- **Lucide React**: آیکون‌ها
- **Bootstrap 5**: استایل‌دهی
- **Font Awesome**: آیکون‌های اضافی

## نصب و راه‌اندازی

### 1. نصب Dependencies

#### Backend
```bash
cd web-project-backend
npm install
```

#### Frontend
```bash
cd web-project-frontend
npm install
```

### 2. تنظیم متغیرهای محیطی

در پوشه `web-project-backend` فایل `.env` ایجاد کنید:

```env
MONGODB_URI=mongodb://localhost:27017/mobile-shop
JWT_SECRET=your-secret-key
PORT=5000
```

### 3. راه‌اندازی پایگاه داده

```bash
cd web-project-backend
npm run seed
```

این دستور محصولات نمونه را در پایگاه داده قرار می‌دهد.

### 4. اجرای سرورها

#### Backend Server
```bash
cd web-project-backend
npm start
```
سرور backend روی پورت 5000 اجرا می‌شود.

#### Frontend Server
```bash
cd web-project-frontend
npm start
```
سرور frontend روی پورت 3000 اجرا می‌شود.

## تست اتصال

### 1. تست API Backend
```bash
# تست دریافت محصولات
curl http://localhost:5000/api/products

# تست دریافت تصاویر
curl http://localhost:5000/images/iphone-15-pro.jpg
```

### 2. تست Frontend
- مرورگر را باز کنید و به `http://localhost:3000` بروید
- صفحه اصلی باید محصولات را نمایش دهد
- تصاویر محصولات باید از backend لود شوند

## ویژگی‌های اصلی

### احراز هویت
- ثبت‌نام کاربران جدید
- ورود کاربران
- خروج از سیستم
- مدیریت نقش‌ها (admin/user)

### مدیریت محصولات
- نمایش تمام محصولات
- جستجو در محصولات
- مرتب‌سازی بر اساس قیمت و نام
- افزودن محصول جدید (فقط admin)

### سبد خرید
- افزودن محصول به سبد
- تغییر تعداد محصول
- حذف محصول از سبد
- محاسبه کل قیمت

### تصاویر پویا
- تصاویر محصولات در پوشه `web-project-backend/images/`
- دسترسی از طریق `/images/filename.jpg`
- پشتیبانی از fallback برای تصاویر ناموجود

## ساختار فایل‌ها

### Backend
```
web-project-backend/
├── config/
│   └── db.js          # تنظیمات اتصال به MongoDB
├── controllers/
│   ├── auth.js        # کنترلر احراز هویت
│   ├── products.js    # کنترلر محصولات
│   └── cart.js        # کنترلر سبد خرید
├── middleware/
│   ├── auth.js        # میدلور احراز هویت
│   └── admin.js       # میدلور بررسی admin
├── models/
│   ├── User.js        # مدل کاربر
│   ├── Product.js     # مدل محصول
│   └── Cart.js        # مدل سبد خرید
├── routes/
│   ├── auth.js        # مسیرهای احراز هویت
│   ├── products.js    # مسیرهای محصولات
│   └── cart.js        # مسیرهای سبد خرید
├── images/            # پوشه تصاویر محصولات
├── seed.js           # اسکریپت پر کردن پایگاه داده
└── server.js         # فایل اصلی سرور
```

### Frontend
```
web-project-frontend/
├── public/
│   └── index.html     # فایل HTML اصلی
├── src/
│   ├── components/    # کامپوننت‌های React
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── pages/         # صفحات React
│   │   ├── Home.jsx
│   │   └── AddProduct.jsx
│   ├── services/      # سرویس‌های API
│   │   └── api.js
│   ├── utils/         # توابع کمکی
│   │   └── helpers.js
│   ├── App.jsx        # کامپوننت اصلی
│   ├── index.js       # نقطه شروع React
│   └── index.css      # استایل‌های کلی
└── package.json       # تنظیمات پروژه
```

## نکات مهم

1. **تصاویر**: تصاویر محصولات باید در پوشه `web-project-backend/images/` قرار گیرند
2. **CORS**: سرور backend برای درخواست‌های از localhost:3000 تنظیم شده است
3. **پایگاه داده**: MongoDB باید در حال اجرا باشد
4. **پورت‌ها**: Backend روی پورت 5000 و Frontend روی پورت 3000 اجرا می‌شود

## عیب‌یابی

### مشکل اتصال به Backend
- مطمئن شوید که سرور backend در حال اجرا است
- پورت 5000 را بررسی کنید
- فایل `.env` را بررسی کنید

### مشکل نمایش تصاویر
- مطمئن شوید که تصاویر در پوشه `images` وجود دارند
- نام فایل‌ها را با `seed.js` مطابقت دهید
- دسترسی فایل‌ها را بررسی کنید

### مشکل CORS
- مطمئن شوید که CORS middleware در `server.js` اضافه شده است
- آدرس frontend را در تنظیمات CORS بررسی کنید

## توسعه

برای توسعه بیشتر:

1. **اضافه کردن محصولات جدید**: تصویر را در پوشه `images` قرار دهید و در `seed.js` اضافه کنید
2. **تغییر استایل**: فایل‌های CSS در `src/index.css` را ویرایش کنید
3. **اضافه کردن ویژگی‌های جدید**: کامپوننت‌های جدید در پوشه `components` ایجاد کنید

## لایسنس

این پروژه برای اهداف آموزشی ایجاد شده است. 