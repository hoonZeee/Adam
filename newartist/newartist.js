document.addEventListener('DOMContentLoaded', () => {
    // 모달 설정
    function setupModal(modalId, openButtonId, closeButtonClass) {
        const modal = document.getElementById(modalId);
        const openButton = document.getElementById(openButtonId);
        const closeButton = modal.querySelector(`.${closeButtonClass}`);

        // 모달 열기
        openButton.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // 모달 닫기 (X 버튼 클릭 시)
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // 모달 닫기 (배경 클릭 시)
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    setupModal('writePostModal', 'writePostBtn', 'close-btn');

    // 글쓰기 폼 제출 이벤트 처리
    function setupWritePostForm(formId) {
        const writePostForm = document.getElementById(formId);
        writePostForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const formData = new FormData(writePostForm);
            fetch('/submit-post', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('글이 성공적으로 게시되었습니다!');
                    document.getElementById('writePostModal').style.display = 'none';
                    loadPosts(); // 게시글을 다시 불러와서 갱신
                } else {
                    alert(data.message || '게시 중 오류가 발생했습니다.');
                }
            })
            .catch(error => console.error('게시 중 오류 발생:', error));
        });
    }
    

    // 게시글을 서버에서 불러와서 페이지에 추가하는 함수
    function loadPosts() {
        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const postsContainer = document.getElementById('postsContainer');
                    postsContainer.innerHTML = ''; // 기존 게시글 제거
                    data.data.forEach(post => {
                        addPostToPage(post);
                    });
                } else {
                    console.error('게시글 데이터를 가져오는 중 오류 발생');
                }
            })
            .catch(error => console.error('게시글 데이터를 가져오는 중 오류 발생:', error));
    }

    // 새로운 게시글을 페이지에 추가하는 함수
    function addPostToPage(postData) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('container');
    
        postContainer.innerHTML = `
            <div class="post">
               <div class="artist-name">${postData.user_id}</div>
                <div class="post-date">${postData.post_date}</div>
                <div class="artwork">
                    <img src="/uploads/${postData.artwork_image}" alt="작품 이미지">
                </div>
                <div class="like-button">
                    <button class="like-btn">
                        <i class="fas fa-heart"></i>
                        <span class="likeCount">0</span>
                    </button> 
                </div>
                <div class="description-comments">
                    <div class="description">
                        <p>${postData.description}</p>
                    </div>
                    <div class="comments-section">
                        <div class="comments-container"></div>
                        <form class="commentForm">
                            <input type="text" class="commentInput" placeholder="댓글을 입력하세요...">
                            <button type="submit">전송</button>
                        </form>
                    </div>
                </div>
            </div> 
        `;
    
        document.getElementById('postsContainer').appendChild(postContainer);
        setupLikeAndComment(postContainer);
    }

    // 좋아요 및 댓글 기능 설정 함수
    function setupLikeAndComment(postElement) {
        const likeBtn = postElement.querySelector('.like-btn');
        const likeCountSpan = postElement.querySelector('.likeCount');
        let likes = 0;

        likeBtn.addEventListener('click', () => {
            likes++;
            likeCountSpan.textContent = likes;
        });

        const commentForm = postElement.querySelector('.commentForm');
        const commentInput = postElement.querySelector('.commentInput');
        const commentsContainer = postElement.querySelector('.comments-container');

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentText = commentInput.value.trim();
            if (commentText) {
                addComment(commentText, commentsContainer);
                commentInput.value = '';
            }
        });
    }

    // 댓글 추가 함수
    function addComment(text, commentsContainer) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        commentDiv.innerHTML = `
            <p>${text}</p>
            <span class="comment-time">${timeString}</span>
        `;
        commentsContainer.appendChild(commentDiv);
        commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }

    // 글쓰기 폼 설정
    setupWritePostForm('writePostForm');

    // 페이지 로드 시 게시글 불러오기
    loadPosts();
});
