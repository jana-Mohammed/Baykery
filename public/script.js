function addToCart(cakeName, price) {
    // 1. إظهار الرسالة تحت
    const thanksMessage = document.getElementById('thanks');
    if (thanksMessage) {
        thanksMessage.textContent = "شكراً لك! تم إضافة " + cakeName + " إلى السلة.";
    }

    // 2. إضافة المنتج للسلة
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push({ name: cakeName, price: price });
    localStorage.setItem('myCart', JSON.stringify(cart));

    // 3. إرسال لقاعدة البيانات
    fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName: "Guest", cakeName: cakeName })
    }).catch(error => console.log('DB Error:', error));
}

// إظهار التاريخ
const dateDisplay = document.getElementById('date-display');
if (dateDisplay) {
    dateDisplay.textContent = "Today's Date: " + new Date().toLocaleDateString();
}