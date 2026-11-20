const express = require('express');
const path = require('path');
const app = express();

// لقراءة البيانات من الفورم
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ربط ملفات مجلد public لكي تظهر في المتصفح
app.use(express.static(path.join(__dirname, 'public')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// تشغيل السيرفر على البورت 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});