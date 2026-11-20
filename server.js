const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// إنشاء قاعدة البيانات
const db = new sqlite3.Database('./bakery.db');

// 1. جدول المنتجات (الكيك)
db.run(`CREATE TABLE IF NOT EXISTS cakes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT
)`);

// إضافة البيانات (الحلي والموالح) تلقائياً أول مرة
db.get("SELECT count(*) as count FROM cakes", (err, row) => {
    if (row.count === 0) {
        db.run(`INSERT INTO cakes (name, description, price, category) VALUES 
            ('Chocolate Cake', 'Rich chocolate, cocoa, fresh eggs, and butter.', 15.00, 'الحلي'),
            ('Vanilla Cake', 'Sweet vanilla extract, flour, milk, and sugar.', 12.00, 'الحلي'),
            ('Cheese Fatayer', 'Delicious cheese pastry.', 5.00, 'الموالح')`);
    }
});

// 2. جدول الطلبات (لحفظ طلبات الزبائن)
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT,
    cake TEXT
)`);

// 3. جلب المنتجات للواجهة
app.get('/api/cakes', (req, res) => {
    db.all("SELECT * FROM cakes", [], (err, rows) => {
        res.json(rows);
    });
});

// 4. حفظ الطلب عند الضغط على الزر
app.post('/api/order', (req, res) => {
    const { customerName, cakeName } = req.body;
    db.run(`INSERT INTO orders (customer, cake) VALUES (?, ?)`, [customerName, cakeName], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "تم إضافة الطلب بنجاح! شكراً لك." });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});