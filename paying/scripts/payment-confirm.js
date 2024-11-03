document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvc = document.getElementById('cvc').value;
    const cardHolder = document.getElementById('cardHolder').value;
    
    if (!cardNumber || !expiryDate || !cvc || !cardHolder) {
        alert('모든 필드를 입력해 주세요.');
        return;
    }
    
    if (confirm('결제를 진행하시겠습니까?')) {
        alert('결제가 완료되었습니다.');
        // 결제 완료 후 `payment-complete.html`로 이동
        window.location.href = "../payed/payed.html";  
    }
});
