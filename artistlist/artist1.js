document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav button');
    const contentSections = document.querySelectorAll('.content');

    function showContent(contentId) {
        // 모든 콘텐츠를 숨김
        contentSections.forEach(content => {
            content.classList.add('hidden');
        });
        // 선택된 콘텐츠만 표시
        document.getElementById(contentId).classList.remove('hidden');

        // 모든 버튼에서 active 클래스 제거
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        // 클릭된 버튼에 active 클래스 추가
        event.target.classList.add('active');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            showContent(this.getAttribute('data-content'));
        });
    });
});