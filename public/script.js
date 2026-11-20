// إظهار التاريخ الحالي في أسفل الصفحة
const dateElement = document.createElement('p');
dateElement.textContent = "Today's Date: " + new Date().toLocaleDateString();
document.body.appendChild(dateElement);

// إظهار رسالة عند الضغط على الزر الأخضر
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Cake added to cart successfully!');
    });
});