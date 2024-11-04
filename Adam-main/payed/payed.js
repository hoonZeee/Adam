// 현재 날짜를 가져오는 함수
function getCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return today.toLocaleDateString('ko-KR', options);
}

// 페이지가 로드될 때 주문 날짜를 설정
window.onload = function() {
    document.querySelector('#order-date strong').textContent = getCurrentDate();
};