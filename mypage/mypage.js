document.addEventListener('DOMContentLoaded', function() {
    // 월별 사용 현황 차트
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [{
                label: '사용금액',
                data: [3000, 4500, 2800, 5000, 3800, 4200],
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return value.toLocaleString() + '원';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // 포인트 충전 버튼 이벤트
    const chargeButton = document.getElementById('chargeButton');
    chargeButton.addEventListener('click', function() {
        alert('포인트 충전 페이지로 이동합니다.');
    });

    // 네비게이션 항목 호버 효과
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e0e0e0';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});